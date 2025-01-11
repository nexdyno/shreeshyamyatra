"use client";

import SearchComponent from "@/componets/home/SearchComponent";
import { useAppContext } from "@/context/AppContext";
import React from "react";

export default function TopBanner() {
  const { mobileSearch, setmobileSearch } = useAppContext();

  return (
    <section
      className="relative w-full min-h-[70vh] font-poppins pt-20"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url("/assets/home/bg-image.svg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full flex items-center justify-center px-5">
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
  );
}
