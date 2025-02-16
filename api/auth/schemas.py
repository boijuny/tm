from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    name: str

class UserLogin(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    name: str
    created_at: datetime
    role: Optional[str] = None
    image_url: Optional[str] = None
    audio_preview_url: Optional[str] = None

    class Config:
        from_attributes = True 