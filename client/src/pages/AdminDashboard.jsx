import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";
export default function AdminDashboard() {
    const admin = useSelector((state) => state.admin);
    const [pendingUsers, setPendingUsers] = useState([]);

    if (!admin || !admin?.email || admin?.email === "") {
        return <Navigate to="/adminLogin" />;
    }
    const token = localStorage.getItem("admintoken");

    useEffect(() => {
        axios.defaults.withCredentials = true; 
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        getPendingUsers();
    }, [token]);

    const getPendingUsers = async () => {
        try {
            const url = import.meta.env.VITE_BASE_URL;
            const response = await axios.get(`${url}/getPendingUsers`);
            setPendingUsers(response.data.users || []);
        } catch (error) {
            console.error("Error fetching pending users:", error);
        }
    };

    const approveUser = async (userId) => {
        const toastId = toast.loading("Please Wait")
        try {
            const url = import.meta.env.VITE_BASE_URL;
            await axios.post(`${url}/approveUser`, { userId });
            setPendingUsers((prev) => prev.filter((user) => user._id !== userId));
            toast.dismiss(toastId)
            toast.success("User Approved")
        } catch (err) {
            toast.dismiss(toastId)
            toast.error(err.response?.data?.message || "Something went wrong!");
            console.error("Error approving user:", err);

        }
    };

    const rejectUser = async (userId) => {
        const toastId = toast.loading("Please Wait")
        try {
            const url = import.meta.env.VITE_BASE_URL;
            await axios.post(`${url}/rejectUser`, { userId });
            setPendingUsers((prev) => prev.filter((user) => user._id !== userId));
            toast.dismiss(toastId)
            toast.success("User Rejected")
        } catch (err) {
            toast.dismiss(toastId)
            toast.error(err.response?.data?.message || "Something went wrong!");
            console.error("Error approving user:", err);
        }
    };

    useEffect(() => {
        getPendingUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Pending User Approvals
            </h1>
            {pendingUsers.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center">
                    No pending users.
                </p>
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-5xl mx-auto overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Reg No</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingUsers.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                >
                                    <td className="p-3">{user.firstName + " " + user.lastName}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.registration_no}</td>
                                    <td className="p-3 flex justify-center gap-2">
                                        <button
                                            onClick={() => approveUser(user._id)}
                                            className="bg-green-500 flex items-center gap-2 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                                        >
                                            <TiTick /> Approve
                                        </button>
                                        <button
                                            onClick={() => rejectUser(user._id)}
                                            className="bg-red-500 flex items-center gap-2 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                                        >
                                            <RxCross2 /> Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
