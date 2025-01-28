/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Homepage from "./Homepage";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "./Profile";
import Group from "./Group";
import StudySession from "./StudySession";
import UserProfile from "./UserProfile";
import NotFound from "./NotFound";

export default function Layout() {
  return (
    <div className="w-full h-full">
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
         <Route
          path="/profile/:userId"
          element={
            <PrivateRoute>
              <UserProfile/>
            </PrivateRoute>
          }
        />
        <Route
          path="/group"
          element={
            <PrivateRoute>
              <Group/>
            </PrivateRoute>
          }
        />
        <Route
          path="/group/:roomId"
          element={
            <PrivateRoute>
              <StudySession/>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
