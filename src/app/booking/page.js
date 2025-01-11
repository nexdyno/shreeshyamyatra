"use client";

import BookingDetails from "@/container/booking/BookingDetails";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function BookingPage() {
  const printRef = useRef();

  // State to hold booking details dynamically
  const [bookingData] = useState({
    bookingId: "Z6HR2287",
    hotelName: "Hotel Shree Shyam Near Khatu",
    hotelDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    landmark: "Lorem Ipsum",
    primaryGuest: "Bharti",
    mobileNumber: "9123456789",
    email: "bharti123@gmail.com",
    checkIn: "02/12/2024",
    checkOut: "03/12/2024",
    checkInTime: "12:00 PM",
    checkOutTime: "11:00 AM",
    roomDetails: "2 Guests, 1 Room | Classic",
    pendingAmount: "1705",
  });

  // PDF Download Handler
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Booking_${bookingData.bookingId}`,
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-8 lg:px-16">
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
        >
          Print
        </button>
      </div>

      {/* Booking Details */}
      <div ref={printRef}>
        <BookingDetails bookingData={bookingData} />
      </div>
    </div>
  );
}
