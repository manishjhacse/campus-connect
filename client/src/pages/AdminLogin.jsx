import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { changeLoggedInAdmin } from '../store/adminSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    async function handleLogin(e) {
        e.preventDefault();
        const url = import.meta.env.VITE_BASE_URL;
        if (email == "" || password == "") {
            toast.error("Please Enter all Details")
            return;
        }
        const toastId = toast.loading('Verifying Details...');
        try {
            const response = await axios.post(`${url}/adminLogin`, { email, password }, {
                withCredentials: true
            })
            const admin = response.data.admin
            localStorage.setItem("admintoken", response.data.token);
            localStorage.setItem("adminData", JSON.stringify(admin));
            dispatch(changeLoggedInAdmin(admin))
            toast.dismiss(toastId);
            toast.success("Logged in");
            navigate("/adminDashboard")
        } catch (err) {
            console.log(err);
            toast.dismiss(toastId);
            toast.error(err.response.data.message||"Internal Server Error!");
        }

    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>

            <form onSubmit={handleLogin} className='flex flex-col items-center gap-3 w-[300px] h-[250px] px-5 py-5 rounded-md bg-gray-800'>
                <h1 className='text-xl font-bold'>Admin Login</h1>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='px-4 py-2 rounded-md outline-none' name="email" placeholder='Admin Email' />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='px-4 py-2 rounded-md outline-none' name="password" placeholder='Password' />
                <button type='submit' className='px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 transition-all duration-200'>Login</button>

            </form>
        </div>
    )
}
