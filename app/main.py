from fastapi import FastAPI
from app.schemas import ChatRequest, ChatResponse
from fastapi.middleware.cors import CORSMiddleware
from app.prompt_template import prompt as DEVOTIONAL_PROMPT
from app.retriever import retriver_chain as pipeline
from app.llm import get_llm
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables.history import RunnableWithMessageHistory
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

store = {}

MAX_MESSAGES = 8


def get_session_history(session_id: str):
    if session_id not in store:
        store[session_id] = ChatMessageHistory()

    history = store[session_id]
    if len(history.messages) > MAX_MESSAGES:
        history.messages = history.messages[-MAX_MESSAGES:]

    return history


base_chain = DEVOTIONAL_PROMPT | model | parser

chain = RunnableWithMessageHistory(
    base_chain,
    get_session_history,
    input_messages_key="question",
    history_messages_key="chat_history",
)

store = {}


def get_session_history(session_id: str):
    if session_id not in store:
        store[session_id] = ChatMessageHistory()

    return store[session_id]


@app.get("/")
def home():
    return {"message": "Devotional AI Chatbot API Running"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    try:
        # retrieve docs
        retrieved_docs = retriever.invoke(
            {
                "input": request.question,
                "chat_history": get_session_history(
                    request.session_id
                ).messages
            }
        )

        context = "\n\n".join([
            doc.page_content for doc in retrieved_docs
        ])

        # invoke chain with history
        response = chain.invoke(
            {
                "question": request.question,
                "context": context,
            },
            config={
                "configurable": {
                    "session_id": request.session_id
                }
            }
        )

        return ChatResponse(answer=response)

    except Exception as e:
        return ChatResponse(
            answer=f"Error: {str(e)}"
        )
