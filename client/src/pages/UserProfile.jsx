import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProfileSkeleton from "../components/ProfileSkeleton";
import PostSkeleton from "../components/PostSkeleton";

export default function UserProfile() {
    const [userPost, setUserPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({})
    const { userId } = useParams()
    const navigate = useNavigate();
    const getPosts = async () => {
        try {
            setLoading(true);
            const url = import.meta.env.VITE_BASE_URL;

            const response = await axios.get(`${url}/getOtherPost`, {
                params: { userId },
            });
            setUserPost(response.data.posts);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const url = import.meta.env.VITE_BASE_URL;
            const response = await axios.get(`${url}/getUserDetails`, {
                params: { userId },
            });
            setUser(response.data.user);
        } catch (err) {
            navigate("/undefined")
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserDetails();
        getPosts();
    }, []);


    return (
        <div className=" flex-col items-center">
            <Navbar />
            <div className="flex flex-col  mx-auto items-center gap-2 w-full max-w-[1220px] pt-24">
                {loading ?<ProfileSkeleton/> :
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
                        </div>
                        <input
                            className=" mx-1  px-2 py-1 font-bold text-xl font-poppins text-center rounded-lg w-fit  h-fit bg-transparent"
                            type="text"
                            disabled={true}
                            name="name"
                            value={user?.firstName + " " + user?.lastName}
                        />
                    </div>

                    <div className="flex md:flex-row flex-col md:justify-center items-start md:items-center md:w-full   gap-1">
                        <div className=" flex-col">
                            {user?.bio&&<div className="flex  items-center w-fit">
                                <span className="font-semibold w-14  "> Bio: </span>
                                <textarea
                                    className={`mx-1 hide-scrollbar px-2 py-1 rounded-lg w-40 h-10 bg-transparent outline-none`}
                                    type="text"
                                    disabled={true}
                                    placeholder="Write Bio"
                                    name="bio"
                                    value={user?.bio}
                                >
                                </textarea>
                            </div>}
                            <div className="flex items-center w-fit">
                                <span className="font-semibold w-16">Reg. No: </span>
                                <input
                                    className=" mx-1 px-2 py-1 rounded-lg w-40 h-fit bg-transparent"
                                    type="text"
                                    disabled={true}
                                    name="registration_no"
                                    value={user?.registration_no}
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
                                    value={user?.email}
                                />
                            </div>
                           {user?.mobile&& <div className="flex items-center  w-fit  flex-row ">
                                <span className="font-semibold w-14">mobile: </span>
                                <input
                                    className={`mx-1 hide-scrollbar px-2 py-1 rounded-lg w-40 h-10 bg-transparent outline-none`}
                                    type="text"
                                    disabled={true}
                                    placeholder="Add Mobile No."
                                    name="mobile"
                                    value={user?.mobile}
                                />
                            </div>}{" "}
                        </div>
                    </div>
                </div>}
            </div>

            {/* My posts */}
            <div className="my-16 h-full w-full  flex flex-col items-center  ">
                {loading ? [1,2,3].map(index=><PostSkeleton key={index} />): userPost.length > 0 ? userPost?.map((post) => (
                    <div key={post._id} className=" w-fit relative">
                        <Posts post={post} />{" "}
                    </div>
                )) : <div>No Post Found</div>}
            </div>
        </div>
    );
}
