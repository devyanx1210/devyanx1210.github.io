import React, { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "What are your skills?",
  "What's your greatest project?",
  "Are you available for hire?",
  "How can I contact Ian?",
];

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent";

const SYSTEM_PROMPT = `You are a helpful AI assistant embedded on Ian Soberano's personal portfolio website.

About Ian:
- 4th-year Computer Engineering student from the Philippines
- Focused on full-stack development and application security
- Skills: React, JavaScript (ES6+), Node.js, MySQL, Firebase, Tailwind CSS, HTML5, CSS3
- Follows OWASP security principles (input validation, SQL injection prevention, secure auth)
- Projects:
  1. RoboTilapia – IoT aquaculture monitoring (pH, temperature, ammonia, dissolved oxygen) using React + Firebase
  2. Kudo Fitness App – Full-stack gym management (React + Node.js + MySQL) with online payments and attendance tracking
  3. Monitree – Personal expense tracker built with React + CSS
- Contact: csoberano1210@gmail.com
- GitHub: https://github.com/devyanx1210
- LinkedIn: https://www.linkedin.com/in/noel-christian-soberano-9b7054383/
- Looking for full-time opportunities in full-stack or security roles

Rules:
- Answer ONLY questions related to Ian's portfolio, skills, projects, experience, or background
- Keep answers concise — 2 to 4 sentences maximum
- If asked something unrelated (e.g. write code for them, general trivia, politics), politely say you can only discuss Ian's profile
- Be friendly and professional`;

function stripHtml(str) {
  return str.replace(/<[^>]*>/g, "").trim();
}

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi! I'm Ian's AI assistant powered by Gemini. Ask me anything about Ian's skills, projects, or how to get in touch.",
    },
  ]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking, open]);

  const send = async (override) => {
    const clean = stripHtml(override ?? input).slice(0, 300);
    if (!clean || thinking) return;

    const userMsg = { from: "user", text: clean };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    if (!API_KEY) {
      setThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "⚠️ Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file to enable the AI agent.",
        },
      ]);
      return;
    }

    const newHistory = [
      ...history,
      { role: "user", parts: [{ text: clean }] },
    ];

    try {
      const res = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: newHistory,
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.7,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.error?.message || "";
        if (res.status === 429 || msg.toLowerCase().includes("quota") || msg.toLowerCase().includes("rate")) {
          throw new Error("rate_limit");
        }
        throw new Error(msg || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "I couldn't generate a response. Please try again.";

      setHistory([
        ...newHistory,
        { role: "model", parts: [{ text: reply }] },
      ]);
      setMessages((prev) => [...prev, { from: "ai", text: reply }]);
    } catch (err) {
      const isRateLimit = err.message === "rate_limit";
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: isRateLimit
            ? "I'm getting too many requests right now. Please wait a few seconds and try again!"
            : `Something went wrong. Please try again.`,
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <button
        className="ai-chat-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI chat"
      >
        <span className="ai-chat-btn-icon">✦</span>
        <span>Ask AI</span>
      </button>

      {open && (
        <div className="ai-chat-modal" role="dialog" aria-label="AI Chat">
          <div className="ai-chat-header">
            <span className="ai-header-dot" />
            <span>Ian's AI Assistant</span>
            <button
              className="ai-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.length === 1 && !thinking && (
              <div className="ai-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="ai-suggestion-chip" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.from === "ai" ? "ai-message" : "user-message"}
              >
                {msg.text.split("\n").map((line, j, arr) => (
                  <span key={j}>
                    {line}
                    {j < arr.length - 1 && <br />}
                  </span>
                ))}
              </div>
            ))}
            {thinking && (
              <div className="ai-thinking">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-input-row">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about Ian..."
              maxLength={300}
              disabled={thinking}
            />
            <button onClick={send} disabled={thinking || !input.trim()}>
              ➤
            </button>
          </div>

          <p className="ai-disclaimer">Powered by Google Gemini (free tier)</p>
        </div>
      )}
    </>
  );
}
