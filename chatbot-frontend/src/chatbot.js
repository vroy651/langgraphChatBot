import React, { useState, useEffect } from "react";
import "./chatbot.css";
import userAvatar from "./assets/profile.png"; // Import user avatar
import botAvatar from "./assets/bot.png"; // Import bot avatar

const Chatbot = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          text: "Hi there! How can I help you today?",
          user: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, user: true, timestamp: new Date() };
    setMessages([...messages, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botMessage = {
        text: data.response,
        user: false,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = {
        text: "Sorry, I couldn't process that. Please try again.",
        user: false,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]); // Clear the messages in the state
    localStorage.removeItem("messages"); // Clear the messages in local storage
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.user ? "user-message" : "bot-message"
              }`}
            >
              <div className="message-avatar">
                <img
                  src={message.user ? userAvatar : botAvatar} // Use the imported avatars
                  alt="avatar"
                />
              </div>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="timestamp">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {typing && (
            <div className="typing-indicator">
              <span>Bot is typing...</span>
            </div>
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
          <button onClick={clearChat}>Clear Chat</button>{" "}
          {/* Add Clear Chat Button */}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
