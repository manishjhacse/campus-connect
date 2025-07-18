/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { toast,Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeLoggedIn } from "../store/loginSlice";
import { changeLoggedInUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [loginData, setLoginData] = useState({
    email: "demo@campusconnect.com",
    password: "Demo@1234"
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
    try {
      console.log("clicked")
      const res = await axios.post(`${url}/login`, loginData, {
        withCredentials: true
      })
      const user = res.data.user
      localStorage.setItem("isLoggedin", true);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("token", res.data.token);
      dispatch(changeLoggedIn(true))
      dispatch(changeLoggedInUser(user))
      toast.dismiss(toastId);
      toast.success("Logged in");
      navigate("/home")
    } catch (err) {
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
              <label htmlFor="loginemail" className="">
                Email
              </label>
              <input
                id="loginemail"
                name="email"
                value={loginData.email}
                type="email"
                placeholder="Email"
                onChange={e => handleLoginData(e)}
                className="placeholder:text-gray-500 placeholder:font-normal border-zinc-300 dark:border-zinc-700 focus-visible:outline-zinc-500 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-zinc-500 focus-visible:border-transparent py-2 px-3 rounded bg-transparent"
              />
            </div>
            <div className="grid gap-1 w-full dark:text-gray-200">
              <label htmlFor="loginpassword" className="">
                Password
              </label>
              <input
                id="loginpassword"
                type="password"
                name="password"
                value={loginData.password}
                onChange={e => handleLoginData(e)}
                placeholder="Password"
                className="placeholder:text-gray-500 placeholder:font-normal border-zinc-300 dark:border-zinc-700 focus-visible:outline-zinc-500 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-zinc-500 focus-visible:border-transparent py-2 px-3 rounded bg-transparent"
              />
            </div>
            <button className="w-full font-semibold text-white dark:text-black bg-[#f31260]  px-4 py-2 rounded-lg hover:bg-[#ca1454] transition-all duration-200" onClick={(e) => { handleLogin(e) }} >
              Sign in
            </button>
            <div className="flex items-baseline justify-between text-sm font-semibold">
              <button  onClick={()=>{
                document.getElementById("login_modal").close();
                document.getElementById("reset_modal").showModal();
              }} className="underline">
                Forgot Password?
              </button>
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
        <Toaster position="top-center" reverseOrder={false} />
      </dialog>
    </div>
  );
}

export default Login;
