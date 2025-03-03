import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import CodeEditor from "../components/CodeEditor";
import Whiteboard from "../components/Whiteboard";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const url = import.meta.env.VITE_SOCKET_URL;

export default function StudySession() {
    const [socket, setSocket] = useState(null);
    const [whatToShow, setWhatToShow] = useState("code-editor");
    const { roomId } = useParams();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const newSocket = io(url, {
            withCredentials: true,
            transports: ["websocket", "polling"],
            forceNew: true,
        });
        setSocket(newSocket);

        return () => newSocket.disconnect(); // Cleanup socket on unmount
    }, []);

    useEffect(() => {
        if (socket && user?.firstName && user?._id) {
            socket.emit("joinRoom", { name: user.firstName, room: roomId, id: user._id });
        }
    }, [socket, roomId, user]);

    if (!socket) return <div>Loading...</div>; // Prevent rendering before socket connects
    return (
        <div className="h-screen w-screen flex">
            {/* Sidebar - Chat & Toggle Buttons */}
            <div className="h-full w-[25%] bg-gray-900 flex flex-col">
                <Chat userID={user._id} socket={socket} room={roomId} name={user.firstName} />
                <div className="flex justify-around p-3 border-t border-gray-700">
                    <button
                        className={`p-2 w-1/2 ${whatToShow === "code-editor" ? "bg-green-500" : "bg-gray-700"} text-white rounded-lg`}
                        onClick={() => setWhatToShow("code-editor")}
                    >
                        Code Editor
                    </button>
                    <button
                        className={`p-2 w-1/2 ${whatToShow === "whiteboard" ? "bg-green-500" : "bg-gray-700"} text-white rounded-lg`}
                        onClick={() => setWhatToShow("whiteboard")}
                    >
                        Whiteboard
                    </button>
                </div>
            </div>

            {/* Main Content - Code Editor / Whiteboard */}
            <div className="w-[75%] h-full bg-gray-800">
                {whatToShow === "code-editor" ? (
                    <CodeEditor socket={socket} room={roomId} />
                ) : (
                    <Whiteboard socket={socket} room={roomId} />
                )}
            </div>
        </div>
    );
}
