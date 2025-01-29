/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

function Features({ feature }) {
  return (
    <Link to={feature.path} className="w-fit">

      <Card isFooterBlurred className="border-none relative" radius="lg">
        <Image
          isZoomed
          alt={feature.text}
          className="object-cover"
          height={200}
          src={feature.img}
          width={200}
        />

        <p className=" absolute bottom-0 bg-red-900 text-white rounded-md px-3 py-2 left-1/2 -translate-x-1/2 z-20 w-full
         text-center font-semibold font-poppins">{feature.text}</p>

      </Card>
    </Link>
  );
}

export default Features;
