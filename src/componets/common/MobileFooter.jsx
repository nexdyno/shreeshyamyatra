"use client";

import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import React, { useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { IoBagOutline, IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
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
    { id: 1, label: "Home", icon: <IoHomeOutline />, link: "/" },
    { id: 2, label: "Search", icon: <IoSearchOutline />, link: "/" },
    { id: 3, label: "Booking", icon: <IoBagOutline />, link: "/hotel" },
    { id: 4, label: "Offers", icon: <BiSolidOffer />, link: "/" },
    { id: 5, label: "Profile", icon: <MdOutlinePersonOutline />, link: "/" },
  ];
  return (
    <div className="fixed bottom-0  end-0 w-full shadow-lg bg-white border-t z-10 ">
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
