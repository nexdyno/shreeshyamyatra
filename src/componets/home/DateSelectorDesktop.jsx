"use client";

import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { addYears } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateSelectorDesktop = ({
  dateRange,
  handleDateChange,
  setShowCalendar,
}) => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowCalendar]);

  return (
    <div className="absolute top-14 z-40 shadow-lg" ref={calendarRef}>
      <DateRange
        editableDateInputs
        onChange={handleDateChange}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        minDate={new Date()}
        maxDate={addYears(new Date(), 3)}
        rangeColors={["#2276E3"]}
      />
    </div>
  );
};

export default DateSelectorDesktop;
