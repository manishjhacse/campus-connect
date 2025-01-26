/* eslint-disable no-unused-vars */
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeLoggedIn } from "../store/loginSlice";
import { changeLoggedInUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

function Navigationbar() {
  const user=useSelector(state=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  async function handleLogOut() {
    const toastId = toast.loading("Logging Out")
    try {
      const url = import.meta.env.VITE_BASE_URL;
      // const res = await axios.post(`${url}/logout`, {
      //   withCredentials: true,
      // });

      // if (res.data.success) {
        localStorage.removeItem("token")
        localStorage.removeItem("loggedInUser")
        localStorage.removeItem("isLoggedin")
        dispatch(changeLoggedIn(false))
        dispatch(changeLoggedInUser({}))
        toast.dismiss(toastId);
        toast.success("Logged out");

      // }

    } catch (err) {
      console.error("Logout error:", err);
      toast.dismiss(toastId)
      toast.error("Try Again");
      navigate("/");
    }
  }
  return (
    <Navbar shouldHideOnScroll className="w-full">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">Campus Connect</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" color="secondary" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown
          className=" dark:text-zinc-100 text-zinc-800 sm:ring-1 ring-zinc-300 dark:ring-zinc-800 mt-3 bg-[#fafafa] dark:bg-[#111]"
          placement="bottom-end"
        >
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="danger"
              name="Siddhesh"
              size="md"
              src="https://res.cloudinary.com/db7mrhtue/image/upload/v1734089000/b4be53d8b436db600bcdd1ea59c10e92_ibbnhz.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem  onClick={(e)=>navigate("/profile")} key="profile" className="h-14 gap-3">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.firstName}</p>
            </DropdownItem>
            <DropdownItem onClick={() => { handleLogOut() }} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default Navigationbar;
