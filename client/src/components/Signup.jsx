/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@nextui-org/react";

function Signup() {
  return (
    <div>
      <Button
        color="danger"
        variant="shadow"
        size="lg"
        className="outline-none"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Sign up
        <span className="-ml-2 h-5 w-5 translate-y-[0.15rem] transition-transform group-hover:translate-x-2">
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
      </Button>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle  ">
        <div className="modal-box  dark:text-zinc-100 text-zinc-800 sm:ring-1 ring-zinc-300 dark:ring-zinc-800 mt-3 bg-[#fafafa] dark:bg-[#111]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1 ">
              ✕
            </button>
          </form>

          {/* signup input form starts from here */}
          <div className="grid max-w-xl w-full gap-4  px-12 max-sm:px-6 py-6 rounded-lg dark:text-zinc-100 text-zinc-800 dark:shadow-zinc-800 shadow shadow-zinc-300 mt-3  bg-[#fafafa] dark:bg-[#111]">
            <h2 className="text-4xl font-bold my-2 mb-6 text-center">
              Create account
            </h2>
            <div className="grid gap-6">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-3">
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
                />
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
                />
              </div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
              />
              <input
                id="ConfirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
              />
              <input
                id=""
                type=""
                placeholder="Reg. No:"
                className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
              />
            </div>

            <Button color="danger" variant="shadow">
              Create account
            </Button>
            <div className="flex text-sm font-semibold mx-auto mt-3">
              Already have an account ?
              <a href="#" className="underline ml-2">
                Sign in
              </a>
            </div>
          </div>

          <div className="modal-action"></div>
        </div>
      </dialog>
    </div>
  );
}

export default Signup;
