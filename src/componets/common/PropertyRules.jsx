"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaWifi } from "react-icons/fa";

const PropertyRules = ({ Rules }) => {
  // Define default visibility for amenities
  const [showAll, setShowAll] = useState(false);
  const popupRef = useRef(null);

  const handleami = (e) => {
    e.stopPropagation();
    setShowAll(true);
  };

  // Divide amenities into visible and hidden
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowAll(false);
      }
    };

    if (showAll) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAll]);

  return (
    <div className="" onClick={() => setShowAll(false)}>
      <h3 className="text-base font-semibold mb-4 mt-4">Property Rules</h3>
      <div className="flex flex-col gap-1 items-start space-x-2">
        <h2 className="text-base text-black font-semibold">
          {Rules?.[0]?.heading}
        </h2>
        <p className="text-gray-600 text-sm font-medium -ml-2">
          {Rules?.[0]?.description}
        </p>
      </div>
      <button
        onClick={handleami}
        className="mt-2 py-2 text-sm text-black underline rounded-md transition duration-300 font-semibold"
      >
        {showAll ? "Show Less Amenities" : "Read All Rules"}
      </button>
      <div
        ref={popupRef}
        className={`fixed bottom-0 left-0 w-full bg-white shadow-lg rounded-t-lg py-4 px-4 z-[99] border transform transition-transform duration-300 max-h-[70vh] overflow-y-auto ${
          showAll ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <p className="text-base font-medium">Property All Rules</p>
          <button
            className="text-gray-500 hover:text-gray-700 transition duration-200"
            onClick={() => setShowAll(false)}
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
        <div className="flex flex-col gap-4">
          {Rules?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 items-start space-x-2"
            >
              <h2 className="text-base text-black font-semibold ">
                {item?.heading}
              </h2>
              <p className="text-gray-600 text-sm font-medium">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyRules;
