import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { toast } from "react-hot-toast";
import { deletePost } from "../store/postSlice";
import axios from "axios";
import { changeLoggedInUser } from "../store/userSlice";

export default function Profile() {
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const user = useSelector((state) => state.user);
  const [changeData, setChangeData] = useState({ firstName: user.firstName, lastName: user.lastName, bio: user.bio, mobile: user.mobile, image: "" })
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const getPosts = async () => {
    try {
      setLoading(true)
      const url = import.meta.env.VITE_BASE_URL;
      const response = await axios.get(`${url}/getUserPost`, { withCredentials: true });
      setUserPost(response.data.posts);
    } catch (err) {
      console.log(err);
      toast.error(err.data.message);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setChangeData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setChangeData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleEdit = async () => {
    if (!changeData.firstName || !changeData.lastName || changeData.firstName.trim() === "" || changeData.lastName.trim() === "") {
      toast.error("Name is required");
      return;
    }
    const toastId = toast.loading("Saving...");
    try {
      const url = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(
        `${url}/editProfile`,
        changeData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.dismiss(toastId);
      toast.success("Saved");
      dispatch(changeLoggedInUser(response.data.user));
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.dismiss(toastId);
      const errorMessage = err?.response?.data?.message || "Failed to save profile";
      toast.error(errorMessage);
    } finally {
      setEditing(false);
    }
  };


  const handleDeletePost = async (post) => {
    const toastId = toast.loading('Deleting...');
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.delete(`${url}/deletePost`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        params: post,
      });
      toast.dismiss(toastId)
      toast.success(response.data.message);
      const updatedUserPost=userPost.filter((p)=>p._id!=post._id)
      setUserPost(updatedUserPost)
      dispatch(deletePost(post._id))
    } catch (err) {
      toast.dismiss(toastId)
      console.error(err);
      toast.error(err?.response?.data?.message || "An error occurred");
    }
  }
  return (
    <div className=" flex-col items-center">
      <Navbar />
      <div className="flex flex-col  mx-auto items-center gap-2 w-full max-w-[1220px] pt-24">
        <div className="w-fit flex flex-col items-center gap-4">
          <div className="w-fit flex flex-col items-center ">
            <div className="relative">
              <img
                className="rounded-full h-32 w-32 overflow-hidden object-cover"
                src={
                  user?.profilePicture ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSooCX-nPSHN0kCVdUnm-eptCPvUF04YaxeHQ&s"
                }
                alt="Profile Pic"
              />
              {editing && <button className="absolute cursor-pointer text-3xl bottom-0 right-0">
                <label className="cursor-pointer" htmlFor="selecting">
                  <MdEdit />
                </label>
                <input
                  type="file"
                  id="selecting"
                  accept="image/jpeg, image/png,image/gif"
                  className="hidden"
                  name="image"
                  onChange={handleChange}
                /></button>}
            </div>
            {editing ? <div className="flex gap-2 md:flex-row flex-col">
              <input type="text" className="w-fit px-2 py-2 outline-none rounded-md" onChange={handleChange} name="firstName" value={changeData.firstName} />
              <input type="text" className="w-fit px-2 py-2 outline-none rounded-md" onChange={handleChange} name="lastName" value={changeData.lastName} />
            </div> : <input
              className=" mx-1  px-2 py-1 font-bold text-xl font-poppins text-center rounded-lg w-fit  h-fit bg-transparent"
              type="text"
              disabled={true}
              name="name"
              value={changeData.firstName + " " + changeData.lastName}
            />}
          </div>

          <div className="flex md:flex-row flex-col md:justify-center items-start md:items-center md:w-full   gap-1">
            <div className=" flex-col">
              <div className="flex  items-center w-fit">
                <span className="font-semibold w-14  "> Bio: </span>
                <textarea
                  className={`mx-1 hide-scrollbar px-2 py-1 rounded-lg w-40 h-10 ${editing ? "" : "bg-transparent"} outline-none`}
                  type="text"
                  disabled={!editing}
                  placeholder="Write Bio"
                  name="bio"
                  onChange={handleChange}
                  value={changeData.bio}
                >
                </textarea>
              </div>
              <div className="flex items-center w-fit">
                <span className="font-semibold w-16">Reg. No: </span>
                <input
                  className=" mx-1 px-2 py-1 rounded-lg w-40 h-fit bg-transparent"
                  type="text"
                  disabled={true}
                  name="registration_no"
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
                  name="email"
                  value={user.email}
                />
              </div>
              <div className="flex items-center  w-fit  flex-row ">
                <span className="font-semibold w-14">mobile: </span>
                <input
                  className={`mx-1 hide-scrollbar px-2 py-1 rounded-lg w-40 h-10 ${editing ? "" : "bg-transparent"} outline-none`}
                  type="text"
                  disabled={!editing}
                  placeholder="Add Mobile No."
                  onChange={handleChange}
                  name="mobile"
                  value={changeData.mobile}
                />
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {
          editing ? <button onClick={handleEdit} className="mt-8 bg-black dark:bg-white text-white dark:text-black px-4 w-fit rounded-md py-2">
            Save
          </button> : <button onClick={() => setEditing(true)} className="mt-8 bg-black dark:bg-white text-white dark:text-black px-4 w-fit rounded-md py-2">
            Edit
          </button>
        }

      </div>
      {/* My posts */}
      <div className="my-16 h-full w-full  flex flex-col items-center  ">
        {loading ? <div className="h-10 w-10 rounded-full border-t-4 border-l-4 animate-spin dark:border-white border-black"></div> : userPost.length > 0 ? userPost?.map((post) => (
          <div key={post._id} className=" w-fit relative">
            <button onClick={() => handleDeletePost(post)} className=" absolute top-5 right-3 text-lg ">
              <MdDeleteForever />
            </button>{" "}
            <Posts post={post} />{" "}
          </div>
        )) : <div>No Post Found</div>}
      </div>
    </div>
  );
}
