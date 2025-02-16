from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.base import get_db
from models.user import User
from services.auth.auth import AuthService
from .schemas import ProfileUpdate, ProfileResponse

router = APIRouter()
auth_service = AuthService()

@router.get("/me", response_model=ProfileResponse)
async def get_my_profile(current_user: User = Depends(auth_service.get_current_user)):
    return current_user

@router.put("/me", response_model=ProfileResponse)
async def update_profile(
    profile: ProfileUpdate,
    current_user: User = Depends(auth_service.get_current_user),
    db: Session = Depends(get_db)
):
    for key, value in profile.dict(exclude_unset=True).items():
        setattr(current_user, key, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user 