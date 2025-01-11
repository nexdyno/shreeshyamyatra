import Link from "next/link";
import React from "react";
import { MdOutlinePerson4 } from "react-icons/md";

export default function HotelBannerOffer() {
  return (
    <div className="w-full h-[80vh] lg:h-[50vh] lg:px-20 py-10 font-poppins">
      <div
        className="w-full h-full md:rounded-md"
        style={{
          backgroundImage: `linear-gradient(165deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url("/assets/home/hoteloffer.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="w-full p-6 flex flex-col h-full justify-between">
          <div className="flex flex-col lg:flex-row w-full h-full  lg:gap-0">
            {/* Left Section */}
            <div className="flex flex-col items-center gap-10 lg:items-start justify-between w-full lg:w-1/2 h-full text-center lg:text-left">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-wide leading-8 lg:leading-10 text-white">
                Get Ready for an Ultimate Staycation!
              </h2>
              <Link href="/hotel">
                <button className="bg-primaryGradient text-white font-medium tracking-wide  py-3 px-16 w-fit rounded-lg">
                  Book now
                </button>
              </Link>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 h-full flex items-center lg:items-end justify-center lg:justify-end pr-0 lg:pr-20">
              <div className="font-semibold tracking-wide text-white flex flex-col items-center lg:items-end gap-1">
                <p className="text-2xl">Up to</p>
                <p className="text-5xl font-semibold">75%</p>
                <span className="text-2xl">off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
