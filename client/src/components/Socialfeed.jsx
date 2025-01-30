import React, { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/react";
import { IoSend } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import Posts from "./Posts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { addPost, getAllPosts } from "../store/postSlice";
import PostSkeleton from "./PostSkeleton";

function Socialfeed() {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(false)
  const [postText, setPostText] = useState("");
  const [postFile, setPostFile] = useState();
  const [posting, setPosting] = useState(false);
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const dispatch = useDispatch();
  const handlePost = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_BASE_URL;
    const formData = new FormData();
    formData.append("text", postText);
    if (postFile) {
      formData.append("image", postFile);
    }
    try {
      setPosting(true);
      const response = await axios.post(`${url}/addPost`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      // console.log(response);
      toast.success(response.data.message);
      dispatch(addPost(response.data.post));
      setPostText("");
      setPostFile(null);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      setPosting(false);
    }
  };

  const getPosts = async () => {
    try {
      setLoading(true)
      const url = import.meta.env.VITE_BASE_URL;
      const response = await axios.get(`${url}/getPosts`);
      dispatch(getAllPosts(response.data.posts));
      
    } catch (err) {
      console.log(err);
      toast.error(err.data.message);
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="mt-9 h-fit  w-fit md:w-[610px]">
        <section className=" flex w-fit md:w-[650px] ">
          <div className="avatar w-14 md:w-20 mt-4 online">
            <div className="  mask mask-squircle ">
              <img
                src={
                  user?.profilePicture ||
                  "https://res.cloudinary.com/db7mrhtue/image/upload/v1734089000/b4be53d8b436db600bcdd1ea59c10e92_ibbnhz.jpg"
                }
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
          <label htmlFor="selecting">
            <IoMdPhotos className="w-10 h-10 md:w-12 md:h-12 relative top-5 md:top-6 right-12 md:right-14 p-2 md:p-3 cursor-pointer " />
          </label>
          <input
            type="file"
            id="selecting"
            accept="image/jpeg, image/png,image/gif"
            className="hidden"
            onChange={(e) => setPostFile(e.target.files[0])}
          // value={postFile}
          />
          {posting ? (
            <div className="bg-blue-600 shadow-md shadow-blue-800 w-9 h-9 md:w-12 md:h-12 rounded-full p-3 relative top-6 md:top-6 flex justify-center items-center right-10 md:right-12 text-md md:text-3xl text-center">
              <span className="w-6 h-6 rounded-full border-l-2 border-t-2 border-white animate-spin ease-linear"></span>
            </div>
          ) : (
            <button
              onClick={handlePost}
              className=" bg-blue-600 shadow-md shadow-blue-800 w-9 h-9 md:w-12 md:h-12 rounded-full p-3 relative top-6 md:top-6 right-10 md:right-12 text-md md:text-3xl text-center  "
            >
              <IoSend />
            </button>
          )}
        </section>
      </div>

      {/* Posts */}
      <section className="mt-2 h-full w-fit flex flex-col items-center">
        {loading?[1,2,3,4,5].map(index=><PostSkeleton key={index} />):posts.map((post) => (
          <Posts key={post._id} post={post} />
        ))}
      </section>
    </>
  );
}

export default Socialfeed;
