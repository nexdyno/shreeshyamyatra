"use client";

import { setroomAndGuest } from "@/redux/dataSlice";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import {
  MdDeleteOutline,
  MdOutlineChildCare,
  MdPeopleAlt,
  MdPerson2,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RiDoorOpenLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";

const RoomGuestSelector = () => {
  // const roomAndGuest = JSON.parse(localStorage.getItem("roomAndGuest"));
  // const selectedRoom = JSON.parse(localStorage.getItem("selectedRoom"));

  const dispatch = useDispatch();
  const { roomAndGuest, selectedRoom } = useSelector((state) => state.data);
  const [guests, setGuests] = useState(roomAndGuest?.guest || 2);
  const [showPopup, setShowPopup] = useState(false);
  const [rooms, setRooms] = useState(roomAndGuest?.room || 1);
  const [extraGuest, setExtraGuests] = useState(roomAndGuest?.extraPerson || 0);
  const [child, setChild] = useState(0);

  const handleChildChange = (type) => {
    if (type === "increment") {
      setChild((prevChild) => prevChild + 1);
    } else if (type === "decrement") {
      setChild((prevChild) => Math.max(0, prevChild - 1)); // Ensure it doesn't go below 0
    }
  };
  const popupRef = useRef(null);

  const togglePopup = () => setShowPopup(!showPopup);

  const handleRoomChange = (type) => {
    if (type === "increment") {
      // Check if the desired number of rooms exceeds available quantity
      if (rooms + 1 > selectedRoom?.available_quantity) {
        toast.error(
          `Only ${selectedRoom?.available_quantity} room(s) are available for this date.`
        );
        return; // Exit early to prevent further increments
      }

      // Increment the room count
      setRooms(rooms + 1);

      // Adjust extra guests based on the new room count
      const baseGuests = (rooms + 1) * selectedRoom?.max_occupancy;
      if (guests > baseGuests) {
        setExtraGuests(guests - baseGuests);
      } else {
        setExtraGuests(0);
      }
    } else if (type === "decrement" && rooms > 1) {
      if (guests > (rooms - 1) * selectedRoom?.max_occupancy + 1) {
        setGuests((rooms - 1) * selectedRoom?.max_occupancy + 1);
        setExtraGuests(guests - (rooms - 1) * selectedRoom?.max_occupancy);
      } else if (guests > (rooms - 1) * selectedRoom?.max_occupancy) {
        setExtraGuests(guests - (rooms - 1) * selectedRoom?.max_occupancy);
      } else {
        setExtraGuests(0);
      }
      setRooms(rooms - 1);
    }
  };

  const handleGuestChange = (type) => {
    const baseGuests = rooms * selectedRoom?.max_occupancy;
    const maxGuests = rooms * selectedRoom?.max_occupancy + rooms;

    if (type === "increment") {
      if (guests < baseGuests) {
        setGuests(guests + 1);
        setExtraGuests(0); // No extra guests if within base limit
      } else if (guests < maxGuests) {
        const newExtraGuests = guests + 1 - baseGuests;
        alert(
          `Adding guest ${newExtraGuests} beyond the free limit will incur an extra charge of ₹350.`
        );
        setGuests(guests + 1);
        setExtraGuests(newExtraGuests);
      } else {
        alert("Add more rooms to accommodate more guests.");
      }
    } else if (type === "decrement" && guests > 1) {
      if (guests > baseGuests) {
        setExtraGuests(extraGuest - 1);
      } else {
        setExtraGuests(0); // Reset extra guests if within base limit
      }
      setGuests(guests - 1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  useEffect(() => {
    dispatch(
      setroomAndGuest({
        room: rooms,
        guest: guests,
        extraPerson: extraGuest,
      })
    );
  }, [rooms, guests, dispatch]);

  return (
    <div className="relative flex items-center w-full md:w-fit lg:flex font-medium px-3 pb-3 lg:p-3">
      <MdPeopleAlt size={20} className="text-primary" onClick={togglePopup} />
      <p
        className="text-sm text-gray-700 px-2 py-1 cursor-pointer text-nowrap"
        onClick={togglePopup}
      >
        <span>Rooms {roomAndGuest?.room}</span>
        {" , "}
        <span>Guests {roomAndGuest?.guest}</span>
      </p>

      {showPopup && (
        <div
          ref={popupRef}
          className="hidden lg:block absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-40 border"
        >
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
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Guests</p>
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
        </div>
      )}

      {showPopup && (
        <div
          ref={popupRef}
          className={` fixed bottom-0  left-0 w-full bg-white shadow-lg rounded-t-lg py-4 z-[99] border transform transition-transform duration-300 ${
            showPopup ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4 border-b pb-2 px-4">
            <p className="text-base font-medium">Select rooms & guests</p>
            <button
              className="text-gray-500 hover:text-gray-700 transition duration-200"
              onClick={() => setShowPopup(false)}
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
          <div className="flex justify-between items-center font-poppins pb-4 border-b border-gray-500 px-4">
            <div className="flex items-center gap-4 ">
              <RiDoorOpenLine size={20} />
              <p className="text-black font-medium">Rooms</p>
            </div>
            <div className="flex items-center border border-black rounded-full ">
              <button
                className="focus:outline-none border-r border-black py-2 px-3 "
                onClick={() => handleRoomChange("decrement")}
              >
                <MdDeleteOutline className="text-red-700" />
              </button>
              <span className="px-5 text-black">{rooms}</span>
              <button
                className="focus:outline-none border-l border-black py-2 px-3"
                onClick={() => handleRoomChange("increment")}
              >
                <AiOutlinePlus className="text-green-800" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center px-4 py-4 border-b border-gray-500">
            <div className="flex items-center gap-4">
              <MdPerson2 size={20} />
              <p className="text-black font-medium">Adult</p>
            </div>
            <div className="flex items-center border border-black rounded-full ">
              <button
                className="focus:outline-none border-r border-black py-2 px-3 "
                onClick={() => handleGuestChange("decrement")}
              >
                <MdDeleteOutline className="text-red-700" />
              </button>
              <span className="px-5 text-black">{guests}</span>
              <button
                className="focus:outline-none border-l border-black py-2 px-3"
                onClick={() => handleGuestChange("increment")}
              >
                <AiOutlinePlus className="text-green-800" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center px-4 py-4 border-b border-gray-500">
            <div className="flex items-center gap-4">
              <MdOutlineChildCare size={20} />
              <p className="text-black font-medium">Children</p>
            </div>
            <div className="flex items-center border border-black rounded-full">
              <button
                className="focus:outline-none border-r border-black py-2 px-3 "
                onClick={() => handleChildChange("decrement")}
              >
                <MdDeleteOutline className="text-red-700" />
              </button>
              <span className="px-5 text-black">{child}</span>
              <button
                className="focus:outline-none border-l border-black py-2 px-3"
                onClick={() => handleChildChange("increment")}
              >
                <AiOutlinePlus className="text-green-800" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center py-3">
            <button
              onClick={() => setShowPopup(false)}
              className="bg-primaryGradient text-white font-medium text-center py-2  w-[90%] rounded-full"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomGuestSelector;
