from pydantic import BaseModel
from typing import Optional

class RSVPCreate(BaseModel):
    guest_name: str
    email: Optional[str] = None
    attending: str
    guest_count: int = 1
    dietary_preference: Optional[str] = "No special preference"
    message: Optional[str] = ""

class WishCreate(BaseModel):
    sender_name: str
    relationship: Optional[str] = "Friend / Well-wisher"
    message: str

class PhotoCreate(BaseModel):
    title: str
    category: str
    uploaded_by: Optional[str] = "Guest"
