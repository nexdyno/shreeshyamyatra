import Image from "next/image";
import React from "react";

export default function CardRecommended({ item }) {
  const truncateText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };
  return (
    <div
      className=" rounded-lg overflow-hidden transition duration-300 flex-shrink-0 w-60 
                  h-[45vh] lg:h-[50vh] lg:w-full  cursor-pointer border border-gray-400 p-2 lg:p-5 "
      style={{}}
    >
      <div className="relative h-28 lg:h-48 w-full">
        <Image
          src={item.logo_url || "/assets/logo.svg"}
          // src="/topimg.jpg"
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between  h-[50%] lg:h-[30%]  overflow-hidden">
        <div>
          <h2 className="text-lg font-semibold lg:font-bold mb-2 lg:mt-4">
            {item.name}
          </h2>
          <p className="text-sm lg:text-base text-gray-800">
            {truncateText(item.address, 80)}
          </p>
        </div>
      </div>
      <button className="text-black font-semibold font-poppins underline  lg:mt-4">
        View All Details
      </button>
    </div>
  );
}
