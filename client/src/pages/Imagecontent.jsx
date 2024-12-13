/* eslint-disable no-unused-vars */
import React from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { Image } from "@nextui-org/image";

function Imagecontent() {
  return (
    <section className="mx-4 my-6 grid max-w-[90rem] grid-cols-1 justify-center gap-12 lg:mx-auto lg:grid-cols-[repeat(auto-fit,minmax(30rem,1fr))]">
      <div className="flex items-center justify-end">
        <Image
          isBlurred
          className="mx-auto aspect-[1/0.7] w-full rounded-2xl object-cover sm:aspect-[1/0.5] sm:object-top lg:aspect-[1.25/1] lg:max-w-[33rem]"
          src="https://img.freepik.com/free-vector/conversation-concept-illustration_114360-1102.jpg?t=st=1734067264~exp=1734070864~hmac=b3445c7a60ee76f12cbbbcbf0f676346f230e45124d0ff894b3af06083114aeb&w=1060"
          alt="A collaborative social platform"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-8 text-slate-950 dark:text-slate-50 sm:gap-10">
        <h3 className="text-3xl font-bold sm:max-w-[80%] sm:text-4xl">
          Campus <span className=" text-red-500">Connect</span>: the
          collaborative social platform
        </h3>
        <div className="space-y-3 [&>p]:text-base [&>p]:font-bold [&>p]:before:mr-2 [&>p]:before:content-['✓']">
          <p>Room Chats</p>
          <p>Job & Internship Finder</p>
          <p>Real-time Collaborative Coding</p>
        </div>
        <div className="flex flex-row gap-3">
          {/* Login Button */}
          <Login />

          {/* Signup Button */}
          <Signup />
        </div>
      </div>
    </section>
  );
}

export default Imagecontent;
