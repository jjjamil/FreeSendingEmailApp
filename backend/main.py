import base64
import json
import os

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from email_sender import jobs, start_send_job
from utils import get_send_limit, parse_csv

load_dotenv()

IMGBB_API_KEY = os.getenv("IMGBB_API_KEY")
TURNSTILE_SECRET = os.getenv("TURNSTILE_SECRET", "1x0000000000000000000000000000000AA")
ENV = os.getenv("ENV", "production").lower()
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/gif", "image/webp"}


def client_ip(request: Request) -> str:
    """Real client IP, honoring X-Forwarded-For from Caddy/Cloudflare."""
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    real = request.headers.get("x-real-ip")
    if real:
        return real.strip()
    return request.client.host if request.client else "unknown"


limiter = Limiter(key_func=client_ip, default_limits=[])

app = FastAPI(
    docs_url="/docs" if ENV == "development" else None,
    redoc_url="/redoc" if ENV == "development" else None,
    openapi_url="/openapi.json" if ENV == "development" else None,
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://sendanemail.xyz", "https://www.sendanemail.xyz"],
    allow_methods=["*"],
    allow_headers=["*"],
)


async def verify_turnstile(token: str | None, request: Request) -> None:
    """Verify a Cloudflare Turnstile token. Raises HTTPException on failure."""
    if not token:
        raise HTTPException(status_code=400, detail="CAPTCHA token missing.")

    payload = {
        "secret": TURNSTILE_SECRET,
        "response": token,
        "remoteip": client_ip(request),
    }
    try:
        async with httpx.AsyncClient(timeout=10.0) as http:
            r = await http.post(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                data=payload,
            )
            data = r.json()
    except Exception:
        raise HTTPException(status_code=502, detail="CAPTCHA verification unavailable.")

    if not data.get("success"):
        codes = ",".join(data.get("error-codes") or []) or "unknown"
        raise HTTPException(status_code=403, detail=f"CAPTCHA failed ({codes}).")


@app.post("/api/upload-image")
@limiter.limit("30/hour")
async def upload_image(request: Request, file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG, GIF, and WebP images are allowed.")

    contents = await file.read()
    if len(contents) > 8 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Image must be smaller than 8 MB.")

    b64_image = base64.b64encode(contents).decode("utf-8")

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.post(
            "https://api.imgbb.com/1/upload",
            data={"key": IMGBB_API_KEY, "image": b64_image},
        )

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Image upload to ImgBB failed. Please try again.")

    data = response.json()
    return JSONResponse({"url": data["data"]["url"]})


@app.post("/api/send")
@limiter.limit("3/minute")
async def send_emails(
    request: Request,
    sender_email: str = Form(...),
    sender_password: str = Form(...),
    subject: str = Form(...),
    html_body: str = Form(...),
    recipients_json: str = Form(None),
    csv_file: UploadFile = File(None),
    turnstile_token: str = Form(None),
):
    await verify_turnstile(turnstile_token, request)

    if csv_file:
        file_bytes = await csv_file.read()
        recipients = parse_csv(file_bytes)
    elif recipients_json:
        try:
            recipients = json.loads(recipients_json)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid recipients JSON.")
    else:
        raise HTTPException(status_code=400, detail="No recipients provided.")

    if not recipients:
        raise HTTPException(status_code=400, detail="Recipient list is empty.")

    limit = get_send_limit(sender_email)
    if len(recipients) > limit:
        raise HTTPException(
            status_code=400,
            detail=f"Recipient count ({len(recipients)}) exceeds the limit of {limit} for this sender account.",
        )

    job_id = start_send_job(sender_email, sender_password, subject, html_body, recipients)
    return JSONResponse({"job_id": job_id, "total": len(recipients)})


@app.get("/api/status/{job_id}")
@limiter.limit("200/minute")
def get_status(request: Request, job_id: str):
    job = jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found.")
    return JSONResponse(job)
