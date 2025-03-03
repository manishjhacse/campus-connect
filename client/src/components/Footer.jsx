import React from "react";
import logo from "../assests/project_logo.png";
import { User } from "@heroui/react";
import { Avatar, AvatarGroup } from "@heroui/react";

export default function Footer() {
  return (
    <footer className="footer absolute bottom-0 sm:footer-horizontal text-black dark:text-white shadow-lg  bg-slate-100 dark:bg-[#0b0b0b]  p-10">
      <aside>
        <img src={logo} alt="" className="w-16" />
        <p className="text-xs font-semibold">
          Copyright © 2025 - All right reserved
        </p>
      </aside>

      <span className="flex flex-col gap-1">
        <p className="font-semibold mb-1">Designed & Developed by</p>
        <div className="flex gap-2">
          <AvatarGroup className="" isBordered>
            <Avatar
              isBordered
              color="warning"
              src="https://res.cloudinary.com/db7mrhtue/image/upload/v1738047745/pfp_bfx0c1.jpg"
            /> <Avatar
              isBordered
              color="danger"
              src="https://res.cloudinary.com/dfrcswf0n/image/upload/v1738164544/t98xymvtca79nezp8lfx.jpg"
            />
          </AvatarGroup>
          <p className="text-red">
            <a
              href="https://www.linkedin.com/in/manish02/"
              className="text-blue-600 font-semibold hover:underline mx-1"
            >
              Manish kr. Jha
            </a>
            & <br />{" "}
            <a
              href="https://www.linkedin.com/in/siddheshkumar"
              className="text-red-600 font-semibold hover:underline mx-1"
            >
              Siddhesh Kumar
            </a>
          </p>
        </div>
      </span>

      <span>
        {" "}
        <p className=" font-semibold mb-1">Under the guidance of</p>
        <User
          avatarProps={{
            src: "https://res.cloudinary.com/dfrcswf0n/image/upload/v1740962180/file_66226595c9f28-scaled_vdgqcu.jpg",
            isBordered: true,
            color: "success",
          }}
          className="font-semibold text-green-600"
          description="H.O.D. CSE"
          name="Prof. M.P. Singh"
        />{" "}
      </span>
    </footer>
  );
}
