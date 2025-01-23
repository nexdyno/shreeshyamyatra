"use client";

import React from "react";

const RoomGuestSelectorDesktop = ({
  rooms,
  guests,
  child,
  handleRoomChange,
  handleGuestChange,
  handleChildChange,
}) => {
  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-40 border">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">Rooms</p>
        <div className="flex items-center">
          <button
            className="px-2 py-1 bg-gray-200 rounded-l focus:outline-none"
            onClick={() => handleRoomChange("decrement")}
          >
            -
          </button>
          <span className="px-3">{rooms}</span>
          <button
            className="px-2 py-1 bg-gray-200 rounded-r focus:outline-none"
            onClick={() => handleRoomChange("increment")}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">Adult</p>
        <div className="flex items-center">
          <button
            className="px-2 py-1 bg-gray-200 rounded-l focus:outline-none"
            onClick={() => handleGuestChange("decrement")}
          >
            -
          </button>
          <span className="px-3">{guests}</span>
          <button
            className="px-2 py-1 bg-gray-200 rounded-r focus:outline-none"
            onClick={() => handleGuestChange("increment")}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-700">Children</p>
        <div className="flex items-center">
          <button
            className="px-2 py-1 bg-gray-200 rounded-l focus:outline-none"
            onClick={() => handleChildChange("decrement")}
          >
            -
          </button>
          <span className="px-3">{child}</span>
          <button
            className="px-2 py-1 bg-gray-200 rounded-r focus:outline-none"
            onClick={() => handleChildChange("increment")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomGuestSelectorDesktop;
