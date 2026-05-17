from fastapi import FastAPI
from app.schemas import ChatRequest, ChatResponse
from fastapi.middleware.cors import CORSMiddleware

from app.prompt_template import prompt as DEVOTIONAL_PROMPT
from app.retriever import retriver_chain as pipeline
from app.llm import get_llm

from langchain_core.output_parsers import StrOutputParser

# initialize
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

retriever = pipeline()
model = get_llm()
parser = StrOutputParser()

chain = DEVOTIONAL_PROMPT | model | parser


@app.get("/")
def home():
    return {"message": "Devotional AI Chatbot API Running"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    try:
        # format history
        history_text = "\n".join([
            f"Human: {h['human']}\nAssistant: {h['assistant']}"
            for h in request.chat_history[-4:]
        ])

        # retrieve docs
        retrieved_docs = retriever.invoke(request.question)

        context = "\n\n".join([
            doc.page_content for doc in retrieved_docs
        ])

        # generate response
        response = chain.invoke({
            "chat_history": history_text,
            "context": context,
            "question": request.question
        })

        return ChatResponse(answer=response)

    except Exception as e:
        return ChatResponse(
            answer=f"Error: {str(e)}"
        )
