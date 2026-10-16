import { useState, useRef, useEffect } from "react";

const GEMINI_SYSTEM_PROMPT =
  "You are CodeNest AI, a friendly Java programming tutor. " +
  "Help students learn Java concepts, debug code, and explain programming topics. " +
  "Keep answers concise and beginner-friendly. Use code examples when helpful.";

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm CodeNest AI. Ask me anything about Java programming!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await getAIResponse(trimmed);
      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    } catch (err) {
      const errorMessage =
        err?.message?.includes("VITE_GEMINI_API_KEY")
          ? "Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file."
          : "Sorry, I couldn't process that. Please try again!";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function getAIResponse(userMessage) {
    // Reads key from environment (.env file or deployment dashboard) with fallback
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyC8QIqtL-kjGmmbFAl5kzwZ-08-Oo4DdbQ";
    if (!API_KEY) {
      throw new Error("Missing VITE_GEMINI_API_KEY");
    }

    const candidateModels = [
      "gemini-3.5-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.1-flash-lite",
      "gemini-3.8-flash",
    ];

    let lastError = null;
    for (const model of candidateModels) {
      try {
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: GEMINI_SYSTEM_PROMPT }],
            },
            contents: [
              {
                parts: [{ text: userMessage }],
              },
            ],
          }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.warn(`Gemini API error with model ${model}:`, res.status, errorData);
          lastError = new Error(`API error ${res.status}`);
          continue;
        }

        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return text;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Fetch error with model ${model}:`, err);
      }
    }

    throw lastError || new Error("Failed to get response from AI");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close chat" : "Ask AI"}
      >
        {isOpen ? "✕" : "🤖"}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-avatar">🤖</span>
              <div>
                <strong>CodeNest AI</strong>
                <small>Java Programming Tutor</small>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-msg ${msg.role}`}
              >
                {msg.role === "assistant" && (
                  <span className="chatbot-msg-avatar">🤖</span>
                )}
                <div className="chatbot-msg-bubble">
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chatbot-msg assistant">
                <span className="chatbot-msg-avatar">🤖</span>
                <div className="chatbot-msg-bubble chatbot-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask about Java..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="chatbot-send"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatbot;
