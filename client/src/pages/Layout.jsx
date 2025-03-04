/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
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
import PendingUser from "./PendingUser";
import { changeLoggedIn } from "../store/loginSlice";
import { changeLoggedInUser } from "../store/userSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Layout() {
  const dispatch = useDispatch()
  const location = useLocation();
  const hideFooterRoutes = ["/group", "/chat/:chatId/:userId", "/adminLogin", "/adminDashboard"];
  const hideFooter = hideFooterRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/:\w+/g, "[^/]+")}$`);
    return regex.test(location.pathname);
  });
  const fetchLoggedInUser = async () => {
    try {
      const url = import.meta.env.VITE_BASE_URL;
      const token = localStorage.getItem("token"); 
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const res = await axios.get(`${url}/getLoggedInUser`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      const user = res.data.user
      localStorage.setItem("isLoggedin", true);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      dispatch(changeLoggedIn(true))
      dispatch(changeLoggedInUser(user))
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("isLoggedin");
      dispatch(changeLoggedIn(false));
      dispatch(changeLoggedInUser({}));

    }
  }
  useEffect(() => {
    fetchLoggedInUser(dispatch);
  }, []);
  return (
    <div className="w-full min-h-screen pb-[367px] md:pb-[152px]">
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
          path="/pendinguser"
          element={<PendingUser />
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
              <Jobs />
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
