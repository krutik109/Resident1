import React, { useState } from "react";
import { FaCamera, FaSearch } from "react-icons/fa"; // Importing the search icon
import "./AccessForums.css"; // Include the styles here
import { FaViadeo } from "react-icons/fa6";

const AccessForums = () => {
  const [chats] = useState([
    {
      id: 1,
      name: "Michael John",
      time: "10:27",
      lastMessage: "Hi, John! How are you doing?",
      avatar: "src/Images/profileImg.png",
      messages: [
        { sender: "Michael", text: "Hi there, how are you?", time: "9:20" },
        { sender: "You", text: "I am good, thank you!", time: "9:22" },
      ],
    },
    {
      id: 2,
      name: "Elizabeth Sarah",
      time: "10:27",
      lastMessage: "Thank you for your order!",
      avatar: "src/Images/profileImg.png",
      done: "src/Images/done.png",

      messages: [
        { sender: "Elizabeth", text: "Thanks for your help!", time: "9:20" },
      ],
    },{
      id: 3,
      name: "Jenny Willson" ,
      time: "7:00",
      lastMessage: "Hello there!",
      avatar: "src/Images/profileImg.png",
      messages: [
        { sender: "Elizabeth", text: "Thanks for your help!", time: "9:20" },
      ],
    },
  ]);

  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle selecting a chat
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const updatedChat = {
      ...selectedChat,
      messages: [
        ...selectedChat.messages,
        { sender: "You", text: newMessage, time: new Date().toLocaleTimeString() },
      ],
    };
    setSelectedChat(updatedChat);
    setNewMessage("");
  };

  // Handle resizing for mobile responsiveness
  window.onresize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  return (
    <div className="chat-app container-fluid rounded">
      {/* Sidebar */}
      <div className={`chat-sidebar ${isMobile && !selectedChat ? "hidden" : ""}`}>
        <h4 className="text-dark">Chat</h4>
        <div className="search-bar-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search Here" className="search-bar " />
        </div>
        <ul className="chat-list">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`chat-item ${selectedChat.id === chat.id ? "active" : ""}`}
              onClick={() => handleChatClick(chat)}
            >
              <img src={chat.avatar} alt={chat.name} className="avatar" />
              <div className="chat-info">
                <h5>{chat.name}</h5>
                <p>{chat.lastMessage}</p>
              </div>
              <span className="time">{chat.time}</span>
              <img src={chat.done} alt="" />
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${isMobile && selectedChat ? "expanded" : ""}`}>
        <div className="chat-header d-flex align-items-center">
          <div className="chat-info d-flex align-items-center" >
<div>
  
          <img src={selectedChat.avatar} alt={selectedChat.name} className="avatar" />
</div>
<div>

          <h5>{selectedChat.name}</h5>
        <span>{selectedChat.time}</span>
</div>
          </div>
          <div className="chat-options d-flex  gaalign-items-center justify-content-end">
           <img src="src/Images/video.png" role="button" alt="" />
            <img src="src/Images/call.png" role="button" alt="" />
            <img src="src/Images/more.png" role="button" alt="" />
          </div>
        </div>

        <div className="messages">
          {selectedChat.messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "You" ? "sent" : "received"}`}
            >
              <p>{msg.text}</p>
              <span className="time">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="message-input">
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default AccessForums;
