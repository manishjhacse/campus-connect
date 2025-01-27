import React, { useState } from "react";
import { Textarea } from "@nextui-org/react";
import { IoSend } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import Posts from "./Posts";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

function Socialfeed() {
  const user = useSelector(state => state.user)
  const [postText, setPostText] = useState("");
  const [postFile, setPostFile] = useState();
  const token = localStorage.getItem("token")
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const handlePost = async () => {
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${url}/addPost`, { text: postText, image: postFile })
      toast.success(response.data.message)
      setPostText("")
      setPostFile(null)
    } catch (err) {
      toast.err(err.data.message)

    }

  }

  return (
    <>
      <div className="mt-9 h-fit  w-fit md:w-[610px]">
        <section className=" flex w-fit md:w-[650px] ">
          <div className="avatar w-14 md:w-20 mt-4 online">
            <div className="  mask mask-squircle ">
              <img
                src={user?.profilePicture || "https://res.cloudinary.com/db7mrhtue/image/upload/v1734089000/b4be53d8b436db600bcdd1ea59c10e92_ibbnhz.jpg"}
                className="w-fit h-fit"
              />
            </div>
          </div>
          <Textarea
            className=" mt-5 h-12 md:h-14 mx-3 hide-scrollbar"
            maxRows={2}
            placeholder="What is happening?"
            variant="flat"
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
          />
          <label htmlFor="selectimg">
            <IoMdPhotos className="w-10 h-10 md:w-12 md:h-12 relative top-5 md:top-6 right-12 md:right-14 p-2 md:p-3 cursor-pointer " />
          </label>
          <input
            type="file"
            id="selectimg"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => setPostFile(e.target.files[0])}
            // value={postFile}
          />
          <button onClick={handlePost} className=" bg-blue-600 shadow-md shadow-blue-800 w-9 h-9 md:w-12 md:h-12 rounded-full p-3 relative top-6 md:top-6 right-10 md:right-12 text-md md:text-3xl text-center  ">
            <IoSend />
          </button>
        </section>
      </div>

      {/* Posts */}
      <section className="mt-2 h-full w-fit flex flex-col items-center">
        <Posts />
        <Posts />
        <Posts />
        <Posts />
      </section>
    </>
  );
}

export default Socialfeed;
