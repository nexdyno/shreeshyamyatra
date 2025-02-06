"use client";

import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setBookingDate } from "@/redux/dataSlice";
import DateSelectorMobile from "./DateSelectorMobile";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateSelectorDesktop from "./DateSelectorDesktop";

const DateSelector = ({ type }) => {
  const dispatch = useDispatch();
  const { bookingDate } = useSelector((state) => state.data);

  const [dateRange, setDateRange] = useState(() => {
    if (bookingDate) {
      const startDate = new Date(bookingDate.startDate);
      const endDate = new Date(bookingDate.endDate);
      return [{ startDate, endDate, key: "selection" }];
    } else {
      const today = new Date();
      const startDate = new Date(today);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
      return [{ startDate, endDate, key: "selection" }];
    }
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const handleDateChange = (ranges) => setDateRange([ranges.selection]);

  const displayedStartDate =
    bookingDate?.startDate || format(dateRange[0].startDate, "EEE, d MMM yyyy");
  const displayedEndDate =
    bookingDate?.endDate || format(dateRange[0].endDate, "EEE, d MMM yyyy");

  return (
    <div
      className={`flex items-center w-full lg:flex-1 ${
        type === "no-border" ? "border-none" : "border-b"
      } lg:border-r lg:border-b-0 border-gray-500 relative font-medium px-2 z-30`}
    >
      <FiCalendar size={20} className="text-primary" />
      <div
        onClick={() => setShowCalendar(!showCalendar)}
        className="text-sm text-gray-700 py-2 px-2 lg:py-5 cursor-pointer text-nowrap"
      >
        {`${displayedStartDate} - ${displayedEndDate}`}
      </div>
      {showCalendar &&
        (isMobile ? (
          <DateSelectorMobile
            dateRange={dateRange}
            handleDateChange={handleDateChange}
            setShowCalendar={setShowCalendar}
          />
        ) : (
          <DateSelectorDesktop
            dateRange={dateRange}
            handleDateChange={handleDateChange}
            setShowCalendar={setShowCalendar}
          />
        ))}
    </div>
  );
};

export default DateSelector;
