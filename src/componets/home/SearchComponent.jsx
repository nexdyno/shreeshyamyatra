// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { MdOutlineLocationSearching, MdPeopleAlt } from "react-icons/md";
// import { DateRange } from "react-date-range";
// import { addYears, format } from "date-fns";
// import { PiMinusSquareLight } from "react-icons/pi";
// import { BsPlusSquare } from "react-icons/bs";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { IoLocationSharp } from "react-icons/io5";
// import { IoIosSearch } from "react-icons/io";
// import { FiCalendar } from "react-icons/fi";
// import { RxCross2 } from "react-icons/rx";
// import { useAppContext } from "@/context/AppContext";

// const SearchComponent = () => {
//   const { mobileSearch, setmobileSearch } = useAppContext();

//   const [dateRange, setDateRange] = useState([
//     { startDate: new Date(), endDate: new Date(), key: "selection" },
//   ]);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const calendarRef = useRef(null);
//   const roomRef = useRef(null);

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
//     const handleClickOutside = (event) => {
//       if (popupRef.current && !popupRef.current.contains(event.target)) {
//         setIsPopupOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const [showPopup, setShowPopup] = useState(false);
//   const [rooms, setRooms] = useState(1);
//   const [guests, setGuests] = useState(1);

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   const handleRoomChange = (type) => {
//     if (type === "increment") {
//       setRooms(rooms + 1);
//     } else if (type === "decrement" && rooms > 1) {
//       if (guests > (rooms - 1) * 3) {
//         setGuests((rooms - 1) * 3); // Adjust guests if they exceed the new room limit
//       }
//       setRooms(rooms - 1);
//     }
//   };

//   const handleGuestChange = (type) => {
//     if (type === "increment") {
//       if (guests < rooms * 3) {
//         setGuests(guests + 1);
//       } else {
//         alert("Add more rooms to accommodate more guests.");
//       }
//     } else if (type === "decrement" && guests > 1) {
//       setGuests(guests - 1);
//     }
//   };

//   return (
//     <>
//       <div className="relative flex flex-col lg:flex-row items-center w-full max-w-5xl gap-4 bg-white rounded-md shadow-md pb-5 lg:pb-0 border border-gray">
//         {mobileSearch && (
//           <div
//             onClick={() => setmobileSearch(!mobileSearch)}
//             className="absolute -top-10 left-2 w-full flex justify-end items-end md:hidden"
//           >
//             <RxCross2 size={30} className="bg-gray-200 rounded-full p-2" />
//           </div>
//         )}

//         <div className="flex items-center w-full lg:flex-1 border-b lg:border-r lg:border-b-0 border-gray-300 p-3">
//           <IoLocationSharp size={20} className="text-primary" />
//           <input
//             type="text"
//             placeholder="Search by city, hotel"
//             className="text-sm px-5 py-1 w-full focus:outline-none font-medium"
//           />
//         </div>

//         <div className="flex items-center w-full lg:flex-1 border-b lg:border-r lg:border-b-0 border-gray-300 relative font-medium px-2">
//           <FiCalendar size={20} className="text-primary" />
//           <div
//             onClick={() => setShowCalendar(!showCalendar)}
//             className="text-sm text-gray-700 py-2 px-5 lg:py-5 cursor-pointer"
//           >
//             {`${format(dateRange[0].startDate, "EEE, d MMM")} - ${format(
//               dateRange[0].endDate,
//               "EEE, d MMM"
//             )}`}
//           </div>
//           {showCalendar && (
//             <div className="absolute top-14 z-50 shadow-lg" ref={calendarRef}>
//               <DateRange
//                 editableDateInputs
//                 onChange={handleDateChange}
//                 moveRangeOnFirstSelection={false}
//                 ranges={dateRange}
//                 minDate={new Date()}
//                 maxDate={addYears(new Date(), 3)}
//                 rangeColors={["#4caf50"]}
//               />
//             </div>
//           )}
//         </div>
//         <div className="relative flex items-center w-full md:w-fit lg:flex font-medium p-3">
//           <MdPeopleAlt
//             size={20}
//             className="text-primary"
//             onClick={togglePopup}
//           />
//           <p
//             className="text-sm text-gray-700 px-5 py-1 cursor-pointer"
//             onClick={togglePopup}
//           >
//             Rooms {rooms} Guests {guests}
//           </p>

//           {showPopup && (
//             <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10 border">
//               <div className="flex justify-between items-center mb-4">
//                 <p className="text-gray-700">Rooms</p>
//                 <div className="flex items-center">
//                   <button
//                     className="px-2 py-1 bg-gray-200 rounded-l focus:outline-none"
//                     onClick={() => handleRoomChange("decrement")}
//                   >
//                     -
//                   </button>
//                   <span className="px-3">{rooms}</span>
//                   <button
//                     className="px-2 py-1 bg-gray-200 rounded-r focus:outline-none"
//                     onClick={() => handleRoomChange("increment")}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center">
//                 <p className="text-gray-700">Guests</p>
//                 <div className="flex items-center">
//                   <button
//                     className="px-2 py-1 bg-gray-200 rounded-l focus:outline-none"
//                     onClick={() => handleGuestChange("decrement")}
//                   >
//                     -
//                   </button>
//                   <span className="px-3">{guests}</span>
//                   <button
//                     className="px-2 py-1 bg-gray-200 rounded-r focus:outline-none"
//                     onClick={() => handleGuestChange("increment")}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="w-auto px-3">
//           <button className="w-full bg-primaryGradient lg:w-auto py-2 px-6 lg:py-3 text-white text-sm transition flex items-center justify-center gap-2 font-medium rounded">
//             <IoIosSearch size={20} className="text-white" />
//             <span>Search</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SearchComponent;

// components/SearchComponent.jsx
// import React from "react";
// import { IoIosSearch } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import { useAppContext } from "@/context/AppContext";
// import SearchInput from "./SearchInput";
// import DateSelector from "./DateSelector";
// import RoomGuestSelector from "./RoomGuestSelector";

// const SearchComponent = () => {
//   const { mobileSearch, setmobileSearch } = useAppContext();

//   return (
//     <div className="relative flex flex-col lg:flex-row items-center w-full max-w-5xl gap-4 bg-white rounded-md shadow-md pb-5 lg:pb-0 border border-gray">
//       {mobileSearch && (
//         <div
//           onClick={() => setmobileSearch(!mobileSearch)}
//           className="absolute -top-10 left-2 w-full flex justify-end items-end md:hidden"
//         >
//           <RxCross2 size={30} className="bg-gray-200 rounded-full p-2" />
//         </div>
//       )}

//       <SearchInput />
//       <DateSelector />
//       <RoomGuestSelector />

//       <div className="w-auto px-3">
//         <button className="w-full bg-primaryGradient lg:w-auto py-2 px-6 lg:py-3 text-white text-sm transition flex items-center justify-center gap-2 font-medium rounded">
//           <IoIosSearch size={20} className="text-white" />
//           <span>Search</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchComponent;

import React from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useAppContext } from "@/context/AppContext";
import SearchInput from "./SearchInput";
import DateSelector from "./DateSelector";
import RoomGuestSelector from "./RoomGuestSelector";
import Link from "next/link";
import { useState } from "react";

const SearchComponent = () => {
  const { mobileSearch, setmobileSearch } = useAppContext();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="relative flex flex-col lg:flex-row items-center w-full max-w-5xl gap-4 bg-white rounded-md shadow-md pb-5 lg:pb-0 border border-gray">
      {mobileSearch && (
        <div
          onClick={() => setmobileSearch(!mobileSearch)}
          className="absolute -top-10 left-2 w-full flex justify-end items-end md:hidden"
        >
          <RxCross2 size={30} className="bg-gray-200 rounded-full p-2" />
        </div>
      )}

      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      <DateSelector />
      <RoomGuestSelector />

      <div className="w-auto px-3">
        <Link href={{ pathname: "/hotel", query: { search: searchValue } }}>
          <button className="w-full bg-primaryGradient lg:w-auto py-2 px-6 lg:py-3 text-white text-sm transition flex items-center justify-center gap-2 font-medium rounded">
            <IoIosSearch size={20} className="text-white" />
            <span>Search</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchComponent;
