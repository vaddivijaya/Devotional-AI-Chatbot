# 🙏 Devotional AI Chatbot

> *"Ask anything about Hindu scriptures — get answers powered by AI"*

An AI-powered chatbot that answers questions about **Ramayana, Mahabharata, and 18 Puranas** using Retrieval Augmented Generation (RAG). Built with LangChain, Pinecone, and React.

---

## ✨ What it does

- Ask questions about Hindu scriptures in simple English
- Get meaningful, easy-to-understand answers
- Covers Ramayana, Mahabharata, and 18 Puranas
- Beautiful spiritual UI with OM symbol and devotional theme

---

## 🖥️ Screenshots

<img width="1913" height="918" alt="image" src="https://github.com/user-attachments/assets/ec7dd36e-3caa-49cc-aa93-6d6d541aa28e" />
<img width="1882" height="929" alt="image" src="https://github.com/user-attachments/assets/9cb00988-67b5-4cc7-b003-4cc6f1c608df" />


---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | FastAPI (Python) |
| AI Framework | LangChain |
| LLM | gemini-3-flash-preview |
| Embeddings | HuggingFace all-MiniLM-L6-v2 |
| Vector Database | Pinecone (Cloud) |
| PDF Loading | LangChain PyPDFLoader |

---

## 📁 Project Structure

```
Devotional-AI-Chatbot/
│
├── app/
│   ├── main.py              # FastAPI entry point
│   ├── rag_pipeline.py      # PDF loading, chunking, Pinecone
│   ├── llm.py               # OpenRouter LLM connection
│   ├── prompt_template.py   # Devotional prompt
│   ├── chain.py             # Conversational chain + memory
│   └── schemas.py           # Request/Response models
│
├── frontend/
│   └── src/
│       ├── components/      # Header, MessageBubble, InputArea...
│       ├── hooks/           # useChat (API logic)
│       ├── styles/          # spiritual.css
│       └── App.jsx          # Main component
│
├── data/                    # PDF files (not pushed to GitHub)
├── .env.example             # Environment variables template
├── requirements.txt         # Python dependencies
└── README.md
```

---

## ⚙️ How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/vaddivijaya/Devotional-AI-Chatbot.git
cd Devotional-AI-Chatbot
```

### 2. Set up environment variables

```bash
cp .env.example .env
# Fill in your API keys in .env file
```

```
GOOGLE_API_KEY=your_key_here
PINECONE_API_KEY=your_key_here


### 3. Install Python dependencies

```bash
pip install -r requirements.txt
```



### 4. Run the backend

```bash
uvicorn app.main:app --reload --port 8000
```

### 5. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

### 6. Open in browser

```
http://localhost:5173
```

---



## 💡 How it works

```
User asks question
      ↓
Question converted to embedding vector
      ↓
Pinecone searches for similar scripture chunks
      ↓
Top 5 relevant chunks retrieved
      ↓
Chunks + question wrapped in devotional prompt
      ↓
LLM generates simple, meaningful answer
      ↓
Answer displayed in spiritual UI
```

---

## 📊 Data

- **63,000+ vectors** stored in Pinecone
- Covers Ramayana, Mahabharata, and 18 Puranas
- Chunk size: 1000 tokens | Overlap: 200 tokens
- Embedding model: all-MiniLM-L6-v2 (384 dimensions)

---

## 🚀 Features

- ✅ RAG pipeline with Pinecone cloud storage
- ✅ Conversation memory (remembers last 4 exchanges)
- ✅ Query rewriting for follow-up questions
- ✅ Spiritual themed React UI
- ✅ Fully responsive design
- ✅ FastAPI REST backend
- ✅ Modular and clean code structure

---

## 🎨 About the UI

The frontend is designed with a spiritual and devotional theme:
- Deep midnight purple background
- Sacred gold and saffron colors
- Glowing OM symbol
- Rotating mandala background
- Floating gold particles
- Lotus decorations

---

## 👩‍💻 Built by

**Vijaya** — Backend Engineer transitioning to Gen AI Engineering

- 🎨 Also runs [VijayaSketches](https://www.youtube.com/@VijayaSketches) — a sketch art channel
- 💼 Currently at HCLTech
- 🌟 Passionate about combining Art + AI

---


*Built with ❤️ and 🙏 for the devotional community*
