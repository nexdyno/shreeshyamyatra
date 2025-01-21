"use client";

import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import React, { useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { FaHome, FaInfoCircle, FaUserCircle } from "react-icons/fa";
import {
  IoBagOutline,
  IoCallOutline,
  IoHomeOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RiHotelBedFill } from "react-icons/ri";
export default function MobileFooter() {
  const { setmobileSearch, mobileSearch, clickCheck, setclickCheck } =
    useAppContext();

  const handleFooter = (value) => {
    setclickCheck(value);
    if (value === "Search") {
      setmobileSearch(!mobileSearch);
    }
  };

  const footerItems = [
    { id: 1, label: "Home", icon: <FaHome size={22} />, link: "/" },
    {
      id: 3,
      label: "Hotels",
      icon: <RiHotelBedFill size={22} />,
      link: "/properties",
    },
    {
      id: 6,
      label: "About Us",
      icon: <FaInfoCircle size={20} />,
      link: "/about",
    },

    {
      id: 5,
      label: "My Account",
      icon: <FaUserCircle size={22} />,
      link: "/profile",
    },
  ];
  return (
    <div className="fixed bottom-0  end-0 w-full shadow-lg bg-white border-t z-10 font-poppins">
      <div className="flex justify-around py-2">
        {footerItems?.map((item, index) => (
          <Link key={index} href={item?.link}>
            <div
              onClick={() => handleFooter(item.label)}
              className={`flex flex-col items-center  hover:text-blue-600 cursor-pointer ${
                clickCheck === item.label ? "text-primary" : "text-gray-500"
              }`}
            >
              {item.icon}
              <p className="text-sm mt-1">{item.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
