import React from "react";
import logo from "../assests/project_logo.png";
import { User } from "@heroui/react";
import { Avatar, AvatarGroup } from "@heroui/react";

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal text-black dark:text-white shadow-lg  bg-slate-100 dark:bg-[#0b0b0b]  p-10">
      <aside>
        <img src={logo} alt="" className="w-20" />
        <p className="text-lg font-semibold">
          Copyright © 2025 - All right reserved
        </p>
      </aside>

      <span className="flex flex-col gap-1">
        <p className="text-lg font-semibold">Designed & Developed by</p>
        <div className="flex gap-2">
          <AvatarGroup isBordered>
            <Avatar
              isBordered
              color="primary"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
            <Avatar
              isBordered
              color="danger"
              src="https://res.cloudinary.com/db7mrhtue/image/upload/v1738047745/pfp_bfx0c1.jpg"
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
        <p className="text-lg font-semibold">Under the guidance of</p>
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            isBordered: true,
            color: "warning",
          }}
          className="font-semibold text-yellow-600"
          description="H.O.D. CSE"
          name="Prof. M.P. Singh"
        />{" "}
      </span>
    </footer>
  );
}
