import { useRef, useEffect } from "react";
import MandalaBg from "./components/MandalaBg";
import Particles from "./components/Particles";
import Header from "./components/Header";
import WelcomeScreen from "./components/WelcomeScreen";
import { MessageBubble, TypingIndicator } from "./components/MessageBubble";
import InputArea from "./components/InputArea";
import useChat from "./hooks/useChat";
import "./styles/spiritual.css";

export default function App() {
  const { messages, input, setInput, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "Instant" });
  }, [messages]);

  return (
    <div className="app-container">
      <MandalaBg />
      <Particles />
      <Header />
      <div className="messages-area">
        {messages.length === 0 ? (
          <WelcomeScreen onSuggestionClick={sendMessage} />
        ) : (
          <>
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <InputArea
        input={input}
        setInput={setInput}
        onSend={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}