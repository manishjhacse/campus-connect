import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function AdminDashboard() {
    const admin = useSelector(state => state.admin)
    const [pendingUsers, setPendingUsers] = useState([])
    console.log(admin)
    if (!admin || !admin.email || admin?.email == "") {
        return <Navigate to="/adminLogin" />
    }
    console.log(admin)
    const getPendingUsers = async () => {
        try {
            const url = import.meta.env.VITE_BASE_URL;
            const response = await axios.get(`${url}/getPendingUsers`);
            setPendingUsers(response.data.data || []);
        } catch (error) {
            console.error("Error fetching pending users:", error);
        }
    };

    useEffect(() => {
        getPendingUsers();
    }, []);
    return (
        <div>
            
        </div>
    )
}
