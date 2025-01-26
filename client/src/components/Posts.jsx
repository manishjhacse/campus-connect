/* eslint-disable no-unused-vars */
import React from "react";
import { Avatar, Image } from "@heroui/react";

function Posts() {
  return (
    <div className=" w-fit md:w-[450px] h-fit  mt-3 rounded-lg  bg-[#fafafa] dark:bg-[#111]  dark:text-white-100 text-zinc-800 ">
      <div className="flex">
        <Avatar
          className="mt-3 ml-3 mr-2"
          size="md"
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        />
        <span className=" dark:text-white text-zinc-800 mt-4 text-lg font-semibold">
          Siddhesh Singh
        </span>
      </div>

      <p className=" mx-12 dark:text-white text-zinc-800 ">
        cdfcdfdf fhdfh f hdsdfhfd 🔥⚡💭 Lorem ipsum dolor sit amet consectetur
        adipisicing elit.?
      </p>
      {/* Post Media */}
      <div className="flex  justify-center">
        <Image
          className="my-3 h-fit w-fit rounded-lg "
          alt="Image"
          src="https://heroui.com/images/album-cover.png"
        />
      </div>
    </div>
  );
}

export default Posts;
