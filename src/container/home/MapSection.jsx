import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import React from "react";

export default function MapSection() {
  const data = [
    {
      color: "text-red-800",
      text: "Indonesia",
    },
    {
      color: "text-red-800",
      text: "India",
    },
    {
      color: "text-red-800",
      text: "Malaysia",
    },
    {
      color: "text-red-800",
      text: "Thailand",
    },
    {
      color: "text-red-800",
      text: "Vietnam",
    },
    {
      color: "text-red-800",
      text: "Philippines",
    },
  ];

  return (
    <section className="w-full h-fit">
      <div className="w-full h-fit bg-gray-100 flex items-center">
        {/* Left Column */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className="relative w-full h-[80vh]">
            <Image
              src="/assets/home/map.png"
              alt="map"
              layout="fill"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/2 h-full flex flex-col items-start gap-8 px-10">
          <h1 className="text-3xl font-bold text-gray-700 text-center">
            There's an OYO around. Always.
          </h1>
          <h3 className="text-base text-gray-600 text-center">
            More Destinations. More Ease. More Affordable.
          </h3>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <p className="text-black font-extrabold text-3xl">35+</p>
              <p className="text-sm text-gray-500">Countries</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-black font-extrabold text-3xl">100K+</p>
              <p className="text-sm text-gray-500">Hotels</p>
            </div>
          </div>

          {/* Grid for Data */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border border-gray-200 p-2 rounded-md bg-white"
              >
                <GoDotFill className={`${item.color} text-xl`} />
                <p className="text-base text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
