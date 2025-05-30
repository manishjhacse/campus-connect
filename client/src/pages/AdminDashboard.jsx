import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const DEFAULT_PIC = "https://res.cloudinary.com/db7mrhtue/image/upload/v1734089000/b4be53d8b436db600bcdd1ea59c10e92_ibbnhz.jpg";

export default function AdminDashboard() {
    const admin = useSelector((state) => state.admin);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({});
    const [searchRegNo, setSearchRegNo] = useState("");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem("admintoken");

    if (!admin || !admin?.email) {
        return <Navigate to="/adminLogin" />;
    }

    useEffect(() => {
        fetchUsers();
    }, [page, filter]);

    useEffect(() => {
        const delay = setTimeout(() => {
            setPage(1);
            fetchUsers();
        }, 500);
        return () => clearTimeout(delay);
    }, [searchRegNo]);

    const fetchUsers = async () => {
        try {
            const url = import.meta.env.VITE_BASE_URL;
            const params = {
                page,
                registration_no: searchRegNo,

            };
            if (filter !== "all") params.status = filter;

            const response = await axios.get(`${url}/getAllUsers`, {
                params,
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            setUsers(response.data.users || []);
            setStats(response.data.stats || {});
            setTotalPages(response.data.totalPages || 1);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleApprove = async (userId) => {
        const toastId = toast.loading("Approving...");
        try {
            const url = import.meta.env.VITE_BASE_URL;
            await axios.post(`${url}/approveUser`, { userId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("User Approved", { id: toastId });
            fetchUsers();
        } catch (err) {
            toast.error("Error approving user", { id: toastId });
        }
    };

    const handleReject = async (userId) => {
        const toastId = toast.loading("Rejecting...");
        try {
            const url = import.meta.env.VITE_BASE_URL;
            await axios.post(`${url}/rejectUser`, { userId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("User Rejected", { id: toastId });
            fetchUsers();
        } catch (err) {
            toast.error("Error rejecting user", { id: toastId });
        }
    };

    const handleSuspend = async (userId) => {
        const toastId = toast.loading("Suspending...");
        try {
            const url = import.meta.env.VITE_BASE_URL;
            await axios.post(`${url}/suspendUser`, { userId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("User Suspended", { id: toastId });
            fetchUsers();
        } catch (err) {
            toast.error("Error suspending user", { id: toastId });
        }
    };
    const handleRemoveSuspend = async (userId) => {
        const toastId = toast.loading("Suspending...");
        try {
            const url = import.meta.env.VITE_BASE_URL;
            await axios.post(`${url}/removeSuspensionUser`, { userId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Acount activated", { id: toastId });
            fetchUsers();
        } catch (err) {
            toast.error("Error Activating user", { id: toastId });
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 items-center flex flex-col dark:bg-gray-900">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                Admin Dashboard
            </h1>

            {/* User Stats */}
            <div className="grid grid-cols-2 w-full md:w-10/12 md:grid-cols-4 gap-4 mb-6">
                <StatCard label="Total Users" count={stats.numberOfUsers} />
                <StatCard label="Approved" count={stats.numberOfApprovedUser} />
                <StatCard label="Pending" count={stats.numberOfPendingUser} />
                <StatCard label="Suspended" count={stats.numberOfRejectedUser} />
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col w-full md:w-10/12 md:flex-row gap-4 justify-between items-center mb-6">
                <input
                    type="text"
                    value={searchRegNo}
                    onChange={(e) => setSearchRegNo(e.target.value)}
                    placeholder="Search by Reg No"
                    className="w-full md:w-1/3 px-4 py-2 border rounded-md"
                />
                <div className="flex gap-2">
                    {["all", "approved", "pending"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-md ${filter === type ? "bg-blue-600 text-white" : "bg-gray-700"
                                }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* User Cards */}
            {users.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400">No users found.</p>
            ) : (
                <div className="grid w-full md:w-10/12 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div
                            key={user._id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center text-center"
                        >
                            <img
                                src={user.profilePicture || DEFAULT_PIC}
                                alt="Profile"
                                className="w-24 h-24 rounded-full mb-3 object-cover"
                            />
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Reg No: {user.registration_no}</p>
                            <p className="text-sm mt-1 text-blue-600 dark:text-blue-400 capitalize">{user.status} {user.isSuspended && <span className="text-red-500">Suspended</span>}</p>
                            <div className="mt-3 flex gap-2">
                                {user.status === "pending" && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(user._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm flex items-center"
                                        >
                                            <TiTick /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(user._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm flex items-center"
                                        >
                                            <RxCross2 /> Reject
                                        </button>
                                    </>
                                )}
                                {user.status === "approved" && (
                                    user?.isSuspended ? <button
                                        onClick={() => handleRemoveSuspend(user._id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                                    >
                                        Remove Suspension
                                    </button> :
                                        <button
                                            onClick={() => handleSuspend(user._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                                        >
                                            Suspend
                                        </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex w-full md:w-10/12 justify-center mt-8 gap-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
                >
                    Prev
                </button>
                <span className="text-gray-700 dark:text-white">Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

function StatCard({ label, count }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
            <p className="text-gray-500 dark:text-gray-300">{label}</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{count ?? 0}</h3>
        </div>
    );
}
