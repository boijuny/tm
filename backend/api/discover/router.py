from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.base import get_db
from models.user import User
from models.matching import Match
from services.auth.auth import AuthService
from .schemas import ProfileList, MatchCreate

router = APIRouter()
auth_service = AuthService()

@router.get("/profiles", response_model=ProfileList)
async def get_profiles(
    current_user: User = Depends(auth_service.get_current_user),
    db: Session = Depends(get_db)
):
    # Get users who haven't been matched with current user
    profiles = db.query(User).filter(
        User.id != current_user.id
    ).all()
    return {"profiles": profiles}

@router.post("/like/{profile_id}", status_code=status.HTTP_201_CREATED)
async def like_profile(
    profile_id: str,
    current_user: User = Depends(auth_service.get_current_user),
    db: Session = Depends(get_db)
):
    # Check if profile exists
    profile = db.query(User).filter(User.id == profile_id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    # Check if already liked
    existing_match = db.query(Match).filter(
        ((Match.user1_id == current_user.id) & (Match.user2_id == profile_id)) |
        ((Match.user1_id == profile_id) & (Match.user2_id == current_user.id))
    ).first()
    
    if existing_match:
        if existing_match.user1_id == profile_id:
            # Other user already liked current user - it's a match!
            existing_match.is_mutual = True
            db.commit()
            return {"message": "It's a match!"}
        return {"message": "Already liked"}
    
    # Create new match
    match = Match(user1_id=current_user.id, user2_id=profile_id)
    db.add(match)
    db.commit()
    
    return {"message": "Profile liked"} 