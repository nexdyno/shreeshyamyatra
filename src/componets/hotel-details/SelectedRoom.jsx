import { fetchRoomsBusy, setSelectedRoom } from "@/redux/dataSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTv,
  FaSnowflake,
  FaWifi,
  FaCouch,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function RoomCard({ matchRooms }) {
  const [filterRoom, setFilterRoom] = useState(null);
  const [avlRoom, setAvlRoom] = useState([]); // Available rooms with quantities

  const dispatch = useDispatch();
  const { OneRoom, selectedRoom, busyRoom, bookingDate } = useSelector(
    (state) => state.data
  ); // Selected room

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
      .filter((room) => room.available_quantity > 0); // Only include rooms with available quantity
  };

  useEffect(() => {
    // Dispatch the action to fetch busy rooms
    dispatch(fetchRoomsBusy());
  }, [dispatch]);

  useEffect(() => {
    if (busyRoom && busyRoom.length >= 0) {
      const result = getAvailableRooms();

      setFilterRoom(result);
      setAvlRoom(result); // Set initial available rooms state
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
  console.log(avlRoom, "avlRoom avlRoom");

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Rooms</h2>
      {avlRoom.length !== 0 ? (
        <div className="space-y-6">
          {avlRoom?.map((room) => (
            <div
              key={room.id}
              className={`flex flex-col md:flex-row border rounded-lg hover:shadow-md p-4 bg-white cursor-pointer ${
                selectedRoom?.id === room.id ? "border-primary bg-blue-100" : "" // Highlight selected room
              }`}
              onClick={() => handleRoomSelect(room)} // Select room on click
            >
              {/* Image Section */}
              <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden rounded-md shadow-md">
                <Image
                  src={room.image || "/assets/home/image1.svg"} // Fallback image
                  alt={`${room.name} Image`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* Details Section */}
              <div className="flex-1 md:pl-6 mt-4 md:mt-0">
                {/* Room Name */}
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-semibold">
                    {room.name}
                    {OneRoom?.id === room.id && (
                      <FaCheckCircle className="text-green-500 ml-2" /> // Green check if selected
                    )}
                  </h3>
                </div>

                {/* Room Details */}
                <p className="text-sm text-gray-500">
                  <p>Available Quantity: {room.available_quantity}</p>
                </p>
                <p className="text-base text-gray-500">
                  Rate: ₹{room.rate} / night
                </p>

                {/* Amenities */}
                <div className="mt-3">
                  <h4 className="text-sm font-semibold mb-2">Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 text-gray-600">
                      <FaSnowflake />
                      <span>AC</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <FaWifi />
                      <span>WiFi</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <span>Microwave</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <span>Hair Dryer</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <FaCouch />
                      <span>Sofa</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-2xl py-5 font-semibold text-center font-poppins text-black">
          No Rooms are Available for the Selected date
        </h1>
      )}
    </div>
  );
}
