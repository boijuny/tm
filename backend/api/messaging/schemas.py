from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from api.profiles.schemas import ProfileResponse

class MessageBase(BaseModel):
    content: str
    audio_url: Optional[str] = None

class MessageCreate(MessageBase):
    pass

class MessageResponse(MessageBase):
    id: str
    match_id: str
    sender_id: str
    created_at: datetime
    
    class Config:
        orm_mode = True

class ConversationResponse(BaseModel):
    id: str
    other_user: ProfileResponse
    last_message: Optional[MessageResponse] = None
    
    class Config:
        orm_mode = True

class ConversationList(BaseModel):
    conversations: List[ConversationResponse] 