import Image from "next/image";
import React from "react";

const CustomerItem = ({ imgSrc }) => {
  return (
    <div>
      <div className="p-6 bg-secondary rounded-md text-white">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
        <div className="flex flex-col mt-4">
          <span className="text-lg font-semibold">Mike Hammel</span>
          <span className="text-[0.9375rem]">magna aliqua</span>
        </div>
      </div>
      <div
        className="relative w-28 h-28 rounded-full border-4 border-primary mt-7 flex justify-center 
      before:content-[''] before:absolute before:-top-[0.625rem] before:rotate-45
     before:border-b-transparent before:border-r-transparent before:bg-red
         before:border-[0.625rem] before:border-primary"
      >
        <Image
          layout="fill"
          alt="person"
          src={imgSrc}
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default CustomerItem;
