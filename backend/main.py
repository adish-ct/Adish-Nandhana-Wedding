
import os
import shutil
import uuid

from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import init_db, db_fetch_all, db_execute_insert, get_db_connection, is_postgres
from schemas import RSVPCreate, WishCreate

app = FastAPI(
    title="Adish & Nandhana Wedding API",
    description="Backend service for Adish and Nandhana's Wedding application",
    version="1.0.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static uploads
UPLOADS_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Adish & Nandhana Wedding API is operational"}

@app.get("/api/wedding-info")
def get_wedding_info():
    return {
        "groom": "Adish",
        "bride": "Nandhana",
        "relationship_start": "2020-04-20",
        "wedding_date": "2026-11-01T10:30:00+05:30",
        "venue": {
            "name": "Grand Palace Hall & Resort",
            "city": "Kochi, Kerala, India",
            "google_maps_url": "https://maps.google.com/?q=Kochi+Kerala",
            "embed_map": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125706.28669527632!2d76.21447045!3d9.9816358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582ca584583630!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000"
        }
    }

# --- RSVP Endpoints ---
@app.post("/api/rsvp")
def create_rsvp(rsvp: RSVPCreate):
    rsvp_id = db_execute_insert('''
        INSERT INTO rsvp (guest_name, email, attending, guest_count, dietary_preference, message)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (rsvp.guest_name, rsvp.email, rsvp.attending, rsvp.guest_count, rsvp.dietary_preference, rsvp.message))
    return {"status": "success", "message": "Thank you for responding!", "rsvp_id": rsvp_id}

@app.get("/api/rsvp")
def list_rsvps():
    rsvps = db_fetch_all("SELECT * FROM rsvp ORDER BY created_at DESC")
    return {"total": len(rsvps), "data": rsvps}

# --- Wishes Endpoints ---
@app.get("/api/wishes")
def get_wishes():
    wishes = db_fetch_all("SELECT * FROM wishes ORDER BY created_at DESC")
    return {"total": len(wishes), "data": wishes}

@app.post("/api/wishes")
def create_wish(wish: WishCreate):
    if not wish.sender_name.strip() or not wish.message.strip():
        raise HTTPException(status_code=400, detail="Name and Message are required")
    
    wish_id = db_execute_insert('''
        INSERT INTO wishes (sender_name, relationship, message)
        VALUES (?, ?, ?)
    ''', (wish.sender_name, wish.relationship, wish.message))
    return {"status": "success", "message": "Your love wish has been posted!", "wish_id": wish_id}

# --- Photos Endpoints ---
@app.get("/api/photos")
def get_photos():
    photos = db_fetch_all("SELECT * FROM photos ORDER BY created_at DESC")
    return {"total": len(photos), "data": photos}

@app.delete("/api/photos/{photo_id}")
def delete_photo(photo_id: int, password: str = Form(...)):

    """Delete a photo after password verification."""
    hardcoded = "Adish@Nandhu@2026"
    if password != hardcoded:
        raise HTTPException(status_code=403, detail="Incorrect password")
    # Retrieve the photo record to get image URL
    photo = db_fetch_all("SELECT * FROM photos WHERE id = ?", (photo_id,))
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    image_url = photo[0]["image_url"]
    # Delete the database record
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        if is_postgres():
            cursor.execute("DELETE FROM photos WHERE id = %s", (photo_id,))
        else:
            cursor.execute("DELETE FROM photos WHERE id = ?", (photo_id,))
        conn.commit()
    finally:
        conn.close()
    # Delete the file from uploads directory if it exists
    try:
        filename = os.path.basename(image_url)
        file_path = os.path.join(UPLOADS_DIR, filename)
        if os.path.isfile(file_path):
            os.remove(file_path)
    except Exception:
        pass
    return {"status": "success", "message": "Photo deleted"}

@app.post("/api/photos/upload")
async def upload_photo(
    request: Request,
    file: UploadFile = File(...),
    title: str = Form(...),
    category: str = Form("prewedding"),
    uploaded_by: str = Form("Guest"),
):
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed.")

    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1] or ".jpg"
    unique_filename = f"{uuid.uuid4().hex}{file_extension}"
    file_path = os.path.join(UPLOADS_DIR, unique_filename)

    # Save file to disk
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Build image URL
    image_url = f"{request.base_url}uploads/{unique_filename}"

    # Insert record into database
    photo_id = db_execute_insert('''
        INSERT INTO photos (title, category, image_url, uploaded_by)
        VALUES (?, ?, ?, ?)
    ''', (title, category, image_url, uploaded_by))

    return {
        "status": "success",
        "message": "Photo uploaded successfully!",
        "photo": {
            "id": photo_id,
            "title": title,
            "category": category,
            "image_url": image_url,
            "uploaded_by": uploaded_by,
        },
    }

if __name__ == "__main__":
    import uvicorn, os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

@app.get("/")
def root():
    return {"message": "Adish & Nandhana Wedding API"}
