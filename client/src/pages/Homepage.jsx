/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code } from "@nextui-org/react";
import Features from "../components/Features";
import Socialfeed from "../components/Socialfeed";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { changeLoggedIn } from "../store/loginSlice";
import { changeLoggedInUser } from "../store/userSlice";
import { toast } from "react-hot-toast";

const features = [
  {
    img: "https://res.cloudinary.com/db7mrhtue/image/upload/v1738129144/1_u8b4of.png",
    path: "/group",
    text: "Learn Together",
  },
  {
    img: "https://res.cloudinary.com/db7mrhtue/image/upload/v1738129145/5_rxnguz.png",
    path: "/codingpractice",
    text: "Coding Challenges",
  },
  {
    img: "https://res.cloudinary.com/db7mrhtue/image/upload/v1738129142/6_jina3v.png",
    path: "/jobs",
    text: "Jobs",
  },
  {
    img: "https://res.cloudinary.com/db7mrhtue/image/upload/v1738129145/3_c0zy1a.png",
    path: "/marketPlace",
    text: "Market Place",
  },
  {
    img: "https://res.cloudinary.com/db7mrhtue/image/upload/v1738129143/2_dbgb30.png",
    path: "/rooms",
    text: "Find Roommate",
  },
  // {
  //   img: "https://res.cloudinary.com/db7mrhtue/image/upload/v1738129145/7_byg10s.png",
  //   path: "/",
  //   text: "Academic Resources",
  // },
  // {
  //   img: "https://res.cloudinary.com/db7mrhtue/image/upload/v1738129145/4_e16buh.png",
  //   path: "/",
  //   text: "Feeeling Stressed",
  // },
];

function Homepage() {
  const [titleNumber, setTitleNumber] = useState(0);
  
  const titles = useMemo(() => ["Connect", "Collaborate", "Conquer "], []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

 
  return (
    <>
      <div className="overflow-hidden mx-auto w-full">
        <Navbar />
        <div className="flex gap-8 py-20 lg:py-20 mt-3 w-full items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-5xl max-w-2xl tracking-tighter text-center font-poppins">
              <span className=" font-bold ">
                Your Campus, <span className=" text-[#fb1109]">Connected</span>{" "}
                <span className="text-blue-700">Like</span>
                <span className="relative inline-flex sm:inline">
                  <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-xl  filter opacity-40 w-full h-full absolute inset-0"></span>
                  <span className="relative"> Never Before! </span>
                </span>
              </span>

              {/* TEXT ANIMATION */}
              <span className="relative mt-6 flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <div className=" text-medium md:text-xl mt-5 leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              <Code color="success">
                All Your Campus Needs, in One Collaborative Space!
              </Code>
            </div>
          </div>

          {/* Feature section */}
          <span className="relative inline-flex sm:inline mt-12">
            <span className="bg-gradient-to-r from-[#ffef44] via-[#ff4a44] to-[#FF675E] blur-xl  filter opacity-40 w-full h-full absolute inset-0"></span>
            <span className="relative text-4xl md:text-5xl  tracking-tighter text-center font-poppins">
              {" "}
              Features⚡{" "}
            </span>
          </span>

          {/* cards */}
          <section className="w-full md:w-10/12 lg:px-32 h-fit flex justify-center items-center gap-y-5 gap-x-10 flex-wrap">
            {features.map((feature, index) => (
              <Features key={index} feature={feature} />
            ))}
          </section>

          {/* Feeds section--->> */}
          <span className="relative inline-flex sm:inline mt-12">
            <span className="bg-gradient-to-r from-[#ffef44] via-[#ff4a44] to-[#FF675E] blur-xl  filter opacity-40 w-full h-full absolute inset-0"></span>
            <span className="relative text-4xl md:text-5xl  tracking-tighter text-center font-poppins">
              {" "}
              Social Feed💭{" "}
            </span>
          </span>
          <Socialfeed />
        </div>
      </div>
    </>
  );
}

export default Homepage;
