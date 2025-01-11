import React from "react";

export default function BookingCard({ setActiveTab }) {
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
    <div className="p-4 sm:p-6 space-y-6 w-full max-w-md mx-auto">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="p-6 bg-white rounded-sm  border border-gray-200 "
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              {booking.roomName}
            </h3>
            <span
              className={`px-6 py-2 rounded-full text-base font-semibold ${
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
            <p>
              <strong>Number of Rooms:</strong> {booking.numRooms}
            </p>
            <p>
              <strong>Guests:</strong> {booking.guests}
            </p>
            <p>
              <strong>Details:</strong> {booking.details}
            </p>
            <p>
              <strong>Price:</strong> ${booking.price.toFixed(2)}
            </p>
            <p>
              <strong>Days:</strong> {booking.numDays}
            </p>
            <p>
              <strong>Booking Date:</strong> {booking.date}
            </p>
            <p>
              <strong>Time Duration:</strong> {booking.time}
            </p>
          </div>
          <div className="flex justify-end items-center cursor-pointer">
            <span
              onClick={() => setActiveTab("invoice")}
              className={`px-4 py-1 rounded-full text-base font-semibold border border-black hover:bg-primaryGradient hover:text-white hover:border-none`}
            >
              Download Invoice
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
