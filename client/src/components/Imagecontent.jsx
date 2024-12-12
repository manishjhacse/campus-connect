/* eslint-disable no-unused-vars */
import React from "react";

function Imagecontent() {
  return (
    <section className="mx-4 my-6 grid max-w-[90rem] grid-cols-1 justify-center gap-12 lg:mx-auto lg:grid-cols-[repeat(auto-fit,minmax(30rem,1fr))]">
      <div className="flex items-center justify-end">
        <img
          className="mx-auto aspect-[1/0.7] w-full rounded-2xl object-cover sm:aspect-[1/0.5] sm:object-top lg:aspect-[1.25/1] lg:max-w-[33rem]"
          src="https://i.pinimg.com/736x/b4/be/53/b4be53d8b436db600bcdd1ea59c10e92.jpg"
          alt="xyz"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-8 text-slate-950 dark:text-slate-50 sm:gap-10">
        <h3 className="text-3xl font-bold sm:max-w-[80%] sm:text-4xl">
          Campus <span className=" text-red-500">Connect</span> the
          collaborative social platform
        </h3>
        <div className="space-y-3 [&>p]:text-base [&>p]:font-bold [&>p]:before:mr-2 [&>p]:before:content-['✓']">
          <p>Room Chats</p>
          <p>Job & internship finder</p>
          <p>Real-time collaborative coding</p>
        </div>
        <div className="flex flex-row gap-3">
          <button
            aria-label="go to components"
            className="group flex items-center justify-between rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-slate-50 focus-visible:outline focus-visible:outline-slate-950/40 dark:bg-slate-50 dark:text-slate-950"
          >
            Login
            <span className="ml-1 h-5 w-5 translate-y-[0.15rem] transition-transform group-hover:translate-x-2">
              {/* SVG Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>
          <button
            aria-label="go to components"
            className="group flex items-center justify-between rounded-2xl  px-5 py-3 font-semibold text-slate-50 focus-visible:outline focus-visible:outline-slate-950/40 bg-red-500 dark:bg-red-600 dark:text-slate-950"
          >
            Sign up
            <span className="ml-1 h-5 w-5 translate-y-[0.15rem] transition-transform group-hover:translate-x-2">
              {/* SVG Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Imagecontent;
