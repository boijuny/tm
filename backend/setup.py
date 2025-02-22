from setuptools import setup, find_packages

setup(
    name="music-collab",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        "fastapi>=0.68.0",
        "uvicorn>=0.15.0",
        "sqlalchemy>=1.4.0",
        "alembic>=1.7.0",
        "pydantic>=1.8.0",
        "python-jose>=3.3.0",
        "passlib>=1.7.4",
        "python-multipart>=0.0.5",
        "pydub>=0.25.1",
        "redis>=4.0.0",
        "python-dotenv>=0.19.0",
        "psycopg2-binary>=2.9.1",
        "bcrypt>=3.2.0",
        "pytest>=6.2.0",
        "httpx>=0.18.0",
    ],
) 