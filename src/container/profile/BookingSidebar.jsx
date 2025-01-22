import React, { useState } from "react";
import BookingCard from "./BookingCard";
import { RxCross2 } from "react-icons/rx";

const BookingSidebar = ({ type, closeSidebar }) => {
  return (
    <>
      {/* Background overlay */}
      {type !== "" && (
        <div
          className="fixed inset-0  bg-black bg-opacity-50 z-[98]"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full lg:w-[40%] lg:mt-[12vh] bg-white shadow-lg transform font-poppins z-[99] ${
          type === "" ? "translate-x-full" : "translate-x-0"
        } transition-transform duration-300 ease-in-out custom-scrollbar overflow-y-auto`}
      >
        <div className="flex items-center justify-between px-5 mt-5 mb-3">
          <h2 className="text-xl font-bold text-gray-800">
            All Bookings Details
          </h2>
          <button
            className=" text-gray-600 hover:text-gray-800"
            onClick={closeSidebar}
          >
            <RxCross2 size={30} />
          </button>
        </div>

        <BookingCard />
      </div>
    </>
  );
};

export default BookingSidebar;
