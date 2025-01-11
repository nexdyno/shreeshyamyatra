"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { DateRange } from "react-date-range";
import { addYears, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; // Ensure these are imported
import { useDispatch, useSelector } from "react-redux";
import { setBookingDate } from "@/redux/dataSlice";

const DateSelector = () => {
  const dispatch = useDispatch();
  const [bookingDate, setBookingDateLocal] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBookingDateLocal(JSON.parse(localStorage.getItem("bookingDate")));
    }
  }, []);

  // const { bookingDate } = useSelector((state) => state.data);
  const [dateRange, setDateRange] = useState(() => {
    if (bookingDate) {
      const startDate = new Date(bookingDate.startDate);
      const endDate = new Date(bookingDate.endDate);
      return [{ startDate, endDate, key: "selection" }];
    } else {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + 1);

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);

      return [{ startDate, endDate, key: "selection" }];
    }
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const handleDateChange = (ranges) => setDateRange([ranges.selection]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const formattedDates = {
      startDate: new Date(dateRange[0].startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      endDate: new Date(dateRange[0].endDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    dispatch(setBookingDate(formattedDates));
  }, [dateRange, dispatch]);

  const displayedStartDate =
    bookingDate?.startDate || format(dateRange[0].startDate, "EEE, d MMM yyyy");
  const displayedEndDate =
    bookingDate?.endDate || format(dateRange[0].endDate, "EEE, d MMM yyyy");

  return (
    <div className="flex items-center w-full lg:flex-1 border-b lg:border-r lg:border-b-0 border-gray-300 relative font-medium px-2 z-20">
      <FiCalendar size={20} className="text-primary" />
      <div
        onClick={() => setShowCalendar(!showCalendar)}
        className="text-sm text-gray-700 py-2 px-2 lg:py-5 cursor-pointer text-nowrap"
      >
        {`${displayedStartDate} - ${displayedEndDate}`}
      </div>
      {showCalendar && (
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
      )}
    </div>
  );
};

export default DateSelector;
