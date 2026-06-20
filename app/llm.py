# llm.py
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()


def get_llm():
    llm = ChatGoogleGenerativeAI(
        model="gemini-3-flash-preview",
        temperature=0.7
    )

    return llm
