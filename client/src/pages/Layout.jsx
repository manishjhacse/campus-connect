/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import Homepage from "./Homepage";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "./Profile";
import Group from "./Group";
import StudySession from "./StudySession";
import UserProfile from "./UserProfile";
import NotFound from "./NotFound";
import Market from "./Market";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import Chat from "./Chat";
import Problems from "./Problems";
import Roommates from "./Roommates";
import Footer from "../components/Footer";
import Jobs from "./Jobs";

export default function Layout() {
  const location = useLocation();
  const hideFooterRoutes = ["/group", "/group/:roomId"];
  const hideFooter = hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route.replace(":roomId", ""))
  );
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
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/group"
          element={
            <PrivateRoute>
              <Group />
            </PrivateRoute>
          }
        />
        <Route
          path="/group/:roomId"
          element={
            <PrivateRoute>
              <StudySession />
            </PrivateRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <PrivateRoute>
              <Market />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <Jobs/>
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:chatId/:userId"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/codingpractice"
          element={
            <PrivateRoute>
              <Problems />
            </PrivateRoute>
          }
        />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route
          path="/rooms"
          element={
            <PrivateRoute>
              <Roommates />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
}
