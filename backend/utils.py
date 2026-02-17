import csv
import io


def parse_csv(file_bytes: bytes) -> list[dict]:
    """Parse CSV bytes into a list of {name, email} dicts."""
    content = file_bytes.decode("utf-8")
    reader = csv.reader(io.StringIO(content))
    recipients = []
    for row in reader:
        if row and len(row) >= 2:
            email = row[0].strip()
            name = row[1].strip()
            if email and name:
                recipients.append({"email": email, "name": name})
    return recipients


def get_send_limit(sender_email: str) -> int:
    """Return max recipients based on sender account type."""
    if sender_email.strip().lower().endswith("@gmail.com"):
        return 400
    return 900
