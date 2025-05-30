import React from 'react';
import { FiAlertTriangle } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function SuspendedUser() {
    const isLoggedin = useSelector((state) => state.isLoggedin);
    const loggedInUser = useSelector((state) => state.user)
    if (!isLoggedin) {
        return <Navigate to="/" />;
    }
    else if (!loggedInUser?.isSuspended || loggedInUser?.isSuspended === false) {
        return <Navigate to="/home" />;
    }
    return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-black px-4">
            <div className="bg-red-200 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-4 rounded-full">
                        <FiAlertTriangle className="h-10 w-10 text-red-500" />
                    </div>
                </div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">Account Suspended</h1>
                <p className="text-gray-600 mb-6">
                    Your account has been temporarily suspended by the admin. You cannot access the platform until your status is reviewed.
                </p>
                <p className="text-sm text-gray-500">
                    If you believe this is a mistake, please contact our <a className='text-blue-500 font-semibold underline' href="mailto:manishjhaproject@gmail.com">support</a> team.
                </p>
            </div>
        </div>
    );
}
