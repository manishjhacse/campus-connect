/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

function Features({ imgSrc, altText }) {
  return (
    <div className="w-fit">
      <Card isFooterBlurred className="border-none" radius="lg">
        <Image
          isZoomed
          alt={altText}
          className="object-cover"
          height={200}
          src={imgSrc}
          width={200}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">Available soon.</p>
          <Button
            className="text-tiny text-white bg-black/20"
            color="default"
            radius="lg"
            size="sm"
            variant="flat"
          >
            Notify me
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Features;
