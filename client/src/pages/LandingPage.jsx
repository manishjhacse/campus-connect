/* eslint-disable no-unused-vars */
import React from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { Image } from "@nextui-org/image";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";

function LandingPage() {
  const isLoggedin = useSelector((state) => state.isLoggedin);
  if (isLoggedin) {
    return <Navigate to="/home" />
  }
  return (
    <section className="mx-4 my-6 grid max-w-[90rem] items-center h-[80vh] grid-cols-1 justify-center gap-12 lg:mx-auto lg:grid-cols-[repeat(auto-fit,minmax(30rem,1fr))]">
      <div className="flex items-center justify-end">
        <Image
          isBlurred
          className="mx-auto aspect-[1/0.7] w-full rounded-2xl object-cover sm:aspect-[1/0.5] sm:object-top lg:aspect-[1.25/1] lg:max-w-[33rem]"
          src="https://res.cloudinary.com/db7mrhtue/image/upload/v1734087954/7118856_3288524_g8ysf5.jpg"
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
          <ResetPassword/>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
