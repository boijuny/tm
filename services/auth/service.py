from sqlalchemy.orm import Session
from models import User
from api.auth.schemas import UserCreate
import bcrypt
import uuid
from datetime import datetime

class AuthService:
    async def get_user_by_email(self, db: Session, email: str) -> User:
        return db.query(User).filter(User.email == email).first()

    async def create_user(self, db: Session, user_data: UserCreate) -> User:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), salt)
        
        db_user = User(
            id=str(uuid.uuid4()),
            email=user_data.email,
            name=user_data.name,
            hashed_password=hashed_password.decode('utf-8'),
            created_at=datetime.utcnow()
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    async def authenticate_user(self, db: Session, email: str, password: str) -> User:
        user = await self.get_user_by_email(db, email)
        if not user:
            return None
        
        if not bcrypt.checkpw(password.encode('utf-8'), user.hashed_password.encode('utf-8')):
            return None
        
        return user 