import React, { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Chat = ({ socket, room, name,userID }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const chatRef = useRef(null); 
  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
      scrollToBottom();
    };

    const handleRoomUsers = (usersList) => {
      setUsers(usersList);
      if (usersList.length < users.length) {
        toast.error(`A user left the room`);
      }
    };

    socket.on("message", handleMessage);
    socket.on("roomUsers", handleRoomUsers);

    return () => {
      socket.off("message", handleMessage);
      socket.off("roomUsers", handleRoomUsers);
    };
  }, [socket]);

  const sendMessage = () => {
    if (!message.trim()) return; // Prevent empty messages
    socket.emit("sendMessage", { room, message: message.trim(), user: name,id:userID });
    setMessage("");
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="bg-gray-900 text-white h-screen hideScroll overflow-y-scroll flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-xl font-semibold">Chat Room</h3>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 hideScroll overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${msg.id === userID ? "items-end" : "items-start"}`}
          >
            <div
              className={`p-3 max-w-[70%] rounded-lg shadow-md text-sm ${
                msg.id === userID
                  ? "bg-green-500 text-white self-end"
                  : "bg-gray-700 text-white self-start"
              }`}
            >
              <p>{msg.text}</p>
            </div>
            <Link target="_blank" to={`/profile/${msg.id}`} className="text-xs text-gray-300 mt-1">{msg.user}</Link>
          </div>
        ))}
        <div ref={chatRef}></div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 flex items-center">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-800 text-white rounded-full outline-none px-4"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Allow Enter key to send
        />
        <button
          className="ml-2 p-2 bg-green-500 rounded-full text-white"
          onClick={sendMessage}
        >
          <IoIosSend size={24} />
        </button>
      </div>

      {/* Active Users List */}
      <div className="px-4 py-2 border-t border-gray-700">
        <h3 className="text-lg text-center font-bold">Active Users {`(${users.length})`}</h3>
        <ul className="text-gray-300 ">
          {users.map((user, index) => (
            <li key={index}>
              <Link to={`/profile/${user.userId}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
