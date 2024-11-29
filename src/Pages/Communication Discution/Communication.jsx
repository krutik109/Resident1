import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import "./Communication.css";
import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";

const Communication = () => {

    const [isFormVisible, setIsFormVisible] = useState(false); // To toggle form visibility
    const [newQuestion, setNewQuestion] = useState(""); // To store the question input
    const [chat, setChat] = useState([]); // To store chat messages
  
    // Toggle form visibility
    const handleImageClick = () => {
      setIsFormVisible(!isFormVisible);
    };
  
    // Add question to the chat
    const handleAddQuestion = () => {
      if (newQuestion.trim()) {
        setChat([...chat, { type: "question", text: newQuestion }]);
        setNewQuestion(""); // Reset the input field
        setIsFormVisible(false); // Hide the form after submission
      }
    };
  
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
        name: "Community",
        time: "7:00",
        lastMessage: "Typing",
        totalchat:"src/Images/chatnumber.png",
        avatar: "src/Images/Avatar.png",
        messages: [
          { sender: "Elizabeth",votes:"0 votes" ,text: "What is the capital of France?",ans:"Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.",ansnumber:"1Answer" , time: "9:20" },
          { sender: "Elizabeth",votes:"3 votes" ,text: "What is the capital of France?",ans:"Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your."
            ,ansnumber:"0Answer" , time: "9:20" },
          { sender: "Elizabeth",votes:"0 votes" ,text: "What is the capital of France?",ans:"Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.", time: "9:20" },
          { sender: "Elizabeth",votes:"0 votes" ,text: "What is the capital of France?",ans:"Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content! Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your.",ansnumber:"0Answer" ,time: "9:20" },
        ],
      },
    {
      id: 3,
      name: "Elizabeth Sarah",
      time: "10:27",
      lastMessage: "Thank you for your order!",
      done:"src/Images/done.png",
      avatar: "src/Images/profileImg.png",
      messages: [
        { sender: "Elizabeth", text: "Thanks for your help!", time: "9:20" },
      ],
    },
    {
      id: 4,
      name: "Jenny Willson",
      time: "7:00",
      lastMessage: "Hello there!",
      totalchat:"src/Images/chatnumber.png",
      avatar: "src/Images/profileImg.png",
      messages: [
        { sender: "Elizabeth", text: "Thanks for your help!", time: "9:20" },
      ],
    },

  ]);

  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [forwardMode, setForwardMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const [sidebarVisible, setSidebarVisible] = useState(false);

const toggleSidebar = () => {
  setSidebarVisible(!sidebarVisible);
};

  const handleFileUpload = (file) => {
    if (!file) return;
  
    // Create a temporary URL for the file
    const fileURL = URL.createObjectURL(file);
  
    // Check if the file is an image
    const isImage = file.type.startsWith("image/");
  
    const updatedChat = {
      ...selectedChat,
      messages: [
        ...selectedChat.messages,
        {
          sender: "You",
          text: isImage ? null : `📎 ${file.name}`,
          fileURL: fileURL, // Add the file URL
          isImage: isImage, // Indicate if it's an image
          time: new Date().toLocaleTimeString(),
        },
      ],
    };
    setSelectedChat(updatedChat);
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
  
      recorder.ondataavailable = (event) => {
        const audioURL = URL.createObjectURL(event.data);
        const updatedChat = {
          ...selectedChat,
          messages: [
            ...selectedChat.messages,
            { sender: "You", text: "🎤 Voice Message", audio: audioURL, time: new Date().toLocaleTimeString() },
          ],
        };
        setSelectedChat(updatedChat);
      };
  
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };
  


  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage((prev) => prev + emoji.emoji);
  };

  window.onresize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  return (
    <div className="chat-app container-fluid rounded">
  {/* Top Bar (only on mobile) */}
  <div className="top-bar d-block d-sm-none">
    <div className="menu-icon" onClick={toggleSidebar}>
      &#9776; {/* Hamburger icon */}
    </div>
    <h5>Chat</h5>
  </div>

  {/* Sidebar */}
  <div className={`chat-sidebar p-3 ${sidebarVisible ? "show" : ""}`}>
    <h5 className="text-dark">Chat</h5>
    <div className="search-bar-container">
      <img src="src/Images/search.png" className=" text-dark" alt="Search" />
      <input type="text" placeholder="Search Here" className="search-bar border-0" />
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
            <p className={`${chat.lastMessage === "Typing" ? "text-success " : "" } `}>{chat.lastMessage}</p>
          </div>
          <div>
            <p className="time">{chat.time}</p>
            <span>{chat.done && <img src={chat.done} alt="Done" className="done" />} </span>
            <span>{chat.totalchat && <img src={chat.totalchat} alt="Unread" className="unread" />}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>

  {/* Chat Window */}
  <div className={`chat-window ${isMobile && sidebarVisible ? "expanded" : ""}`}>
    <div className="chat-header d-flex align-items-center">
      <div className="chat-info d-flex align-items-center">
        <img src={selectedChat.avatar} alt={selectedChat.name} className="avatar" />
        <div>
          <h5>{selectedChat.name}</h5>
          <span>{selectedChat.time}</span>
        </div>
      </div>
      <div className="chat-options d-flex gap-2 align-items-center justify-content-end">
        <img  style={{width:"12vh"}} src="src/Images/addquestion.png" role="button" alt="Video Call"  onClick={handleImageClick} />
    
        <img
          src="src/Images/more.png"
          role="button"
          alt="More Options"
          onClick={() => setShowPopover(!showPopover)}
        />
        {showPopover && (
          <div className="popover">
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  selectedChat.messages.map((msg) => msg.text).join("\n")
                )
              }
            >
              Copy
            </button>
            <button onClick={() => setForwardMode(true)}>Forward</button>
          </div>
        )}
      </div>
    </div>

    {/* Chat Messages */}
    <div className="messages">
      {selectedChat.messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
          {msg.isImage ? (
            <img src={msg.fileURL} alt="Uploaded" className="chat-image" />
          ) : msg.fileURL ? (
            <a href={msg.fileURL} download={msg.text}>
              {msg.text}
            

            </a>
          ) : (
            <div style={{ padding: "10px 0", marginBottom: "10px" }}>
            {/* Question Section */}
            <div className="d-flex gap-3"  style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <p style={{ color: "#6c757d", fontSize: "14px", margin: 0 }}>{msg.votes} </p>
              <h6 style={{ color: "#212529", fontSize: "16px", marginLeft: "10px", margin: 0 }}>{msg.text}</h6>
            </div>
          
            {/* Answer Section */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <p style={{ color: "#007bff", fontSize: "14px", marginRight: "5px" }}>
                {msg.ansnumber} 
              </p>
              <p style={{ color: "#495057", fontSize: "14px", margin: 0 }}>{msg.ans}</p>
            </div>
          </div>
          
          )}
          <span className="time">{msg.time}</span>
        </div>
      ))}
    </div>

    {/* Message Input */}
    <div className="bg-white d-flex align-items-center">
    {isFormVisible && (
        <div className="p-3 pt-0">
          <div className="p-4 bg-light border rounded mb-3">
            <h6 className="mb-3">Title</h6>
            <p>Be specific and imagine you're asking a question to another person.</p>
            <input
              type="text"
              className="form-control community-que-input"
              placeholder="e.g., Is there an R function for finding the index of an element in a vector?"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <Button
              onClick={handleAddQuestion}
              className="btn maintainance-income-btn-bg border-0"
              style={{ width: "70px", height: "51px", borderRadius: "10px" }}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default Communication;
