// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { FiCalendar } from "react-icons/fi";
// import { DateRange } from "react-date-range";
// import { addYears, format } from "date-fns";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css"; // Ensure these are imported
// import { useDispatch, useSelector } from "react-redux";
// import { setBookingDate } from "@/redux/dataSlice";

// const DateSelector = ({ type }) => {
//   const dispatch = useDispatch();
//   // const [bookingDate, setBookingDateLocal] = useState(null);

//   const { bookingDate } = useSelector((state) => state.data);

//   // const bookingDate = JSON.parse(localStorage.getItem("bookingDate"));

//   const [dateRange, setDateRange] = useState(() => {
//     if (bookingDate) {
//       const startDate = new Date(bookingDate.startDate);
//       const endDate = new Date(bookingDate.endDate);
//       return [{ startDate, endDate, key: "selection" }];
//     } else {
//       const today = new Date();
//       const startDate = new Date(today);
//       startDate.setDate(today.getDate());

//       const endDate = new Date(startDate);
//       endDate.setDate(startDate.getDate() + 1);

//       return [{ startDate, endDate, key: "selection" }];
//     }
//   });

//   const [showCalendar, setShowCalendar] = useState(false);
//   const calendarRef = useRef(null);
//   // useEffect(() => {
//   //   if (typeof window !== "undefined") {
//   //     setBookingDateLocal(JSON.parse(localStorage.getItem("bookingDate")));
//   //   }
//   // }, [dateRange]);

//   const handleDateChange = (ranges) => setDateRange([ranges.selection]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (calendarRef.current && !calendarRef.current.contains(event.target)) {
//         setShowCalendar(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//   useEffect(() => {
//     const formattedDates = {
//       startDate: new Date(dateRange[0].startDate).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       }),
//       endDate: new Date(dateRange[0].endDate).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       }),
//     };

//     dispatch(setBookingDate(formattedDates));
//   }, [dateRange, dispatch]);

//   const displayedStartDate =
//     bookingDate?.startDate || format(dateRange[0].startDate, "EEE, d MMM yyyy");
//   const displayedEndDate =
//     bookingDate?.endDate || format(dateRange[0].endDate, "EEE, d MMM yyyy");

//   return (
//     <div
//       className={`flex items-center w-full lg:flex-1 ${
//         type === "no-border" ? "border-none" : "border-b"
//       }  lg:border-r lg:border-b-0 border-gray-500 relative font-medium px-2 z-20`}
//     >
//       <FiCalendar size={20} className="text-primary" />
//       <div
//         onClick={() => setShowCalendar(!showCalendar)}
//         className="text-sm text-gray-700 py-2 px-2 lg:py-5 cursor-pointer text-nowrap"
//       >
//         {`${displayedStartDate} - ${displayedEndDate}`}
//       </div>
//       {showCalendar && (
//         <div
//           className="absolute top-14 z-40 shadow-lg hidden lg:block"
//           ref={calendarRef}
//         >
//           <DateRange
//             editableDateInputs
//             onChange={handleDateChange}
//             moveRangeOnFirstSelection={false}
//             ranges={dateRange}
//             minDate={new Date()}
//             maxDate={addYears(new Date(), 3)}
//             rangeColors={["#2276E3"]}
//           />
//         </div>
//       )}
//       {showCalendar && (
//         <div
//           className="fixed bottom-0 left-0 w-full  bg-white rounded-lg shadow-lg transform translate-y-0 transition-transform duration-300 lg:hidden z-[99]"
//           ref={calendarRef}
//         >
//           {/* Header with Title and Close Button */}
//           <div className="flex justify-between items-center p-4 border-b border-gray-400 ">
//             <h2 className="text-lg font-medium">Select Dates</h2>
//             <button
//               className="text-gray-500 hover:text-gray-700 transition duration-200"
//               onClick={() => setShowCalendar(false)}
//               aria-label="Close Calendar"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           {/* Date Range Picker */}
//           <div className="p-4">
//             <DateRange
//               editableDateInputs
//               onChange={handleDateChange}
//               moveRangeOnFirstSelection={false}
//               ranges={dateRange}
//               minDate={new Date()}
//               maxDate={addYears(new Date(), 3)}
//               rangeColors={["#2276E3"]}
//               className="w-full font-semibold" // Custom class for full width
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateSelector;

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
      } lg:border-r lg:border-b-0 border-gray-500 relative font-medium px-2 z-20`}
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
