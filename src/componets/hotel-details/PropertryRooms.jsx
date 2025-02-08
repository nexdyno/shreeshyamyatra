import {
  fetchPropertyEvent,
  fetchRoomsBusy,
  setSelectedRoom,
} from "@/redux/dataSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import DateSelector from "../home/DateSelector";
import RoomGuestSelector from "../home/RoomGuestSelector";
import Amenities from "../common/Amenities";

export default function PropertryRooms({ matchRooms, propertyWiseImages }) {
  const [filterRoom, setFilterRoom] = useState(null);
  const [avlRoom, setAvlRoom] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const toggleView = () => setShowAll(!showAll);

  const dispatch = useDispatch();
  const {
    OneRoom,
    selectedRoom,
    busyRoom,
    bookingDate,
    matchedProperty,
    propertyEvent,
  } = useSelector((state) => state.data); // Selected room

  const getAvailableRooms = () => {
    if (!bookingDate || !matchRooms || matchRooms.length === 0) return []; // Early exit if dependencies are missing

    const start = new Date(bookingDate.startDate);
    const end = new Date(bookingDate.endDate);

    // Count the number of rooms booked for each room_id
    const roomBookingCounts = busyRoom.reduce((acc, busyRoom) => {
      const busyStart = new Date(busyRoom.start_date);
      const busyEnd = new Date(busyRoom.end_date);

      // Check if the busy room's dates overlap with the selected dates
      const isDateOverlap =
        (start >= busyStart && start <= busyEnd) || // Start date falls within a busy range
        (end >= busyStart && end <= busyEnd) || // End date falls within a busy range
        (start <= busyStart && end >= busyEnd); // Date range fully overlaps a busy range

      if (isDateOverlap) {
        acc[busyRoom.room_id] =
          (acc[busyRoom.room_id] || 0) + busyRoom.quantity;
      }
      return acc;
    }, {});

    // Filter available rooms based on remaining quantity
    return matchRooms
      .map((room) => {
        const bookedRooms = roomBookingCounts[room.id] || 0;
        const availableRooms = room.total_rooms - bookedRooms;

        return { ...room, available_quantity: availableRooms };
      })
      .filter((room) => room.available_quantity > 0);
  };

  const updateRoomRates = (rooms) => {
    const start = new Date(bookingDate?.startDate);
    const end = new Date(bookingDate?.endDate);

    // Create a new array of updated rooms
    const updatedRooms = rooms.map((room) => {
      const matchingEvent = propertyEvent.find((event) => {
        const eventStart = new Date(event.start_date);
        const eventEnd = new Date(event.end_date);
        return (
          event.room_id === room.id &&
          ((start >= eventStart && start <= eventEnd) ||
            (end >= eventStart && end <= eventEnd) ||
            (start <= eventStart && end >= eventEnd)) // Overlap check
        );
      });

      // Return a new room object with updated rate (avoid modifying the original object)
      return matchingEvent
        ? { ...room, rate: matchingEvent.updated_price }
        : room;
    });

    // Check if selectedRoom exists and its rate actually changed before dispatching
    const updatedSelectedRoom = updatedRooms.find(
      (r) => r.id === selectedRoom?.id
    );
    if (updatedSelectedRoom && updatedSelectedRoom.rate !== selectedRoom.rate) {
      dispatch(setSelectedRoom(updatedSelectedRoom)); // Only dispatch if the rate changed
    }

    return updatedRooms;
  };

  useEffect(() => {
    // Dispatch the action to fetch busy rooms
    dispatch(fetchRoomsBusy());
    dispatch(fetchPropertyEvent());
  }, [dispatch]);

  useEffect(() => {
    if (busyRoom && busyRoom.length >= 0) {
      const result = getAvailableRooms();
      const data = updateRoomRates(result);
      setFilterRoom(data);
      setAvlRoom(data); // Set initial available rooms state
    }
  }, [JSON.stringify(bookingDate), busyRoom, matchRooms]);

  useEffect(() => {
    if (!selectedRoom && avlRoom.length > 0) {
      // Default to the first room in avlRoom
      dispatch(setSelectedRoom(avlRoom[0]));
    }
  }, [selectedRoom, avlRoom, dispatch]);

  const handleRoomSelect = (room) => {
    dispatch(setSelectedRoom(room));
    setAvlRoom((prev) =>
      prev.map((r) =>
        r.id === room.id
          ? { ...r, available_quantity: r.available_quantity }
          : r
      )
    );
  };
  const getImageUrlByRoomId = (roomId) => {
    // Iterate through the data to find matching room_id
    for (const item of propertyWiseImages) {
      if (item.room_ids_tagged.includes(roomId)) {
        return item.image_url;
      }
    }
    return null;
  };

  const RoomPriceWithGST = (roomRate, gst) => {
    const gstAmount = (gst / 100) * roomRate;
    return roomRate + gstAmount;
  };

  return (
    <div className="font-poppins mb-28">
      <h2 className="text-2xl font-semibold mb-4 hidden lg:block">All Rooms</h2>
      {avlRoom?.length !== 0 ? (
        <div className="space-y-6 px-3 lg:space-y-0 lg:px-0 lg:grid lg:grid-cols-2 lg:gap-5">
          {avlRoom?.map((room) => (
            <div
              key={room?.id}
              className={`flex flex-col  rounded-lg shadow-md  bg-white cursor-pointer border border-gray-300 p-5 `}
              onClick={() => handleRoomSelect(room)} // Select room on click
            >
              {/* Image Section */}
              <div className="relative lg:w-full w-full h-36 lg:h-48  overflow-hidden rounded-md shadow-md">
                <Image
                  src={getImageUrlByRoomId(room?.id) || "/topimg.jpg"} // Fallback image
                  alt={`${room?.name} Image`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* Details Section */}
              <div className="flex-1 mt-4">
                {/* Room Name */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold font-poppins">
                    {room?.name}
                    {/* {OneRoom?.id === room.id && (
                      <FaCheckCircle className="text-green-500 ml-2" />
                    )} */}
                  </h3>
                  <p className="text-base font-semibold text-black font-poppins">
                    ₹ {RoomPriceWithGST(room?.rate, matchedProperty?.gst)} /
                    <span className="text-gray-700 font-medium text-xs">
                      {" "}
                      per night{" "}
                    </span>
                  </p>
                </div>

                {/* Room Details */}
                <p className="text-black font-normal text-sm">
                  {room?.description ||
                    "A luxurious room with modern amenities and a great view"}
                </p>

                <div className=" flex items-center justify-between">
                  <button
                    onClick={toggleView}
                    className="mt-2 text-black text-sm font-semibold tracking-wide underline"
                  >
                    {showAll ? "View Less" : "View More"}
                  </button>
                  <button
                    // onClick={toggleView}
                    className={`mt-2 rounded-full  px-5 py-2 font-poppins text-sm font-medium tracking-wide ${
                      selectedRoom?.id === room.id
                        ? " bg-green-100 text-green-700 border border-green-700"
                        : "bg-black text-white"
                    }`}
                  >
                    {selectedRoom?.id === room.id ? "  Selected" : "Select"}
                  </button>
                </div>
                <Amenities amenities={room?.amenities} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-2xl py-5 font-semibold text-center font-poppins text-black">
          {bookingDate ? (
            "No Rooms are Available for the Selected date"
          ) : (
            <>
              <div className="hidden">
                <DateSelector />
                <RoomGuestSelector />
              </div>
              <p className="text-2xl py-5 font-semibold text-center font-poppins text-black">
                No Rooms are Available
              </p>
            </>
          )}
        </h1>
      )}
    </div>
  );
}
