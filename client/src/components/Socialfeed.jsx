/* eslint-disable no-unused-vars */
import React from "react";
import { Textarea } from "@nextui-org/react";
import { IoSend } from "react-icons/io5";

function Socialfeed() {
  return (
    <div className="mt-9">
      <section className=" flex w-fit md:w-[600px]  bg-red-60 ">
        <div className="avatar w-14 md:w-20 mt-4 online">
          <div className="  mask mask-squircle ">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="w-fit h-fit"
            />
          </div>
        </div>
        <Textarea
          className=" mt-5 h-10 md:h-14 mx-3"
          // label="Description"
          // labelPlacement="inside"
          placeholder="What is happening?"
          variant="flat"
        />
        <button className=" bg-blue-600 shadow-md shadow-blue-800 w-9 h-9 md:w-12 md:h-12 rounded-full p-3  relative top-6 text-md  md:text-3xl text-center  ">
          <IoSend />
        </button>
      </section>
    </div>
  );
}

export default Socialfeed;
