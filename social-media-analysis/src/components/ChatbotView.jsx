import { useState } from "react";
import axios from "axios";
import './styles/ChatbotView.css';
import { FaUser, FaRobot } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

export default function ChatbotView() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { type: "user", content: message }]);
    setMessage("");
    setIsLoading(true);

    try {
      const { data } = await axios.post("http://127.0.0.1:8000/chatbot", {
        message: message,
      });
      setChatHistory((prev) => [...prev, { type: "bot", content: data.result }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content) => {
    const urlRegex = /(https?:\/\/[\w.-]+(?:\.[\w\.-]+)+(?:[\w\-._~:\/?#[\]@!$&'()*+,;=.]+)?)/g;
  
    return content.split("\n").map((line, idx) => (
      <p key={idx}>
        {line.split(urlRegex).map((part, index) => {
          if (urlRegex.test(part)) {
            return <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
          }
          return part;
        })}
      </p>
    ));
   
  };
  

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>AI Assistant</h2>
      </div>
      <div className="chat-window">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.type}`}
          >
            {msg.type === "user" ? <FaUser className="chat-icon" /> : <FaRobot className="chat-icon" />}
            <p>{formatMessage(msg.content)}</p>
          </div>
        ))}
        {isLoading && (
          <div className="chat-loading">
            <ClipLoader size={20} color="#007bff" />
            <span>Analyzing...</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
          disabled={isLoading}
        />
        <button type="submit" className="chat-submit-btn" disabled={isLoading}>Send</button>
      </form>
    </div>
  );
}