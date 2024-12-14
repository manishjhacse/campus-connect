import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage'
import Homepage from './Homepage'
import PrivateRoute from '../components/PrivateRoute'

export default function Layout() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={
                    <PrivateRoute>
                        <Homepage />
                    </PrivateRoute>
                } />
            </Routes>
        </div>
    )
}
