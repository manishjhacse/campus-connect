/* eslint-disable no-unused-vars */
import React from "react";
import { Textarea } from "@nextui-org/react";
import { IoSend } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import Posts from "./Posts";

function Socialfeed() {
  return (
    <>
      <div className="mt-9 h-fit  w-fit md:w-[610px]">
        <section className=" flex w-fit md:w-[650px] ">
          <div className="avatar w-14 md:w-20 mt-4 online">
            <div className="  mask mask-squircle ">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className="w-fit h-fit"
              />
            </div>
          </div>
          <Textarea
            isClearable
            className=" mt-5 h-10 md:h-14 mx-3 "
            maxRows={2}
            placeholder="What is happening?"
            variant="flat"
          />
          <IoMdPhotos className="w-10 h-10 md:w-12 md:h-12 relative top-5 md:top-6 right-12 p-2 cursor-pointer " />

          <button className=" bg-blue-600 shadow-md shadow-blue-800 w-9 h-9 md:w-12 md:h-12 rounded-full p-3 relative top-5 md:top-6 right-8 md:right-10 text-md md:text-3xl text-center  ">
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
