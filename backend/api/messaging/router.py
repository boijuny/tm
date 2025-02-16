from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.base import get_db
from models.user import User
from models.matching import Match, Message
from services.auth.auth import AuthService
from .schemas import MessageCreate, MessageResponse, ConversationList

router = APIRouter()
auth_service = AuthService()

@router.get("/conversations", response_model=ConversationList)
async def get_conversations(
    current_user: User = Depends(auth_service.get_current_user),
    db: Session = Depends(get_db)
):
    # Get all matches where current user is involved
    matches = db.query(Match).filter(
        (Match.user1_id == current_user.id) | (Match.user2_id == current_user.id)
    ).filter(Match.is_mutual == True).all()
    
    return {"conversations": matches}

@router.get("/{match_id}/messages", response_model=list[MessageResponse])
async def get_messages(
    match_id: str,
    current_user: User = Depends(auth_service.get_current_user),
    db: Session = Depends(get_db)
):
    # Verify match exists and user is part of it
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match or (match.user1_id != current_user.id and match.user2_id != current_user.id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found"
        )
    
    messages = db.query(Message).filter(Message.match_id == match_id).all()
    return messages

@router.post("/{match_id}/messages", response_model=MessageResponse)
async def create_message(
    match_id: str,
    message: MessageCreate,
    current_user: User = Depends(auth_service.get_current_user),
    db: Session = Depends(get_db)
):
    # Verify match exists and user is part of it
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match or (match.user1_id != current_user.id and match.user2_id != current_user.id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found"
        )
    
    db_message = Message(
        match_id=match_id,
        sender_id=current_user.id,
        content=message.content,
        audio_url=message.audio_url
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    return db_message 