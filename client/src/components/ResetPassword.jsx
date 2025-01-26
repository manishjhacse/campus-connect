/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios"
function ResetPassword() {
    const [resetForm, setResetForm] = useState({ email: "", otp: "", password: "", confirmPassword: "" })
    const [otpButton, setOtpButton] = useState("Send OTP")
    //formchange function
    const handleFormChange = (e) => {
        setResetForm({ ...resetForm, [e.target.name]: e.target.value });
    }
    //signup function
    async function resetPassword() {
        const url = import.meta.env.VITE_BASE_URL;
        const toastId = toast.loading('Changing Password...');
        try {
            const res = await axios.post(`${url}/changePassword`, resetForm, {
                withCredentials: true,
            });
            toast.dismiss(toastId);
            toast.success("Password Changed");
            setResetForm({ email: "", otp: "", password: "", confirmPassword: "" })
        } catch (err) {
            toast.dismiss(toastId);
            toast.error(err.response.data.message);
        }
    }
    //otp function
    async function sendotp(e) {
        e.preventDefault();
        if (resetForm.email == "") {
            toast.error("Please Enter Email")
            return;
        }
        const url = import.meta.env.VITE_BASE_URL;
        console.log(url)
        const toastId = toast.loading('Sending OTP...');
        try {
            console.log(resetForm)
            const res = await axios.post(`${url}/changepassword-otp`, resetForm, {
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
        e.preventDefault();
        if (
            resetForm.email == "" ||
            resetForm.otp == "" ||
            resetForm.password == "" ||
            resetForm.confirmPassword == ""
        ) {
            toast.error("Please fill all the details");
            return;
        }
        if (resetForm.password != resetForm.confirmPassword) {
            toast.error("Incorrect Confirm Password");
            return;
        }
        await resetPassword();
        document.getElementById("login_modal").showModal();
        document.getElementById("reset_modal").close();
    }
    return (
        <div>
            <dialog
                id="reset_modal"
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
                            Change Password
                        </h2>
                        <div className="grid gap-6">

                            <div className="relative">

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e) => handleFormChange(e)}
                                    value={resetForm.email}
                                    placeholder="Email"
                                    className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60  focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
                                />
                                <button onClick={(e) => { sendotp(e) }} className={`absolute cursor-pointer bg-[#f31260] font-semibold text-white dark:text-black rounded-full px-1 py-1 top-1/2 text-xs -translate-y-1/2 right-2`}>{otpButton}</button>
                            </div>
                            <input
                                id="otp"
                                name="otp"
                                onChange={(e) => handleFormChange(e)}
                                value={resetForm.otp}
                                type="text"
                                placeholder="OTP"
                                className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
                            />
                            <input
                                id="password"
                                type="password"
                                value={resetForm.password}
                                onChange={(e) => handleFormChange(e)}
                                name="password"
                                placeholder="Password"
                                className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
                            />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={(e) => handleFormChange(e)}
                                value={resetForm.confirmPassword}
                                type="password"
                                placeholder="Confirm Password"
                                className="placeholder:text-gray-500 placeholder:font-normal dark:text-white/80 border-zinc-300 dark:border-zinc-700 focus-visible:outline-gray-600 border focus-visible:outline-2 focus-visible:outline dark:focus-visible:outline-white/60 focus-visible:border-transparent py-2 px-3 rounded bg-transparent w-full"
                            />
                        </div>

                        <button className="w-full text-white dark:text-black font-semibold bg-[#f31260]  px-4 py-2 rounded-lg hover:bg-[#ca1454] transition-all duration-200" onClick={(e) => handleSubmit(e)} >
                            Change Password
                        </button>

                    </div>

                    <div className="modal-action"></div>
                </div>
                <Toaster position="top-center" reverseOrder={false} />
            </dialog>
        </div>
    );
}

export default ResetPassword;
