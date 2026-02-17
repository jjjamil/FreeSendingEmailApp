import base64
import json
import os

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from email_sender import jobs, start_send_job
from utils import get_send_limit, parse_csv

load_dotenv()

IMGBB_API_KEY = os.getenv("IMGBB_API_KEY")
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/gif", "image/webp"}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://sendanemail.xyz", "https://www.sendanemail.xyz"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/upload-image")
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG, GIF, and WebP images are allowed.")

    contents = await file.read()
    b64_image = base64.b64encode(contents).decode("utf-8")

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.imgbb.com/1/upload",
            data={"key": IMGBB_API_KEY, "image": b64_image},
        )

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Image upload to ImgBB failed. Please try again.")

    data = response.json()
    return JSONResponse({"url": data["data"]["url"]})


@app.post("/api/send")
async def send_emails(
    sender_email: str = Form(...),
    sender_password: str = Form(...),
    subject: str = Form(...),
    html_body: str = Form(...),
    recipients_json: str = Form(None),
    csv_file: UploadFile = File(None),
):
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
def get_status(job_id: str):
    job = jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found.")
    return JSONResponse(job)
