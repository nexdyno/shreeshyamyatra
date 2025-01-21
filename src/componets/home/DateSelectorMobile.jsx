"use client";

import React from "react";
import { DateRange } from "react-date-range";
import { addYears } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateSelectorMobile = ({
  dateRange,
  handleDateChange,
  setShowCalendar,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white rounded-lg shadow-lg transform translate-y-0 transition-transform duration-300 z-[99]">
      {/* Header with Title and Close Button */}
      <div className="flex justify-between items-center p-4 border-b border-gray-400">
        <h2 className="text-lg font-medium">Select Dates</h2>
        <button
          className="text-gray-500 hover:text-gray-700 transition duration-200"
          onClick={() => setShowCalendar(false)}
          aria-label="Close Calendar"
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
      {/* Date Range Picker */}
      <div className="p-4">
        <DateRange
          editableDateInputs
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          minDate={new Date()}
          maxDate={addYears(new Date(), 3)}
          rangeColors={["#2276E3"]}
          className="w-full font-semibold" // Custom class for full width
        />
      </div>
    </div>
  );
};

export default DateSelectorMobile;
