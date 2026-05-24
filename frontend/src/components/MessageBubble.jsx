import ReactMarkdown from "react-markdown";

export function MessageBubble({ message }) {
  const { role, content } = message;

  return (
    <div className={`message-wrapper ${role}`}>
      {role === "bot" && (
        <div className="bot-avatar">ॐ</div>
      )}

      <div className={`message-bubble ${role}`}>

        <div
          className={`message-label ${
            role === "user" ? "user-label" : "bot-label"
          }`}
        >
          {role === "user" ? "You" : "✦ Sacred Wisdom ✦"}
        </div>

        <div className="message-content">
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>

      </div>
    </div>
  );
}
export function TypingIndicator() {
  return (
    <div className="message-wrapper bot">
      <div className="bot-avatar">ॐ</div>
      <div className="message-bubble bot">
        <div className="message-label bot-label">✦ Seeking Wisdom ✦</div>
        <div className="typing-indicator">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </div>
  );
}
