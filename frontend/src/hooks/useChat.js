import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/chat";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 const sendMessage = async (text = "") => {
  const query =
    typeof text === "string"
      ? text
      : input.trim();

  if (!query || isLoading) return;

  setMessages(prev => [
    ...prev,
    { role: "user", content: query }
  ]);

  setInput("");
  setIsLoading(true);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: query,
        chat_history: []
      }),
    });

    const data = await response.json();

    setMessages(prev => [
      ...prev,
      {
        role: "bot",
        content: data.answer,
      }
    ]);

  } catch {
    setMessages(prev => [
      ...prev,
      {
        role: "bot",
        content:
          "🙏 The divine connection is momentarily disrupted. Please try again.",
      }
    ]);
  } finally {
    setIsLoading(false);
  }
};

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
  };
}
