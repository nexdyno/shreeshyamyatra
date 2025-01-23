"use client";

import React, { useEffect, useRef, useState } from "react";
import { MdDeleteOutline, MdOutlineChildCare, MdPerson2 } from "react-icons/md";
import { RiDoorOpenLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";

const RoomGuestSelectorMobile = ({
  rooms,
  guests,
  child,
  handleRoomChange,
  handleGuestChange,
  handleChildChange,
  setShowPopup,
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white shadow-lg rounded-t-lg py-4 z-[99] border`}
    >
      <div className="flex justify-between items-center mb-4 border-b pb-2 px-4">
        <p className="text-base font-medium">Select rooms & guests</p>
        <button
          className="text-gray-500 hover:text-gray-700 transition duration-200"
          onClick={() => setShowPopup(false)}
          aria-label="Close Popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-between items-center font-poppins pb-4 border-b border-gray-500 px-4">
        <div className="flex items-center gap-4">
          <RiDoorOpenLine size={20} />
          <p className="text-black font-medium">Rooms</p>
        </div>
        <div className="flex items-center border border-black rounded-full">
          <button
            className="focus:outline-none border-r border-black py-2 px-3"
            onClick={() => handleRoomChange("decrement")}
          >
            <MdDeleteOutline className="text-red-700" />
          </button>
          <span className="px-5 text-black">{rooms}</span>
          <button
            className="focus:outline-none border-l border-black py-2 px-3"
            onClick={() => handleRoomChange("increment")}
          >
            <AiOutlinePlus className="text-green-800" />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center px-4 py-4 border-b border-gray-500">
        <div className="flex items-center gap-4">
          <MdPerson2 size={20} />
          <p className="text-black font-medium">Adult</p>
        </div>
        <div className="flex items-center border border-black rounded-full">
          <button
            className="focus:outline-none border-r border-black py-2 px-3"
            onClick={() => handleGuestChange("decrement")}
          >
            <MdDeleteOutline className="text-red-700" />
          </button>
          <span className="px-5 text-black">{guests}</span>
          <button
            className="focus:outline-none border-l border-black py-2 px-3"
            onClick={() => handleGuestChange("increment")}
          >
            <AiOutlinePlus className="text-green-800" />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center px-4 py-4 border-b border-gray-500">
        <div className="flex items-center gap-4">
          <MdOutlineChildCare size={20} />
          <p className="text-black font-medium">Children</p>
        </div>
        <div className="flex items-center border border-black rounded-full">
          <button
            className="focus:outline-none border-r border-black py-2 px-3"
            onClick={() => handleChildChange("decrement")}
          >
            <MdDeleteOutline className="text-red-700" />
          </button>
          <span className="px-5 text-black">{child}</span>
          <button
            className="focus:outline-none border-l border-black py-2 px-3"
            onClick={() => handleChildChange("increment")}
          >
            <AiOutlinePlus className="text-green-800" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center py-3">
        <button
          onClick={() => setShowPopup(false)}
          className="bg-primaryGradient text-white font-medium text-center py-2 w-[90%] rounded-full"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default RoomGuestSelectorMobile;
