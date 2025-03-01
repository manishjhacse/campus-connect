import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
function RoomnateCard({ room, setRooms}) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const url = import.meta.env.VITE_BASE_URL;
  const [isUser, SetisUser] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate()
  const loggedInUser = useSelector((store) => store.user);
  useEffect(() => {
    if (loggedInUser?._id === room?.userId?._id) {
      SetisUser(true);
    } else {
      SetisUser(false);
    }
  }, []);

  const handleChat = async () => {
    const toastID = toast.loading("Please wait...");
    let chatId = "";
    let chattingWith = "";
    try {
      const roomId = room?._id;
      const ownerName = room?.userId?.firstName + " " + room?.sellerId?.lastName;
      const ownerId = room?.userId?._id;
      if (isUser) {
        try {
          const res = await axios.post(
            `${url}/getchatlist`,
            { roomId, ownerId },
            {
              withCredentials: true,
            }
          );
          setChatList(res?.data?.chatList);
          setShowChatList(true);
        } catch (err) {
          console.log(err);
        }
        toast.dismiss(toastID)
        toast.success("Chat founds")
        return;
      }
      const res = await axios.get(`${url}/ischatexist`, {
        params: { roomId, ownerId },
        withCredentials: true,
      });
      chatId = res?.data?.chatId;
      chattingWith = ownerName;
      if (!res?.data?.chatExist) {
        try {
          const res = await axios.post(
            `${url}/createnewchat`,
            { roomId, ownerId, ownerName },
            {
              withCredentials: true,
            }
          );
          console.log(res)
          chatId = res?.data?.chat._id;
        } catch (err) {
          console.log(err);
        }
      }
      try {
        navigate(`/chat/${chatId}/${loggedInUser?._id}`, {
          state: { name: loggedInUser?.firstName + " " + loggedInUser?.lastName, chattingWith: chattingWith },
        });
        toast.dismiss(toastID)
        toast.success("Start chatting");
      } catch (err) {
        toast.dismiss(toastID)
        console.log(err);
      }
    } catch (err) {
      toast.dismiss(toastID)
      console.log(err);
    }
  };


  const handleChatByUser = async (list) => {
    const interestedId = list.interestedId;
    const chattingWith = list.interestedName;
    try {
      const roomId = room?._id;
      const ownerId = room?.userId?._id;;
      let chatId = "";
      try {
        const res = await axios.get(`${url}/getchatid`, {
          params: { roomId, ownerId, interestedId },
          withCredentials: true,
        });

        chatId = res?.data?.chatId;
        toast.success("Start chatting")
      } catch (err) {
        console.log(err);
        return;
      }
      try {
        navigate(`/chat/${chatId}/${loggedInUser?._id}`, {
          state: { name: loggedInUser?.firstName + " " + loggedInUser?.lastName, chattingWith: chattingWith },
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteRoom = async () => {
    const toastId = toast.loading('Deleting...');
    const url = import.meta.env.VITE_BASE_URL;
    console.log(url)
    try {
      const response = await axios.delete(`${url}/deleteRoom`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        params: room,
      });
      setRooms((prev) => prev.filter((p) => p._id !== room._id));
      toast.dismiss(toastId)
      toast.success(response.data.message);
    } catch (err) {
      toast.dismiss(toastId)
      console.error(err);
      toast.error(err?.response?.data?.message || "An error occurred");
    }
  }

  return (
    <div className="relative">
      <div className="card card-side transition-all duration-200 shadow-xl m-4 w-[310px] h-[200px] p-0 md:w-[550px] md:h-[220px]  bg-[#fafafa] dark:bg-[#111] ">
        <img
          src={room?.image || "https://res.cloudinary.com/dfrcswf0n/image/upload/v1740833963/pngtree-no-image-vector-illustration-isolated-png-image_4979075_aivery.jpg"}
          alt="roomImage"
          className="h-[200px] md:h-full w-[150px] md:w-[200px] object-cover rounded-md"
        />
        <div className="card-body px-2 md:px-4">
          <h2 className="card-title  text-sm md:text-lg"><Link target="_blank" to={`/profile/${room?.userId?._id}`}>{room?.userId?.firstName}</Link></h2>
          <p className="text-xs md:text-sm mt-0 ">{room?.location}</p>
          <div className=" flex text-xs flex-wrap md:text-sm gap-1 justify-between">
            <p className="flex md:flex-col-reverse flex-row">
              <span className=" font-semibold">{room?.price}</span>
              <span className=" opacity-50 ml-1 md:ml-0">Rent/Person</span>
            </p>
            <p>
              <span className=" opacity-50">Looking for</span> <br />{" "}
              <span className=" font-semibold">{room?.gender}</span>{" "}
            </p>
            <p>
              <span className=" opacity-50">Smoking </span>
              <br /> <span className=" font-semibold">{room?.smoking}</span>
            </p>
          </div>
          <div className="card-actions mt-3 justify-end">
            {room?.userId?.mobile && <button className="btn mx-2 btn-sm md:btn-md bg-[#fafafa] dark:bg-[#111] rounded-full hover:bg-green-500  dark:hover:bg-green-500 transition-all dark:text-white  text-black">
              <a href={`tel:+91${room.userId.mobile}`}><IoCall className="text-[16px]" /></a>
            </button>}
            <button onClick={handleChat} className="btn mx-2 border bg-[#fafafa] dark:bg-[#111] btn-sm md:btn-md rounded-full hover:bg-blue-500 dark:hover:bg-blue-500 transition-all dark:text-white  text-black">
              <IoChatbubbleEllipsesSharp className="text-[16px]" />{" "}
            </button>
          </div>
        </div>
      </div>
      {showChatList && (
        <div className="dark:bg-black bg-white shadow-lg dark:shadow-white shadow-black h-[500px] fixed  w-[320px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-4 overflow-auto rounded-lg max-h-full z-20 transition-all duration-200 dark:text-white text-black border border-gray-300 dark:border-gray-700">
        <div className="text-lg font-semibold mb-3 text-center">Chats</div>
  
        {chatList?.length > 0 ? (
          chatList.map((list) => (
            <div
              key={list.interestedId}
              className="cursor-pointer uppercase p-2 mb-2 bg-green-300 dark:bg-green-700 rounded-md hover:bg-green-500 dark:hover:bg-green-800 transition font-bold"
              onClick={() => handleChatByUser(list)}
            >
              {list.interestedName}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No messages available</p>
        )}
  
        <div
          onClick={() => setShowChatList(false)}
          className="top-2 right-2 cursor-pointer text-2xl absolute text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
        >
          <MdCancel />
        </div>
      </div>
      )}

     { isUser&&<button  onClick={handleDeleteRoom} className="absolute top-5 right-4 text-2xl text-red-700"><MdDelete/></button>}
    </div>
  );
}

export default RoomnateCard;
