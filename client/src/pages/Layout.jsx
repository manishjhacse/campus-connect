/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Homepage from "./Homepage";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "./Profile";

export default function Layout() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
