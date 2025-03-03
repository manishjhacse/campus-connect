import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import Navbar from '../components/Navbar';
export default function Group() {
    const navigate = useNavigate()
    const [roomId, setRoomId] = useState("")
    const [isMobile, setIsMobile] = useState(false);
    async function handleJoin(e) {
        e.preventDefault()
        if (roomId == "") {
            toast.dismiss()
            toast.error("Invalid room id")
            return;
        }
        navigate(`/group/${roomId}`)

    }
    function generateRoomId(e) {
        e.preventDefault()
        const code = uniqid() + "-" + uniqid()
        setRoomId(code)
    }
    useEffect(() => {
        setIsMobile(window.innerWidth < 768); // Detect mobile screens
    }, []);
    if (isMobile) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-xl font-semibold text-red-500">This feature is not designed for mobile devices.</h2>
                <p className="text-gray-600 mt-2">Please try using a tablet or a desktop.</p>
            </div>
        );
    }
    return (
        <div className=" flex-col items-center">
            <Navbar />
            <form className="w-full flex flex-col gap-3 items-center h-screen justify-center">
                <div className='flex flex-col items-start'>
                    <label className='font-bold mb-1' htmlFor="roomId">Room ID</label>
                    <input id='roomId'
                        className='h-7 w-50 outline-none px-2 py-1 border-gray-500 border rounded-md'
                        onChange={(e) => setRoomId(e.target.value)} type="text" name='roomId' value={roomId} />
                </div>

                <button onClick={generateRoomId} className='text-xs underline'>Create RoomId</button>
                <button onClick={e => handleJoin(e)} className='bg-red-500 px-3 py-1 rounded-md font-bold'>Join Room</button>
            </form>

        </div>
    )
}
