export default function InputArea({ input, setInput, onSend, isLoading }) {

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="input-area">
      <div className="input-container">
        <textarea
          className="message-input"
          placeholder="Ask about Ramayana, Mahabharata, Bhagavad Gita..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="send-button"
          onClick={onSend}
          disabled={!input.trim() || isLoading}
        >
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
      <div className="input-footer">
        <span className="input-footer-text">
          ✦ Powered by Sacred Scriptures · Ramayana · Mahabharata · Bhagavad Gita ✦
        </span>
      </div>
      <div className="lotus-footer">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="lotus-petal" style={{ opacity: 0.2 + i * 0.1 }} />
        ))}
      </div>
    </div>
  );
}
