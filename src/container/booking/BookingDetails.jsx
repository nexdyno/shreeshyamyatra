"use client";

import React from "react";

export default function BookingDetails({ bookingData }) {
  return (
    <div className="bg-white max-w-4xl mx-auto p-6 shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-blue-600">
          Booking <span className="text-black">cancel</span>
        </h1>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        You will soon receive an email confirmation on{" "}
        <span className="font-semibold">{bookingData.email}</span>
      </p>

      {/* Booking Details */}
      <div className="border p-4 rounded-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Booking Id</h2>
          <span>{bookingData.bookingId}</span>
        </div>

        {/* Hotel Details */}
        <div className="mb-4">
          <h3 className="font-semibold">{bookingData.hotelName}</h3>
          <p className="text-sm text-gray-600">
            {bookingData.hotelDescription}
          </p>
          <p className="text-sm font-semibold mt-2">
            Landmark: {bookingData.landmark}
          </p>
        </div>

        {/* Guest and Stay Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-semibold">Primary Guest: </span>
              {bookingData.primaryGuest}
            </p>
            <p>
              <span className="font-semibold">Mobile Number: </span>
              {bookingData.mobileNumber}
            </p>
            <p>
              <span className="font-semibold">Email Address: </span>
              {bookingData.email}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Check In: </span>
              {bookingData.checkIn}
            </p>
            <p>
              <span className="font-semibold">Check Out: </span>
              {bookingData.checkOut}
            </p>
            <p>
              <span className="font-semibold">Check-In Time: </span>
              {bookingData.checkInTime}
            </p>
            <p>
              <span className="font-semibold">Check-Out Time: </span>
              {bookingData.checkOutTime}
            </p>
          </div>
        </div>

        {/* Room Details */}
        <div className="mt-4">
          <p className="font-bold">1 Night</p>
          <p>{bookingData.roomDetails}</p>
        </div>

        {/* Payment Details */}
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <p className="font-semibold mb-2">Payment Details</p>
          <p className="text-sm text-gray-600">
            Pending amount to be paid:{" "}
            <span className="font-bold text-green-500">
              ₹{bookingData.pendingAmount}
            </span>
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 mt-3 rounded hover:bg-blue-700">
            Pay Now
          </button>
        </div>

        {/* Additional Information */}
        <div className="mt-4">
          <h3 className="font-semibold">Things to know</h3>
          <p className="text-sm text-gray-600">
            Your payment option is 'Pay At Hotel'. Pay ₹1705 online for a
            smoother check-in experience.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <a
          href="/"
          className="text-blue-600 hover:underline text-sm font-semibold"
        >
          Go To Website
        </a>
      </div>
    </div>
  );
}
