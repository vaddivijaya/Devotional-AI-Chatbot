const SUGGESTIONS = [
  "Who is Lord Rama?",
  "Tell me about Arjuna",
  "What is Dharma?",
  "Who is Hanuman?",
  "Story of Draupadi",
];

export default function WelcomeScreen({ onSuggestionClick }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-om">ॐ</div>
      <div className="welcome-title">Namaste 🙏</div>
      <div className="welcome-subtitle">
        Ask me anything about the Ramayana, Mahabharata, or Bhagavad Gita.
        I shall illuminate the wisdom of the sacred scriptures.
      </div>
      <div className="welcome-divider">
        <div className="welcome-divider-line" />
        <span className="welcome-divider-icon">✦</span>
        <div className="welcome-divider-line" />
      </div>
      <div className="suggestion-chips">
        {SUGGESTIONS.map(s => (
          <button key={s} className="chip" onClick={() => onSuggestionClick(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
