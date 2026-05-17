from pydantic import BaseModel
from typing import List


class ChatRequest(BaseModel):
    question: str
    chat_history: List[dict] = []


class ChatResponse(BaseModel):
    answer: str
