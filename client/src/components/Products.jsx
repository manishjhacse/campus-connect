import { Code } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoChatbox } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Products({ product,setProduct,setProductsToShow }) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const url = import.meta.env.VITE_BASE_URL;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUser, SetisUser] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate()
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
    const toastID = toast.loading("Please wait...");
    let chatId = "";
    let chattingWith = "";
    try {
      const roomId = product?._id;
      const ownerName = product?.sellerId?.firstName + " " + product?.sellerId?.lastName;
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
        toast.success("Chats found")
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
          state: { name: loggedInUser?.firstName + " " + loggedInUser?.lastName, chattingWith: chattingWith },
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProduct = async () => {
    const toastId = toast.loading('Deleting...');
    const url = import.meta.env.VITE_BASE_URL;
    console.log(url)
    try {
      const response = await axios.delete(`${url}/deleteProduct`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        params: product,
      });
      setProductsToShow((prev) => prev.filter((p) => p._id !== product._id));
      setProduct((prev) => prev.filter((p) => p._id !== product._id));
      toast.dismiss(toastId)
      toast.success(response.data.message);
    } catch (err) {
      toast.dismiss(toastId)
      console.error(err);
      toast.error(err?.response?.data?.message || "An error occurred");
    }
  }

  const shortText = text.slice(0, 40);
  return (
    <div className="mt-10 relative">
      <div className="card md:w-80  max-w-80 mx-3 shadow-xl  bg-[#fafafa] dark:bg-[#111] font-poppins">
        <figure>
          <img className="h-40 w-full object-cover"
            src={product.image||"https://res.cloudinary.com/dfrcswf0n/image/upload/v1740833963/pngtree-no-image-vector-illustration-isolated-png-image_4979075_aivery.jpg"}
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

      {isUser && <button onClick={handleDeleteProduct} className="absolute top-2 right-4 text-2xl text-red-700"><MdDelete /></button>}
    </div>
  );
}

export default Products;
