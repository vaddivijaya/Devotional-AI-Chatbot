# retriever.py

from dotenv import load_dotenv

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore

from langchain_classic.chains import create_history_aware_retriever
from langchain_core.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
)

from app.llm import get_llm

load_dotenv()

INDEX_NAME = "devotion-vectors"

# embeddings
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# llm
llm = get_llm()


def get_vector_store():

    vector_store = PineconeVectorStore(
        index_name=INDEX_NAME,
        embedding=embeddings
    )

    return vector_store


def get_retriever():

    vector_store = get_vector_store()

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 5}
    )

    return retriever


def retriver_chain():

    retriever = get_retriever()

    # prompt for rewriting follow-up questions
    contextualize_q_prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            """
Given the chat history and latest user question,
rewrite the latest question into a standalone question.

Do NOT answer the question.
Only rewrite it if necessary.
            """
        ),

        MessagesPlaceholder("chat_history"),

        ("human", "{input}")
    ])

    # create history-aware retriever
    history_aware_retriever = create_history_aware_retriever(
        llm,
        retriever,
        contextualize_q_prompt
    )

    return history_aware_retriever
