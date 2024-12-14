/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code } from "@nextui-org/react";

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
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-5xl max-w-2xl tracking-tighter text-center font-poppins">
              <span className=" font-bold ">
                Your Campus, <span className=" text-[#fb1109]">Connected</span>{" "}
                Like
                <span className="relative inline-flex sm:inline">
                  <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-xl  filter opacity-40 w-full h-full absolute inset-0"></span>
                  <span className="relative"> Never Before! </span>
                </span>
              </span>

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

            <div className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              <Code color="success">
                All Your Campus Needs, in One Collaborative Space!
              </Code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
