/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios"
function Signup() {
  const [signupForm, setSignupForm] = useState({ firstName: "", lastName: "", email: "", otp: "", password: "", confirmPassword: "", registration_no: "" })
  const [otpButton, setOtpButton] = useState("Send OTP")
  // const [showOtpButton, setShowOtpButton] = useState(true)
  //formchange function
  const handleFormChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  }
  function resetForm() {
    const reset = { firstName: "", lastName: "", email: "", otp: "", password: "", confirmPassword: "", registration_no: "" }
    setSignupForm(reset)
  }
  //signup function
  async function signup() {
    const url = import.meta.env.VITE_BASE_URL;
    const toastId = toast.loading('Creating Account...');
    try {
      const res = await axios.post(`${url}/signup`, signupForm, {
        withCredentials: true,
      });
      toast.dismiss(toastId);
      toast.success("Account created");
      resetForm();
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err.response.data.message);
    }
  }
  //otp function
  async function sendotp(e) {
    e.preventDefault();
    if (signupForm.email == "") {
      toast.error("Please Enter Email")
      return;
    }
    const url = import.meta.env.VITE_BASE_URL;
    console.log(url)
    const toastId = toast.loading('Sending OTP...');
    try {
      console.log(signupForm)
      const res = await axios.post(`${url}/signup-otp`, signupForm, {
        withCredentials: true,
      });
      toast.dismiss(toastId);
      toast.success(res.data.message);
      setOtpButton("Resend OTP")
    } catch (err) {
      toast.dismiss(toastId);
      toast.error((err.response.data.message));
      console.log(err)
    }
  }
  async function handleSubmit(e) {
    console.log(signupForm)
    e.preventDefault();
    if (
      signupForm.firstName == "" ||
      signupForm.lastName == "" ||
      signupForm.email == "" ||
      signupForm.otp == "" ||
      signupForm.password == "" ||
      signupForm.confirmPassword == ""
    ) {
      toast.error("please fill all the details");
      return;
    }
    if (signupForm.password != signupForm.confirmPassword) {
      toast.error("incorrect confirm password");
      return;
    }
    await signup();
    document.getElementById("login_modal").showModal();
    document.getElementById("signup_modal").close();
  }
  return (
    <div>
      <Button
        color="danger"
        variant="shadow"
        size="lg"
        className="outline-none"
        onClick={() => document.getElementById("signup_modal").showModal()}
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

      <dialog
        id="signup_modal"
        className="modal modal-bottom sm:modal-middle  "
      >
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
                  name="firstName"
                  onChange={(e) => handleFormChange(e)}
                  value={signupForm.firstName}
                  type="text"
                  placeholder="First Name"
                  className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
                />
                <input
                  id="lastName"
                  type="text"
                  onChange={(e) => handleFormChange(e)}
                  name="lastName"
                  value={signupForm.lastName}
                  placeholder="Last Name"
                  className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
                />
              </div>
              <div className="relative">

                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => handleFormChange(e)}
                  value={signupForm.email}
                  placeholder="Email"
                  className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60  focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
                />
                <button onClick={(e) => { sendotp(e) }} className={`absolute cursor-pointer bg-[#f31260] font-semibold text-white dark:text-black rounded-full px-1 py-1 top-1/2 text-xs -translate-y-1/2 right-2`}>{otpButton}</button>
              </div>
              <input
                id="otp"
                name="otp"
                onChange={(e) => handleFormChange(e)}
                value={signupForm.otp}
                type="text"
                placeholder="OTP"
                className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
              />
              <input
                id="password"
                type="password"
                value={signupForm.password}
                onChange={(e) => handleFormChange(e)}
                name="password"
                placeholder="Password"
                className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => handleFormChange(e)}
                value={signupForm.confirmPassword}
                type="password"
                placeholder="Confirm Password"
                className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
              />
              <input
                id="registration_no"
                name="registration_no"
                value={signupForm.registration_no}
                onChange={(e) => handleFormChange(e)}
                type="text"
                placeholder="Reg. No:"
                className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
              />
            </div>

            <button className="w-full font-semibold text-white dark:text-black bg-[#f31260]  px-4 py-2 rounded-lg hover:bg-[#ca1454] transition-all duration-200" onClick={(e) => handleSubmit(e)} >
              Create account
            </button>
            <div className="flex text-sm font-semibold mx-auto mt-3">
              Already have an account ?
              <button
                onClick={() => {
                  document.getElementById("login_modal").showModal();
                  document.getElementById("signup_modal").close();
                }}
                className="underline ml-2"
              >
                Sign in
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

export default Signup;
