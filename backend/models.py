from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal

class ContactSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    type: Literal["Generative AI", "Computer Vision", "Machine Learning", "Autre"]
    message: str = Field(..., min_length=20, max_length=2000)

class EmailSchema(BaseModel):
    email: list[EmailStr]
