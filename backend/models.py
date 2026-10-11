from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field

ProjectType = Literal[
    "RAG / Assistant documentaire",
    "Système agentique",
    "Automatisation & veille",
    "Intégration IA",
    "ML / Computer Vision",
    "Audit LLM",
    "Autre",
]


class ContactSchema(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    type: ProjectType
    message: str = Field(..., min_length=5, max_length=2000)
    # Anti-spam : champ piège invisible (doit rester vide) et temps de remplissage en ms
    website: str = Field(default="", max_length=200)
    elapsed_ms: int = Field(default=0, ge=0, le=86_400_000)
