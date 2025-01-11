import Image from "next/image";
import React from "react";
import { GoDotFill } from "react-icons/go";

export default function OfferSection() {
  const data = ["Assured Check-in", "Assured Check-in", "Assured Check-in"];

  return (
    <div className="w-full h-full py-10 px-20 font-poppins">
      <h1 className="text-4xl text-center font-semibold">Package</h1>
      <div className="border border-gray-400"></div>
      <div className="relative h-[50vh] pt-10">
        {/* Image */}
        <Image
          src="/assets/home/offerimg.svg"
          alt="image"
          layout="fill"
          objectFit="cover"
          className="z-0 rounded-md"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10 rounded-md"></div>
        {/* Text */}
        <div className=" absolute inset-0 flex flex-col gap-4 items-start justify-start pl-10 py-5 z-20">
          <div className="text-white text-4xl font-bold w-[35%] flex flex-col gap-2 tracking-wide">
            <h1>India no 1 premium</h1>
            <p>hotels</p>
          </div>
          <div className="flex flex-col gap-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-white">
                <GoDotFill />
                <p className="text-lg">{item}</p>
              </div>
            ))}
          </div>
          <div className="pt-10">
            <button className="bg-white text-blue-600 py-2 px-5 text-base font-bold rounded-md">
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
