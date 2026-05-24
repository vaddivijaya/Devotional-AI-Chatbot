import { useState, useRef, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Tiro+Devanagari+Sanskrit&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  html, body, #root {
    width: 100%; height: 100%; overflow: hidden;
    background: #0D0618;
    font-family: 'Crimson Pro', serif;
  }

  :root {
    --saffron: #FF6B1A;
    --deep-saffron: #E85D00;
    --gold: #FFD700;
    --gold-light: #FFE55C;
    --midnight: #0D0618;
    --sidebar-bg: #0A0414;
    --cream: #FFF8E7;
    --text-cream: #FFF3DC;
    --sidebar-w: 260px;
    --header-h: 56px;
  }

  /* ── LAYOUT ─────────────────────────────── */
  .app-shell {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background:
      radial-gradient(ellipse 80% 50% at 15% 15%, rgba(139,0,0,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 70% 60% at 85% 85%, rgba(255,107,26,0.1) 0%, transparent 60%),
      radial-gradient(ellipse 100% 100% at 50% 50%, rgba(26,10,46,0.97) 0%, #0D0618 100%);
  }

  /* ── MANDALA BG ─────────────────────────── */
  .mandala-bg {
    position: fixed;
    top: 50%;
    left: calc(var(--sidebar-w) / 2 + 50%);
    width: clamp(300px, 50vw, 650px);
    height: clamp(300px, 50vw, 650px);
    transform: translate(-50%, -50%);
    opacity: 0.04;
    animation: rotateMandala 120s linear infinite;
    pointer-events: none;
    z-index: 0;
    transition: left 0.3s ease;
  }

  .mandala-bg.sidebar-closed {
    left: 50%;
  }

  @keyframes rotateMandala {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* ── PARTICLES ──────────────────────────── */
  .particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  .particle  { position: absolute; border-radius: 50%; animation: floatUp linear infinite; opacity: 0; }
  @keyframes floatUp {
    0%   { transform: translateY(100vh) scale(0); opacity: 0; }
    10%  { opacity: 0.8; }
    90%  { opacity: 0.4; }
    100% { transform: translateY(-10vh) scale(1); opacity: 0; }
  }

  /* ── SIDEBAR TOGGLE BTN ─────────────────── */
  .toggle-btn {
    position: fixed;
    top: 14px;
    left: 14px;
    z-index: 100;
    width: 32px; height: 32px;
    background: rgba(255,107,26,0.12);
    border: 1px solid rgba(255,107,26,0.25);
    border-radius: 8px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.25s ease;
    color: rgba(255,215,0,0.7);
  }
  .toggle-btn:hover {
    background: rgba(255,107,26,0.25);
    border-color: rgba(255,215,0,0.4);
    color: var(--gold);
  }

  /* ── SIDEBAR ────────────────────────────── */
  .sidebar {
    width: var(--sidebar-w);
    flex-shrink: 0;
    height: 100vh;
    background: var(--sidebar-bg);
    border-right: 1px solid rgba(255,215,0,0.08);
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
    overflow: hidden;
    transition: width 0.3s ease, opacity 0.3s ease;
  }

  .sidebar.closed {
    width: 0 !important;
    opacity: 0;
    pointer-events: none;
    border: none;
  }

  .sidebar-header {
    padding: 16px 14px 12px;
    border-bottom: 1px solid rgba(255,215,0,0.07);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sidebar-om {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, var(--saffron), var(--gold));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Tiro Devanagari Sanskrit', serif;
    font-size: 14px; color: #0D0618; font-weight: 700;
    flex-shrink: 0;
    box-shadow: 0 0 10px rgba(255,215,0,0.3);
    animation: omPulse 3s ease-in-out infinite;
  }

  @keyframes omPulse {
    0%,100% { box-shadow: 0 0 10px rgba(255,215,0,0.3); }
    50%      { box-shadow: 0 0 20px rgba(255,215,0,0.6); }
  }

  .sidebar-brand {
    font-family: 'Cinzel Decorative', cursive;
    font-size: 12px; font-weight: 700;
    background: linear-gradient(135deg, var(--gold), var(--saffron));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.3;
  }

  .new-chat-btn {
    margin: 12px 12px 8px;
    padding: 9px 14px;
    background: rgba(255,107,26,0.1);
    border: 1px solid rgba(255,107,26,0.25);
    border-radius: 8px;
    color: rgba(255,243,220,0.8);
    font-family: 'Crimson Pro', serif;
    font-size: 13px;
    cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    transition: all 0.2s ease;
    width: calc(100% - 24px);
  }
  .new-chat-btn:hover {
    background: rgba(255,107,26,0.2);
    border-color: rgba(255,215,0,0.3);
    color: var(--gold-light);
  }

  .sidebar-section-label {
    padding: 12px 14px 6px;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,215,0,0.35);
    font-family: 'Cinzel Decorative', cursive;
  }

  .chat-history-list {
    flex: 1;
    overflow-y: auto;
    padding: 0 8px 12px;
  }
  .chat-history-list::-webkit-scrollbar { width: 3px; }
  .chat-history-list::-webkit-scrollbar-thumb { background: rgba(255,215,0,0.12); border-radius: 2px; }

  .history-item {
    padding: 9px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 2px;
  }
  .history-item:hover { background: rgba(255,107,26,0.08); }
  .history-item.active { background: rgba(255,107,26,0.15); border: 1px solid rgba(255,107,26,0.2); }

  .history-title {
    font-size: 13px;
    color: rgba(255,243,220,0.75);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: 'Crimson Pro', serif;
  }
  .history-item.active .history-title { color: var(--gold-light); }

  .history-time {
    font-size: 10px;
    color: rgba(255,215,0,0.25);
    margin-top: 2px;
  }

  .sidebar-footer {
    padding: 12px 14px;
    border-top: 1px solid rgba(255,215,0,0.07);
    font-size: 11px;
    color: rgba(255,215,0,0.25);
    font-style: italic;
    text-align: center;
    font-family: 'Crimson Pro', serif;
  }

  /* ── MAIN AREA ──────────────────────────── */
  .main-area {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
    z-index: 5;
  }

  /* ── TOP BAR ────────────────────────────── */
  .topbar {
    height: var(--header-h);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 clamp(16px, 3vw, 32px);
    border-bottom: 1px solid rgba(255,215,0,0.07);
    background: rgba(13,6,24,0.6);
    backdrop-filter: blur(20px);
  }

  .topbar-title {
    font-family: 'Cinzel Decorative', cursive;
    font-size: clamp(11px, 1.4vw, 14px);
    background: linear-gradient(135deg, var(--gold), var(--saffron));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .topbar-right {
    display: flex; align-items: center; gap: 7px;
  }

  .status-dot {
    width: 7px; height: 7px;
    background: #4CAF50; border-radius: 50%;
    animation: statusPulse 2s ease-in-out infinite;
    box-shadow: 0 0 6px rgba(76,175,80,0.6);
  }
  @keyframes statusPulse {
    0%,100% { opacity: 1; } 50% { opacity: 0.35; }
  }
  .status-text {
    font-size: 11px;
    color: rgba(255,243,220,0.35);
    font-style: italic;
  }

  /* ── MESSAGES AREA ──────────────────────── */
  .messages-scroll {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: clamp(16px, 3vh, 32px) 0;
  }
  .messages-scroll::-webkit-scrollbar { width: 3px; }
  .messages-scroll::-webkit-scrollbar-thumb { background: rgba(255,215,0,0.12); border-radius: 2px; }

  /* Centered content column — like ChatGPT */
  .messages-inner {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 clamp(14px, 3vw, 28px);
  }

  /* ── WELCOME SCREEN ─────────────────────── */
  .welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - var(--header-h) - 130px);
    gap: clamp(12px, 2.5vh, 22px);
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .welcome-om {
    font-family: 'Tiro Devanagari Sanskrit', serif;
    font-size: clamp(56px, 8vw, 90px);
    background: linear-gradient(135deg, var(--gold), var(--saffron), var(--gold-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: omGlow 4s ease-in-out infinite;
    line-height: 1;
  }
  @keyframes omGlow {
    0%,100% { filter: drop-shadow(0 0 18px rgba(255,215,0,0.4)); }
    50%      { filter: drop-shadow(0 0 36px rgba(255,215,0,0.8)) drop-shadow(0 0 54px rgba(255,107,26,0.4)); }
  }

  .welcome-title {
    font-family: 'Cinzel Decorative', cursive;
    font-size: clamp(18px, 2.8vw, 26px);
    background: linear-gradient(135deg, var(--gold), var(--cream));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .welcome-sub {
    font-size: clamp(13px, 1.4vw, 15px);
    color: rgba(255,243,220,0.55);
    font-style: italic;
    max-width: 460px;
    line-height: 1.8;
  }

  .welcome-divider {
    display: flex; align-items: center; gap: 14px;
    width: min(260px, 70vw);
  }
  .welcome-divider-line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,215,0,0.35), transparent);
  }
  .welcome-divider-icon { color: var(--gold); font-size: 14px; opacity: 0.6; }

  .chips {
    display: flex; flex-wrap: wrap; gap: 8px;
    justify-content: center; max-width: 520px;
  }
  .chip {
    padding: 7px 16px;
    background: rgba(255,107,26,0.09);
    border: 1px solid rgba(255,107,26,0.28);
    border-radius: 20px;
    color: rgba(255,243,220,0.75);
    font-size: clamp(11px, 1vw, 13px);
    font-family: 'Crimson Pro', serif;
    cursor: pointer;
    transition: all 0.25s ease;
    font-style: italic;
  }
  .chip:hover {
    background: rgba(255,107,26,0.2);
    border-color: rgba(255,215,0,0.45);
    color: var(--gold-light);
    transform: translateY(-2px);
  }

  /* ── MESSAGES ───────────────────────────── */
  .msg-wrapper {
    display: flex;
    margin-bottom: clamp(14px, 2.5vh, 24px);
    animation: msgIn 0.35s ease-out;
  }
  @keyframes msgIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .msg-wrapper.user { justify-content: flex-end; }
  .msg-wrapper.bot  { justify-content: flex-start; gap: 10px; }

  .bot-avatar {
    width: clamp(28px, 3vw, 36px);
    height: clamp(28px, 3vw, 36px);
    flex-shrink: 0;
    background: linear-gradient(135deg, var(--saffron), var(--gold));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Tiro Devanagari Sanskrit', serif;
    font-size: clamp(12px, 1.4vw, 16px);
    color: #0D0618; font-weight: 700;
    box-shadow: 0 0 10px rgba(255,215,0,0.25);
    align-self: flex-start;
    margin-top: 3px;
  }

  .msg-bubble {
    max-width: min(75%, 560px);
    padding: clamp(10px, 1.5vh, 14px) clamp(12px, 1.8vw, 18px);
    border-radius: 16px;
    font-size: clamp(13px, 1.3vw, 15px);
    line-height: 1.75;
    font-family: 'Crimson Pro', serif;
    word-break: break-word;
  }

  .msg-bubble.user {
    background: linear-gradient(135deg, rgba(255,107,26,0.22), rgba(139,0,0,0.28));
    border: 1px solid rgba(255,107,26,0.3);
    border-bottom-right-radius: 4px;
    color: var(--cream);
  }

  .msg-bubble.bot {
    background: rgba(26,10,46,0.85);
    border: 1px solid rgba(255,215,0,0.1);
    border-bottom-left-radius: 4px;
    color: var(--text-cream);
    box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  }

  .msg-label {
    font-size: clamp(8px, 0.7vw, 10px);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-family: 'Cinzel Decorative', cursive;
  }
  .msg-label.user-lbl { color: rgba(255,107,26,0.6); text-align: right; }
  .msg-label.bot-lbl  { color: rgba(255,215,0,0.4); }

  /* ── TYPING ─────────────────────────────── */
  .typing { display: flex; gap: 5px; align-items: center; padding: 4px 0; }
  .typing-dot {
    width: 6px; height: 6px;
    background: var(--saffron); border-radius: 50%;
    animation: typingBounce 1.2s ease-in-out infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingBounce {
    0%,60%,100% { transform: translateY(0); opacity: 0.5; }
    30%          { transform: translateY(-7px); opacity: 1; }
  }

  /* ── INPUT AREA ─────────────────────────── */
  .input-area {
    flex-shrink: 0;
    padding: clamp(10px, 1.5vh, 16px) 0 clamp(12px, 2vh, 20px);
    background: rgba(13,6,24,0.8);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255,215,0,0.06);
  }

  /* Same centered column as messages */
  .input-inner {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 clamp(14px, 3vw, 28px);
  }

  .input-box {
    display: flex;
    align-items: flex-end;
    gap: clamp(8px, 1vw, 12px);
    background: rgba(26,10,46,0.9);
    border: 1px solid rgba(255,215,0,0.18);
    border-radius: 16px;
    padding: clamp(10px, 1.5vh, 14px) clamp(14px, 2vw, 18px);
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .input-box:focus-within {
    border-color: rgba(255,107,26,0.45);
    box-shadow: 0 0 0 3px rgba(255,107,26,0.06);
  }

  .msg-input {
    flex: 1; min-width: 0;
    background: transparent; border: none; outline: none;
    color: var(--cream);
    font-family: 'Crimson Pro', serif;
    font-size: clamp(14px, 1.4vw, 16px);
    resize: none;
    max-height: clamp(80px, 12vh, 120px);
    min-height: 24px;
    line-height: 1.5;
  }
  .msg-input::placeholder { color: rgba(255,243,220,0.2); font-style: italic; }

  .send-btn {
    width: clamp(34px, 3.5vw, 42px);
    height: clamp(34px, 3.5vw, 42px);
    flex-shrink: 0;
    background: linear-gradient(135deg, var(--saffron), var(--deep-saffron));
    border: none; border-radius: 10px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.25s ease;
    box-shadow: 0 3px 10px rgba(255,107,26,0.35);
  }
  .send-btn:hover:not(:disabled) {
    transform: scale(1.06);
    box-shadow: 0 5px 16px rgba(255,107,26,0.55);
    background: linear-gradient(135deg, var(--gold), var(--saffron));
  }
  .send-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
  .send-btn svg { width: clamp(14px, 1.5vw, 18px); height: clamp(14px, 1.5vw, 18px); fill: white; }

  .input-footer-text {
    text-align: center;
    margin-top: 8px;
    font-size: clamp(9px, 0.8vw, 11px);
    color: rgba(255,243,220,0.15);
    font-style: italic;
    letter-spacing: 0.05em;
  }

  /* ── RESPONSIVE ─────────────────────────── */
 @media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar:not(.closed) {
    transform: translateX(0);
  }
}

  @media (max-width: 480px) {
    .msg-bubble { max-width: 92%; }
  }
`;

const SUGGESTIONS = [
  "Who is Lord Rama?",
  "Tell me about Arjuna",
  "What is Dharma?",
  "Who is Hanuman?",
  "Story of Draupadi",
];

function Particles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 2}px`,
    duration: `${Math.random() * 14 + 10}s`,
    delay: `${Math.random() * 10}s`,
    color: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF6B1A' : '#FF8FAB',
  }));
  return (
    <div className="particles">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left, width: p.size, height: p.size,
          background: p.color, animationDuration: p.duration,
          animationDelay: p.delay,
          boxShadow: `0 0 ${parseInt(p.size) * 2}px ${p.color}`,
        }} />
      ))}
    </div>
  );
}

function MandalaBg({ sidebarOpen }) {
  return (
    <svg className={`mandala-bg ${sidebarOpen ? "" : "sidebar-closed"}`} viewBox="0 0 500 500" fill="none">
      {[...Array(12)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 30} 250 250)`}>
          <ellipse cx="250" cy="120" rx="18" ry="55" fill="rgba(255,215,0,0.6)" />
          <circle cx="250" cy="82" r="7" fill="rgba(255,107,26,0.8)" />
          <line x1="250" y1="250" x2="250" y2="62" stroke="rgba(255,215,0,0.4)" strokeWidth="1" />
        </g>
      ))}
      {[80, 120, 160, 200].map(r => (
        <circle key={r} cx="250" cy="250" r={r} stroke="rgba(255,215,0,0.25)" strokeWidth="0.5" fill="none" />
      ))}
    </svg>
  );
}

const API_URL = "http://localhost:8000/chat";

export default function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sessions, setSessions] = useState([
    { id: 1,  session_id: crypto.randomUUID(),title: "New conversation", messages: [], active: true }
  ]);
  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const activeSession = sessions.find(s => s.id === activeId);
  const messages = activeSession?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages, isLoading]);

  const updateMessages = (id, newMessages) => {
    setSessions(prev => prev.map(s =>
      s.id === id ? { ...s, messages: newMessages } : s
    ));
  };

  const sendMessage = async (text) => {
    const query = text || input.trim();
    if (!query || isLoading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: query }];

    // Update session title from first message
    if (messages.length === 0) {
      setSessions(prev => prev.map(s =>
        s.id === activeId
          ? { ...s, messages: newMessages, title: query.slice(0, 32) + (query.length > 32 ? "..." : "") }
          : s
      ));
    } else {
      updateMessages(activeId, newMessages);
    }

    setIsLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query, session_id: activeSession.session_id }),
      });
      const data = await res.json();
      updateMessages(activeId, [...newMessages, { role: "bot", content: data.answer }]);
    } catch {
      updateMessages(activeId, [...newMessages, {
        role: "bot",
        content: "🙏 The divine connection is momentarily disrupted. Please try again.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const newChat = () => {
    const id = Date.now();
    setSessions(prev => [...prev, { id,session_id: crypto.randomUUID(), title: "New conversation", messages: [], active: false }]);
    setActiveId(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-shell">
        <MandalaBg sidebarOpen={sidebarOpen} />
        <Particles />

        {/* ── SIDEBAR TOGGLE ── */}
        <button className="toggle-btn" onClick={() => setSidebarOpen(o => !o)} title={sidebarOpen ? "Close sidebar" : "Open sidebar"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarOpen
              ? <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>

        {/* ── SIDEBAR ── */}
        <aside className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
          <div className="sidebar-header">
            <div className="sidebar-om">ॐ</div>
            <div className="sidebar-brand">Devotional AI</div>
          </div>

          <button className="new-chat-btn" onClick={newChat}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New conversation
          </button>

          <div className="sidebar-section-label">Recent</div>

          <div className="chat-history-list">
            {[...sessions].reverse().map(s => (
              <div
                key={s.id}
                className={`history-item ${s.id === activeId ? "active" : ""}`}
                onClick={() => setActiveId(s.id)}
              >
                <div className="history-title">{s.title}</div>
                <div className="history-time">Today</div>
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            ✦ Sacred Scriptures Assistant ✦
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="main-area">

          {/* Topbar */}
          <div className="topbar">
            <span className="topbar-title">
              {activeSession?.title === "New conversation" ? "✦ Sacred Scriptures Assistant ✦" : activeSession?.title}
            </span>
            <div className="topbar-right">
              <div className="status-dot" />
              <span className="status-text">Divine Connection Active</span>
            </div>
          </div>

          {/* Messages */}
          <div className="messages-scroll">
            <div className="messages-inner">
              {messages.length === 0 ? (
                <div className="welcome">
                  <div className="welcome-om">ॐ</div>
                  <div className="welcome-title">Namaste 🙏</div>
                  <div className="welcome-sub">
                    Ask me anything about the Ramayana, Mahabharata, or Bhagavad Gita.
                    I shall illuminate the wisdom of the sacred scriptures.
                  </div>
                  <div className="welcome-divider">
                    <div className="welcome-divider-line" />
                    <span className="welcome-divider-icon">✦</span>
                    <div className="welcome-divider-line" />
                  </div>
                  <div className="chips">
                    {SUGGESTIONS.map(s => (
                      <button key={s} className="chip" onClick={() => sendMessage(s)}>{s}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <div key={i} className={`msg-wrapper ${msg.role}`}>
                      {msg.role === "bot" && <div className="bot-avatar">ॐ</div>}
                      <div className={`msg-bubble ${msg.role}`}>
                        <div className={`msg-label ${msg.role === "user" ? "user-lbl" : "bot-lbl"}`}>
                          {msg.role === "user" ? "You" : "✦ Sacred Wisdom ✦"}
                        </div>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="msg-wrapper bot">
                      <div className="bot-avatar">ॐ</div>
                      <div className="msg-bubble bot">
                        <div className="msg-label bot-lbl">✦ Seeking Wisdom ✦</div>
                        <div className="typing">
                          <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="input-area">
            <div className="input-inner">
              <div className="input-box">
                <textarea
                  className="msg-input"
                  placeholder="Ask about Ramayana, Mahabharata, Bhagavad Gita..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />
                <button className="send-btn" onClick={() => sendMessage()} disabled={!input.trim() || isLoading}>
                  <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </button>
              </div>
              <div className="input-footer-text">
                ✦ Powered by Sacred Scriptures · Ramayana · Mahabharata · Bhagavad Gita ✦
              </div>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}
