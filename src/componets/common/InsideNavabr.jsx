"use client";

import { setIsSearchOpen, setSearchValue } from "@/redux/dataSlice";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function InsideNavabr() {
  const dispatch = useDispatch();
  // const [searchValue, setSearchValue] = useState("Khatu Shyam");

  const {
    bookingDate,
    roomAndGuest,
    IsSearchOpen,
    searchValue,
    matchedProperty,
  } = useSelector((state) => state.data);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="bg-white py-4 border-b border-gray-400 px-6 flex items-center justify-between shadow-sm rounded-sm">
      {/* Left Section */}
      <div className="flex flex-col gap-2">
        {/* Header with Back Arrow and Title */}
        <div className="flex items-center">
          <span className="cursor-pointer text-gray-600 -ml-5">
            <IoMdArrowBack
              onClick={handleBack}
              size={20}
              className="text-black font-bold"
            />
          </span>
          <p
            onClick={() => dispatch(setIsSearchOpen(true))}
            className="ml-4 text-lg font-semibold font-poppins text-gray-800"
          >
            {(matchedProperty?.name || searchValue || "Khatu Shyam").slice(
              0,
              20
            ) +
              ((matchedProperty?.name || searchValue || "Khatu Shyam").length >
              20
                ? "..."
                : "")}
          </p>
        </div>

        {/* Booking Info */}
        <div className="flex items-center text-sm font-semibold font-poppins text-gray-600 px-2">
          {/* Date Range */}
          <span
            onClick={() => dispatch(setIsSearchOpen(true))}
            className="mr-6"
          >
            {bookingDate
              ? `${new Date(bookingDate?.startDate).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )} - ${new Date(bookingDate?.endDate).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )}`
              : "Please select the date"}
          </span>

          {/* Room and Guest Info */}
          <span onClick={() => dispatch(setIsSearchOpen(true))} className="">
            {roomAndGuest
              ? `${roomAndGuest?.room} room${
                  roomAndGuest.room > 1 ? "s" : ""
                } · ${roomAndGuest?.guest} guest${
                  roomAndGuest.guest > 1 ? "s" : ""
                }`
              : ""}
          </span>
        </div>
      </div>

      {/* Edit Button */}
      <div className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 cursor-pointer shadow-sm">
        <CiEdit
          onClick={() => dispatch(setIsSearchOpen(true))}
          size={24}
          className="text-gray-600"
        />
      </div>
    </div>
  );
}
