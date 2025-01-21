import React from "react";
import { IoMdArrowBack } from "react-icons/io";

export default function BookingCard({ setType }) {
  const bookings = [
    {
      id: 1,
      roomName: "Deluxe Suite",
      numRooms: 2,
      guests: 4,
      details: "Ocean view, King-size bed, Free breakfast",
      price: 350.75,
      numDays: 3,
      date: "2025-01-10",
      time: "3:00 PM - 11:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      roomName: "Standard Room",
      numRooms: 1,
      guests: 2,
      details: "City view, Queen-size bed, Free WiFi",
      price: 120.5,
      numDays: 2,
      date: "2025-01-12",
      time: "2:00 PM - 10:00 AM",
      status: "Pending",
    },
    {
      id: 3,
      roomName: "Executive Suite",
      numRooms: 1,
      guests: 1,
      details: "Garden view, Workspace, Free parking",
      price: 200.0,
      numDays: 5,
      date: "2025-01-15",
      time: "4:00 PM - 12:00 PM",
      status: "Cancelled",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 w-full max-w-md mx-auto font-poppins mb-16 lg:mb-0">
      <div className="flex items-center justify-between mb-8">
        <div onClick={() => setType("")}>
          <IoMdArrowBack size={30} />
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
          All Bookings Details
        </h2>
      </div>
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="p-6 sm:p-8 lg:p-10 bg-white rounded-lg shadow-sm border border-gray-500 space-y-4"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {booking.roomName}
            </h3>
            <span
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium ${
                booking.status === "Confirmed"
                  ? "bg-green-100 text-green-800"
                  : booking.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {booking.status}
            </span>
          </div>

          {/* Booking Details */}
          <div className="mt-4 text-gray-700 space-y-2">
            <p className="text-sm sm:text-base">
              <strong>Number of Rooms:</strong> {booking.numRooms}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Guests:</strong> {booking.guests}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Details:</strong> {booking.details}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Price:</strong> ${booking.price.toFixed(2)}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Days:</strong> {booking.numDays}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Booking Date:</strong> {booking.date}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Time Duration:</strong> {booking.time}
            </p>
          </div>
          <div className="flex justify-end items-center cursor-pointer">
            <span
              className={`px-4 py-1 rounded-full text-base sm:text-lg font-medium border border-black hover:bg-primaryGradient hover:text-white hover:border-none`}
            >
              Download Invoice
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
