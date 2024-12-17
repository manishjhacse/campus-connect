import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
export default function Group() {
    const navigate=useNavigate()
    const [roomId, setRoomId] = useState("")
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
    return (
        <div>
            <form className='flex relative flex-col items-center gap-3 '>
                <div className='flex flex-col items-start'>
                    <label htmlFor="roomId">Room ID</label>
                    <input id='roomId'
                        onChange={(e) => setRoomId(e.target.value)} type="text" name='roomId' value={roomId} />
                </div>
                <button onClick={e => handleJoin(e)} className='bg-red-500 px-3 py-1 rounded-md font-bold'>Join Room</button>
                <button onClick={generateRoomId} className='text-xs underline absolute right-0 -bottom-5'>Create RoomId</button>
            </form>
        </div>
    )
}
