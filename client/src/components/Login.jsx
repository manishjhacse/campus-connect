/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@nextui-org/react";

function Login() {
  return (
    <div>
      <Button
        color="primary"
        variant="shadow"
        size="lg"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Login
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

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box  dark:text-zinc-100 text-zinc-800 sm:ring-1 ring-zinc-300 dark:ring-zinc-800 mt-3 bg-[#fafafa] dark:bg-[#111] ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1 ">
              ✕
            </button>
          </form>

          {/* Login input form starts from here */}
          <div className="grid max-w-md w-full gap-6 px-12 max-sm:px-6 py-8 rounded-lg dark:text-zinc-100 text-zinc-800 sm:ring-1 ring-zinc-300 dark:ring-zinc-800 mt-3 bg-[#fafafa] dark:bg-[#111]">
            <h2 className="text-4xl font-bold my-4 mb-6">Sign in</h2>
            <div className="grid gap-1 w-full dark:text-gray-200">
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="placeholder:text-gray-500 placeholder:font-normal border-zinc-300 dark:border-zinc-700 focus-visible:outline-zinc-500 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-zinc-500 focus-visible:border-transparent py-2 px-3 rounded bg-transparent"
              />
            </div>
            <div className="grid gap-1 w-full dark:text-gray-200">
              <label htmlFor="password" className="">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="placeholder:text-gray-500 placeholder:font-normal border-zinc-300 dark:border-zinc-700 focus-visible:outline-zinc-500 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-zinc-500 focus-visible:border-transparent py-2 px-3 rounded bg-transparent"
              />
            </div>
            <Button variant="shadow" color="primary">
              Sign in
            </Button>
            <div className="flex items-baseline justify-between text-sm font-semibold">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
              <a href="#" className="hover:underline">
                Create account
              </a>
            </div>
          </div>

          <div className="modal-action"></div>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
