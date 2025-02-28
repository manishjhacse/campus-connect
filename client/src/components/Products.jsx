import { Code } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoChatbox } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Products({ product }) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const url= import.meta.env.VITE_BASE_URL;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUser, SetisUser] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const [chatList, setChatList] = useState([]);
  const navigate=useNavigate()
  const text = product.description
  const loggedInUser = useSelector((store) => store.user);
  useEffect(() => {
    if (loggedInUser?._id === product?.sellerId?._id) {
      SetisUser(true);
    } else {
      SetisUser(false);
    }
  }, []);

  const handleChat = async () => {
    const toastID=toast.loading("Please wait...");
    let chatId = "";
    let chattingWith = "";
    try {
      const roomId = product?._id;
      const ownerName = product?.sellerId?.firstName+" "+product?.sellerId?.lastName;
      const ownerId = product?.sellerId?._id;
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
          state: { name: loggedInUser?.firstName+" "+loggedInUser?.lastName, chattingWith: chattingWith },
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
      const roomId = product?._id;
      const ownerId = product?.sellerId?._id;;
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
          state: { name: loggedInUser?.firstName+" "+loggedInUser?.lastName, chattingWith: chattingWith },
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const shortText = text.slice(0, 40);
  return (
    <div className="mt-10 ">
      <div className="card md:w-80  max-w-80 mx-3 shadow-xl  bg-[#fafafa] dark:bg-[#111] font-poppins">
        <figure>
          <img className="h-40 w-full object-cover"
            src={product.image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body py-2 w-full px-4">
          <h2 className="card-title ">{product.productName}</h2>
          <div className="flex gap-x-1 flex-wrap">
            <p>
              {isExpanded ? text : shortText}
              {text.length > 40 && !isExpanded && "..."}
            </p>
            {text.length > 40 && (
              <button
                className="text-xs text-green-500"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "See less" : "See more"}
              </button>
            )}
          </div>

          <Code color="success" className="w-fit">
            <span className=" font-bold">Price: {product.price}</span>
          </Code>
          <div className="card-actions justify-end">
            <p className="text-xs ">Created At: {new Date(product.createdAt).toLocaleString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              day: "2-digit",
              month: "2-digit",
            }).replace(",", "")}</p>
            <button onClick={handleChat} className="btn text-2xl px-3 py-2 h-fit min-h-fit text-blue-800 hover:text-blue-900 border-0 rounded-xl shadow-sm font-poppins">
              <IoChatbox />
            </button>
          </div>
        </div>
      </div>
      {/* chatlist */}
      {showChatList && (
        <div className="bg-black shadow-md shadow-white h-[500px] absolute w-[300px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-3 overflow-auto rounded-md max-h-full z-20">
          {chatList?.map((list) => {
            return (
              <div
                className="cursor-pointer uppercase"
                onClick={() => handleChatByUser(list)}
                key={list.interestedId}
              >
                {list.interestedName}
              </div>
            );
          })}
          <div onClick={()=>setShowChatList(false)} className="top-2 cursor-pointer text-xl absolute right-2">
            <MdCancel />
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
