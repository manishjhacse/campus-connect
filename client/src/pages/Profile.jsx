import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";
import { deletePost } from "../store/postSlice";
import axios from "axios";

export default function Profile() {
  const [userPost, setUserPost] = useState([]);
  const [isDeleting, setisDeleting] = useState(false)
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const dispatch=useDispatch();
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  useEffect(() => {
    const posttoShow = posts?.filter((post) => post.authorId._id === user._id);
    setUserPost(posttoShow);
  }, [posts]);
  const handleDeletePost=async(post)=>{
    setisDeleting(true)
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.delete(`${url}/deletePost`,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        params: post,
      });
      toast.success(response.data.message);
      dispatch(deletePost(post._id))
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      setisDeleting(false);
    }
  }
  return (
    <div className=" flex-col items-center">
      <Navbar />
      <div className="flex flex-col mx-auto items-center gap-2 w-full max-w-[1220px] pt-24">
        <div className="w-fit flex flex-col items-center gap-4">
          <div className="w-fit flex flex-col items-center ">
            <img
              className="rounded-full h-32 w-32 overflow-hidden object-cover"
              src={
                user?.profilePicture ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSooCX-nPSHN0kCVdUnm-eptCPvUF04YaxeHQ&s"
              }
              alt="Profile Pic"
            />
            <input
              className=" mx-1 px-2 py-1 font-bold text-xl font-poppins text-center rounded-lg w-fit  h-fit bg-transparent"
              type="text"
              disabled={true}
              value={user.firstName + " " + user.lastName}
            />
          </div>

          <div className="flex md:flex-row flex-col md:justify-center items-start md:items-center md:w-full   gap-1">
            <div className=" flex-col">
              <div className="flex  items-center w-fit">
                <span className="font-semibold w-14  "> Bio: </span>
                <textarea
                  className=" mx-1 px-2 py-1 rounded-lg w-40 h-10 bg-transparent"
                  type="text"
                  disabled={true}
                >
                  {user.bio || "Add bio.."}
                </textarea>
              </div>
              <div className="flex items-center w-fit">
                <span className="font-semibold w-16">Reg. No: </span>
                <input
                  className=" mx-1 px-2 py-1 rounded-lg w-40 h-fit bg-transparent"
                  type="text"
                  disabled={true}
                  value={user.registration_no}
                />
              </div>
            </div>
            <div className=" flex-col w-full  items-start">
              <div className="flex items-center  w-fit  flex-row ">
                <span className="font-semibold  w-14">Email: </span>
                <input
                  className=" mx-1  px-2 py-1 rounded-lg  w-56 h-fit bg-transparent"
                  type="text"
                  disabled={true}
                  value={user.email}
                />
              </div>
              <div className="flex items-center  w-fit  flex-row ">
                <span className="font-semibold w-14">mobile: </span>
                <input
                  className="  mx-1 px-2 py-1  rounded-lg  w-56 h-fit bg-transparent"
                  type="text"
                  disabled={true}
                  value={user.mobile || "Add mobile no."}
                />
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button className="mt-8 bg-black dark:bg-white text-white dark:text-black px-4 w-fit rounded-md py-2">
          Edit
        </button>
      </div>
      {/* My posts */}
      <div className="mt-16 h-full w-full  flex flex-col items-center  ">
        {userPost?.map((post) => (
          <div key={post._id} className=" w-fit relative">
            <button onClick={()=>handleDeletePost(post)} className=" absolute top-5 right-3 text-lg ">
              <MdDeleteForever />
            </button>{" "}
            <Posts post={post} />{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
