"use client";

import SearchComponent from "@/componets/home/SearchComponent";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import React from "react";

export default function TopBanner() {
  const { mobileSearch, setmobileSearch } = useAppContext();

  return (
    <div className="">
      <section
        className="relative w-full min-h-[70vh] font-poppins pt-20 hidden lg:block"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url("/assets/home/bg-image.svg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className=" w-full h-full flex items-center justify-center px-5">
          <div className="space-y-4 text-center pt-10 lg:pt-16 text-white">
            <h1 className="font-bold text-3xl tracking-wide lg:text-4xl">
              {/* Book Your Perfect Stay */}
              Discover Comfortable Stays in Khatu Shyam Ji
            </h1>
            <h2 className="font-bold text-xl tracking-wide lg:text-3xl">
              {/* Family, Friends, or Solo Travel – We’ve Got You Covered */}
              Affordable Rooms, Dharamshalas, and Hotels for Every Traveler
            </h2>
            <p className=" hidden lg:block text-base tracking-wide lg:text-lg">
              {/* Hassle-Free Hotel Booking | Verified Customer Reviews | Affordable
            Rates | 24/7 Support */}
              Easy Booking | Verified Reviews | Budget-Friendly Options | 24/7
              Assistance
            </p>
            <p className="hidden lg:block text-sm tracking-wide lg:text-base">
              Your trusted partner for a peaceful stay during your Shree Shyam
              Yatra
            </p>
          </div>
        </div>
        {/* Search Component */}
        <div
          className={`${
            mobileSearch ? "fixed top-20" : ""
          } w-full flex items-center justify-center pt-10 px-5`}
        >
          <SearchComponent />
        </div>
      </section>

      <section
        className="relative w-full min-h-[70vh] font-poppins pt-20 lg:hidden bg-white"
        // style={{
        //   backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url("/assets/home/bg-image.svg")`,
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="pt-8 px-5 w-full font-poppins ">
          <div className="flex items-center justify-between ">
            <div className="flex flex-col gap-1 w-[70%]">
              <h1 className="font-bold text-xl text-primary">
                {" "}
                Discover Comfortable Stays in Khatu Shyam
              </h1>
              <p className="text-sm font-semibold">
                Affordable Rooms, Dharamshalas, and Hotels.
              </p>
            </div>
            <div className="relative h-24 w-[30%]">
              <Image
                src="/topimg.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
        <div className="pt-8 text-center flex items-center justify-center font-semibold">
          <p className=" border border-orange-700 w-fit px-8 py-2 rounded-lg ">
            <span className="text-green-700">Up to 45% off </span> on hotel
            bookings
          </p>
        </div>
        {/* Search Component */}
        <div
          className={`${
            mobileSearch ? "fixed top-10" : ""
          } w-full flex items-center justify-center pt-10 px-5`}
        >
          <SearchComponent />
        </div>
      </section>
    </div>
  );
}
