from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.auth.router import router as auth_router
from api.profiles.router import router as profiles_router
from api.discover.router import router as discover_router
from api.messaging.router import router as messaging_router

app = FastAPI(
    title="Music Collaboration API",
    description="API for the music collaboration platform",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Update with actual frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(profiles_router, prefix="/api/profiles", tags=["Profiles"])
app.include_router(discover_router, prefix="/api/discover", tags=["Discovery"])
app.include_router(messaging_router, prefix="/api/messages", tags=["Messaging"])

@app.get("/")
async def root():
    return {"message": "Welcome to Music Collaboration API"} 