"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaWifi } from "react-icons/fa";

const Amenities = ({ amenities }) => {
  // Define default visibility for amenities
  const [showAll, setShowAll] = useState(false);
  const popupRef = useRef(null);

  const visibleAmenities = amenities.slice(0, 4);
  const hiddenAmenities = amenities.slice(4);

  const handleami = (e) => {
    e.stopPropagation();
    setShowAll(true);
  };
  // Icons mapping based on amenities
  const icons = {
    wifi: <FaWifi />,
    doubleBed: <FaWifi />,
    singleBed: <FaWifi />,
    shower: <FaWifi />,
    parking: <FaWifi />,
    tv: <FaWifi />,
    fridge: <FaWifi />,
    microwave: <FaWifi />,
    restaurant: <FaWifi />,
    geyser: <FaWifi />,
    iron: <FaWifi />,
    coffeeMaker: <FaWifi />,
    desk: <FaWifi />,
    sofa: <FaWifi />,
    bathtub: <FaWifi />,
    workTable: <FaWifi />,
    slippers: <FaWifi />,
    toiletries: <FaWifi />,
    freeWater: <FaWifi />,
    balcony: <FaWifi />,
    kitchen: <FaWifi />,
    safe: <FaWifi />,
    cot: <FaWifi />,
    clothesRack: <FaWifi />,
    curtains: <FaWifi />,
    chargingPoints: <FaWifi />,
    attachBathroom: <FaWifi />,
    parking: <FaWifi />,
    hotWater: <FaWifi />,
    cctv: <FaWifi />,
    drinkingWater: <FaWifi />,
    lcdTv: <FaWifi />,
    lift: <FaWifi />,
    attachedToilet: <FaWifi />,
    cancellationAvailable: <FaWifi />,
    extraMattressAvailable: <FaWifi />,
    wifi: <FaWifi />,
    elevator: <FaWifi />,
    security: <FaWifi />,
    laundryService: <FaWifi />,
    shuttleService: <FaWifi />,
    garden: <FaWifi />,
    terrace: <FaWifi />,
    temple: <FaWifi />,
    lounge: <FaWifi />,
    groceryDelivery: <FaWifi />,
    food: <FaWifi />,
    lawn: <FaWifi />,
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
      <h3 className="text-lg font-semibold mb-2">Amenities</h3>
      <div className="space-y-2">
        {visibleAmenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2 text-nowrap">
            <span>{icons[amenity.toLowerCase()] || "N/A"}</span>
            <span>{amenity.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
          </div>
        ))}
      </div>

      <div
        ref={popupRef}
        className={`fixed bottom-0 left-0 w-full bg-white shadow-lg rounded-t-lg py-4 px-4 z-[99] border transform transition-transform duration-300 max-h-[60vh] overflow-y-auto ${
          showAll ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4 border-b pb-2 ">
          <p className="text-base font-semibold text-black">Amenities</p>
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
        <div className="flex flex-col gap-4 ">
          {hiddenAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span>{icons[amenity.toLowerCase()] || "N/A"}</span>
              <span>{amenity.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleami}
        className="mt-2 py-2 text-sm text-black underline rounded-md transition duration-300 font-semibold"
      >
        {showAll ? "Show Less Amenities" : "View More Amenities"}
      </button>
    </div>
  );
};

export default Amenities;
