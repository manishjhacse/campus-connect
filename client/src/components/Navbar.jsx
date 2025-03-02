// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeLoggedIn } from "../store/loginSlice";
import { changeLoggedInUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/project_logo.png";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "dark"
  );
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);
  const handleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  async function handleLogOut() {
    const toastId = toast.loading("Logging Out");
    try {
      const url = import.meta.env.VITE_BASE_URL;
      // const res = await axios.post(`${url}/logout`, {
      //   withCredentials: true,
      // });

      // if (res.data.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("isLoggedin");
      dispatch(changeLoggedIn(false));
      dispatch(changeLoggedInUser({}));
      toast.dismiss(toastId);
      toast.success("Logged out");

      // }
    } catch (err) {
      console.error("Logout error:", err);
      toast.dismiss(toastId);
      toast.error("Try Again");
      navigate("/");
    }
  }

  return (
    <>
      <div className="navbar prevent-select transition-all duration-200 fixed overflow-hidden mb-7 z-30 flex  shadow-lg bg-[#fafafa] dark:bg-[#0b0b0b] dark:text-zinc-100 text-zinc-800 ">
        <div className="w-full md:w-10/12 mx-auto">
          <Link to="/" className="flex-1">
            <img
              src={logo}
              className="w-20 text-red-500 transition-all duration-200"
              alt=""
            />
          </Link>
          <div className="flex items-center gap-1 md:gap-5">
            {/* Dark/light mode toggle----->> */}

            <label className="swap swap-rotate mx-4 h-5 w-5">
              {/* this hidden checkbox controls the state */}
              <input onChange={handleMode} type="checkbox" />

              {/* sun icon */}
              <svg
                className="swap-off h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {/* profile settings */}
            <Dropdown
              className=" dark:text-zinc-100 text-zinc-800 sm:ring-1 ring-zinc-300 dark:ring-zinc-800 bg-[#fafafa] dark:bg-[#111]"
              placement="bottom-end"
            >
              <DropdownTrigger className=" mx-2">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="danger"
                  name="Siddhesh"
                  size="md"
                  src={
                    user?.profilePicture ||
                    "https://res.cloudinary.com/db7mrhtue/image/upload/v1734089000/b4be53d8b436db600bcdd1ea59c10e92_ibbnhz.jpg"
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  onClick={(e) => navigate("/profile")}
                  key="profile"
                  className="h-14 gap-3"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.firstName}</p>
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    handleLogOut();
                  }}
                  key="logout"
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
