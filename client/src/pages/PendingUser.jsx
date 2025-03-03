import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PendingUser() {
    const isLoggedin = useSelector((state) => state.isLoggedin);
    const loggedInUser = useSelector((state) => state.user)
    if (!isLoggedin) {
        return <Navigate to="/" />;
    }
    else if (loggedInUser?.status === "approved") {
        return <Navigate to="/home" />;
    }

    return (
        <div className="overflow-hidden mx-auto w-full">
            < Navbar />

            <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center p-6">

                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Account Under Review
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Thank you for signing up! Our team is reviewing your details. Once approved, you’ll be able to access <span className="font-semibold text-blue-500">Campus Connect</span>.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mt-4">
                        You will be notified via email once your account is activated.
                    </p>
                    <div className="mt-6">
                        <span className="inline-block animate-spin text-blue-500 text-4xl">⏳</span>
                    </div>
                </div>
            </div></div >
    );
}
