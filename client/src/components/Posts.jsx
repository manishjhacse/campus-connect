/* eslint-disable no-unused-vars */
import React from "react";
import { Avatar, Image } from "@heroui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Posts({post}) {
  const user=useSelector(state=>state.user)
  return (
    <div className=" w-[95%] sm:w-[450px] px-2 h-fit  mt-3 rounded-lg  bg-[#fafafa] dark:bg-[#111]  dark:text-white text-zinc-800 ">
      <div className="flex">
        <Avatar
          className="mt-3 mr-2"
          size="md"
          src={post.authorId?.profilePicture||"https://res.cloudinary.com/db7mrhtue/image/upload/v1734089000/b4be53d8b436db600bcdd1ea59c10e92_ibbnhz.jpg"}
        />
        
        <Link to={user._id===post.authorId?._id?"/profile":`/profile/${post.authorId?._id}`} className=" dark:text-white text-zinc-800 mt-4 text-lg font-semibold">
          {`${post.authorId?.firstName} ${post.authorId?.lastName}`}
        </Link>
      </div>

      {post?.content&&<p className="ml-4 dark:text-white mt-2 text-zinc-800 ">
        {post?.content}
      </p>}
      {/* Post Media */}
      {post?.media&&<div className="flex justify-center">
        <Image
          className="my-3 h-fit w-fit rounded-lg "
          alt="Image"
          src={post?.media}
        />
      </div>}
    </div>
  );
}

export default Posts;
