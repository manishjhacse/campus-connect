import Navbar from "../components/Navbar";
import { IoSend } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { useLocation, useParams } from "react-router-dom";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
function Chat() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const url = import.meta.env.VITE_BASE_URL;
  const loggedInUser = useSelector((state) => state.user);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { chatId, userId } = useParams();
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const senderName = location.state.name;

  useEffect(() => {
    if (!token) {
      console.error("Token not found");
      return;
    }
    socket.current = io.connect(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.current.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.current.emit("startChat", { chatId });

    socket.current.on("receive_message", (messageData) => {
      console.log("Message received:", messageData);
      setChats((prev) => [...prev, messageData]);
    });

    return () => {
      socket.current.off("receive_message");
      socket.current.disconnect();
    };
  }, [chatId, token]);

  useEffect(() => {
    const getPrevMessages = async () => {
      try {
        const res = await axios.get(`${url}/getchats`, {
          params: { chatId },
          withCredentials: true,
        });
        const messages = res.data?.chat?.messages || [];
        setChats(messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setChats([]);
      }
    };

    getPrevMessages();
  }, [chatId, url]);

  const handleSend = async () => {
    if (message === "") return;
    const messageData = {
      chatId,
      senderId: userId,
      senderName,
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    await socket.current.emit("send_message", messageData);
    setChats((prev) => [...prev, messageData]);
    setMessage("");
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chatId);
      console.log("RoomId Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex justify-center pt-20 items-center">
        {/* <h1 className="text-xl font-semibold mb-4">{`Chatting with ${chattingWith}`}</h1> */}
      </div>
      <section className="h-full px-4 overflow-y-auto hideScrollBar pb-16">
        {chats.map((messageContent, index) => {
          const isUserMessage = loggedInUser._id === messageContent.senderId;
          return (
            <div
              key={index}
              className={`chat ${isUserMessage ? "chat-end" : "chat-start"}`}
            >
              <div
                className={`chat-bubble ${
                  isUserMessage ? "bg-blue-600" : "bg-green-600"
                }  text-white px-3 py-2 max-w-xs sm:max-w-sm`}
              >
                <p className="break-words text-sm">{messageContent.message}</p>
              </div>
              <div className="chat-footer text-xs text-gray-400 mt-1">
                <span>{messageContent.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </section>
      {/* Send Message Input */}
      <div className=" flex z-50 justify-center items-center fixed bottom-0 w-full p-2">
         <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Send Message..."
          className="input mx-1 input-bordered rounded-full w-full max-w-xs dark:bg-slate-800 bg-white shadow-md text-black dark:text-white active:outline-none focus:outline-none"
        />
        <button  onClick={handleSend} className=" bg-blue-600  shadow-md shadow-blue-800 w-10 h-10 md:w-11 md:h-11 rounded-full p-3 relative text-xl md:text-2xl text-center text-white mx-1">
          <IoSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
