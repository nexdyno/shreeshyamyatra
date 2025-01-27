"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setroomAndGuest } from "@/redux/dataSlice";
import RoomGuestSelectorMobile from "./RoomGuestSelectorMobile";
import RoomGuestSelectorDesktop from "./RoomGuestSelectorDesktop";
import { MdPeopleAlt } from "react-icons/md";
import toast from "react-hot-toast";

const RoomGuestSelector = () => {
  const dispatch = useDispatch();
  const { roomAndGuest, selectedRoom } = useSelector((state) => state.data);

  const [guests, setGuests] = useState(roomAndGuest?.guest || 1);
  const [showPopup, setShowPopup] = useState(false);
  const [rooms, setRooms] = useState(roomAndGuest?.room || 1);
  const [extraGuest, setExtraGuests] = useState(roomAndGuest?.extraPerson || 0);
  // const [child, setChild] = useState(0);
  const [isDesktop, setIsDektop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDektop(window.innerWidth <= 1024);
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      const baseGuests = (rooms + 1) * selectedRoom?.base_adults;
      if (guests > baseGuests) {
        setExtraGuests(guests - baseGuests);
      } else {
        setExtraGuests(0);
      }
    } else if (type === "decrement" && rooms > 1) {
      if (guests > (rooms - 1) * selectedRoom?.max_adults) {
        setGuests((rooms - 1) * selectedRoom?.max_adults);
        setExtraGuests(
          (rooms - 1) * selectedRoom?.max_adults -
            (rooms - 1) * selectedRoom?.base_adults
        );
      } else if (guests > (rooms - 1) * selectedRoom?.base_adults) {
        setExtraGuests(guests - (rooms - 1) * selectedRoom?.base_adults);
      } else {
        setExtraGuests(0);
      }
      setRooms(rooms - 1);
    }
  };

  const handleGuestChange = (type) => {
    const baseGuests = rooms * selectedRoom?.base_adults; // Total base guests allowed for all rooms
    const maxGuests = rooms * selectedRoom?.max_adults; // Total max guests allowed for all rooms

    if (type === "increment") {
      if (guests < maxGuests) {
        setGuests(guests + 1);

        if (guests + 1 > baseGuests) {
          const newExtraGuests = guests + 1 - baseGuests;
          setExtraGuests(newExtraGuests);
          alert(
            `Adding guest ${newExtraGuests} beyond the free limit will incur an extra charge of ₹350 per guest.`
          );
        }
      } else {
        toast.error("Add more rooms to accommodate more guests.");
      }
    } else if (type === "decrement" && guests > 1) {
      if (guests > baseGuests) {
        const newExtraGuests = guests - baseGuests;

        setExtraGuests(newExtraGuests);
      } else {
        setExtraGuests(0); // Reset extra guests if within base limit
      }
      setGuests(guests - 1);
    }
  };

  // const handleChildChange = (type) => {
  //   if (type === "increment") {
  //     setChild((prevChild) => prevChild + 1);
  //   } else if (type === "decrement") {
  //     setChild((prevChild) => Math.max(0, prevChild - 1)); // Ensure it doesn't go below 0
  //   }
  // };

  useEffect(() => {
    dispatch(
      setroomAndGuest({ room: rooms, guest: guests, guestExtra: extraGuest })
    );
  }, [rooms, guests]);

  return (
    <div className="w-full lg:w-fit lg:relative">
      <div
        onClick={() => setShowPopup(!showPopup)}
        className="flex item-center ml-2"
      >
        <MdPeopleAlt size={20} className="text-primary" />

        <p className="text-sm text-gray-700 font-medium px-2 py-1 cursor-pointer text-nowrap">
          <span>Rooms {roomAndGuest?.room}, </span>
          <span>Guests {roomAndGuest?.guest}</span>
        </p>
      </div>
      {showPopup && (
        <>
          {!isDesktop ? (
            <RoomGuestSelectorDesktop
              rooms={rooms}
              guests={guests}
              // child={child}
              handleRoomChange={handleRoomChange}
              handleGuestChange={handleGuestChange}
              // handleChildChange={handleChildChange}
            />
          ) : (
            <RoomGuestSelectorMobile
              rooms={rooms}
              guests={guests}
              // child={child}
              handleRoomChange={handleRoomChange}
              handleGuestChange={handleGuestChange}
              // handleChildChange={handleChildChange}
              setShowPopup={setShowPopup}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RoomGuestSelector;
