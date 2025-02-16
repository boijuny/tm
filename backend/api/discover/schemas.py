from pydantic import BaseModel
from typing import List
from api.profiles.schemas import ProfileResponse

class ProfileList(BaseModel):
    profiles: List[ProfileResponse]

class MatchCreate(BaseModel):
    profile_id: str 