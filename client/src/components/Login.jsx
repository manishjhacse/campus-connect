/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeLoggedIn } from "../store/loginSlice";
import { changeLoggedInUser } from "../store/userSlice";

function Login() {
  const dispatch=useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  function handleLoginData(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  async function handleLogin(e) {
    e.preventDefault();
    const url = import.meta.env.VITE_BASE_URL;
    if (loginData.email == "" || loginData.password == "") {
      toast.error("Please Enter all Details")
      return;
    }
    const toastId = toast.loading('Verifying Details...');
    try{
      const res=await axios.post(`${url}/login`,loginData,{
        withCredentials:true
      })
      const user=res.data.user
      localStorage.setItem("isLoggedin", true);
      localStorage.setItem("loggedInUser", user);
      localStorage.setItem("token", res.data.token);
      dispatch(changeLoggedIn(true))
      dispatch(changeLoggedInUser(user))
      toast.dismiss(toastId);
      toast.success("Logged in");
    }catch(err){
      console.log(err);
      toast.dismiss(toastId);
      toast.error(err.response.data.message);
    }
    
  }
  return (
    <div>
      <Button
        color="primary"
        variant="shadow"
        size="lg"
        onClick={() => document.getElementById("login_modal").showModal()}
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

      <dialog id="login_modal" className="modal modal-bottom sm:modal-middle  ">
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
                name="email"
                value={loginData.email}
                type="email"
                placeholder="Email"
                onChange={e => handleLoginData(e)}
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
                name="password"
                value={loginData.password}
                onChange={e => handleLoginData(e)}
                placeholder="Password"
                className="placeholder:text-gray-500 placeholder:font-normal border-zinc-300 dark:border-zinc-700 focus-visible:outline-zinc-500 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-zinc-500 focus-visible:border-transparent py-2 px-3 rounded bg-transparent"
              />
            </div>
            <Button onClick={(e)=>{handleLogin(e)}} variant="shadow" color="primary">
              Sign in
            </Button>
            <div className="flex items-baseline justify-between text-sm font-semibold">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
              <button onClick={() => {
                document.getElementById("login_modal").close()
                document.getElementById("signup_modal").showModal()
              }} className="underline ml-2">
                Create Account
              </button>
            </div>
          </div>

          <div className="modal-action"></div>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
