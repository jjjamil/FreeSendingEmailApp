import smtplib
import time
import uuid
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from threading import Thread

# In-memory job store: { job_id: { status, results, total, sent, failed } }
jobs: dict[str, dict] = {}


def create_job(recipients: list[dict]) -> str:
    job_id = str(uuid.uuid4())
    jobs[job_id] = {
        "status": "pending",
        "total": len(recipients),
        "sent": 0,
        "failed": 0,
        "results": [],
    }
    return job_id


def run_send_job(
    job_id: str,
    sender_email: str,
    sender_password: str,
    subject: str,
    html_body: str,
    recipients: list[dict],
    batch_size: int = 5,
    delay: int = 3,
):
    job = jobs[job_id]
    job["status"] = "running"

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
    except Exception as e:
        job["status"] = "failed"
        job["error"] = str(e)
        return

    for i in range(0, len(recipients), batch_size):
        batch = recipients[i : i + batch_size]

        for recipient in batch:
            name = recipient.get("name", "")
            email = recipient.get("email", "")

            try:
                personalized_html = html_body.replace("{Name}", name)

                msg = MIMEMultipart()
                msg["From"] = sender_email
                msg["To"] = email
                msg["Subject"] = subject
                msg.attach(MIMEText(personalized_html, "html"))

                server.send_message(msg)
                job["sent"] += 1
                job["results"].append({"email": email, "name": name, "status": "sent"})
            except Exception as e:
                job["failed"] += 1
                job["results"].append(
                    {"email": email, "name": name, "status": "failed", "error": str(e)}
                )

        # Wait between batches, but not after the last one
        if i + batch_size < len(recipients):
            time.sleep(delay)

    server.quit()
    job["status"] = "done"


def start_send_job(
    sender_email: str,
    sender_password: str,
    subject: str,
    html_body: str,
    recipients: list[dict],
) -> str:
    job_id = create_job(recipients)
    thread = Thread(
        target=run_send_job,
        args=(job_id, sender_email, sender_password, subject, html_body, recipients),
        daemon=True,
    )
    thread.start()
    return job_id
