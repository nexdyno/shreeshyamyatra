"use client";

import { checkUserSession } from "@/redux/authSlice";
import { fetchAllBookingById } from "@/redux/dataSlice";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import Invoice from "./Invoice";
import BookingDetailsSkeleton from "./BookingDetailsSkeleton";

export default function BookingCard({ setType, setShowInvoice, showInvoice }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { userAllBooking, property } = useSelector((state) => state.data);
  const { session } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (!session) {
          await dispatch(checkUserSession()).unwrap();
        }
        console.log(session?.user?.id, "session?.user?.id session?.user?.id");
        await dispatch(fetchAllBookingById({ id: session?.user?.id })).unwrap();
      } catch (error) {
        console.error(error, "Error while fetching the booking data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, session?.user?.id]);

  const getNameById = (id) => {
    const filtered = property.filter((element) => element.id === id);
    return filtered?.length > 0 ? filtered?.[0]?.name : "--";
  };

  return (
    <>
      {showInvoice ? (
        <div className="p-3">
          <Invoice setShowInvoice={setShowInvoice} />
        </div>
      ) : isLoading ? (
        <BookingDetailsSkeleton />
      ) : (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 w-full mx-auto font-poppins mb-16 lg:mb-20 lg:overflow-y-auto">
          <div className="flex items-center justify-between mb-6 lg:mb-8 lg:hidden ">
            <div onClick={() => setType("")} className="cursor-pointer">
              <IoMdArrowBack
                size={24}
                className="text-gray-800 hover:text-gray-600"
              />
            </div>
            <h2 className="text-lg font-bold text-gray-800">
              All Booking Details
            </h2>
          </div>
          {userAllBooking?.length === 0 && (
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-2xl font-semibold font-poppins">
                Booking Not Found{" "}
              </h1>
            </div>
          )}
          {userAllBooking?.length > 0 &&
            userAllBooking?.map((booking) => (
              <div
                key={booking.id}
                className="p-6 bg-white rounded-xl shadow-md border border-gray-300 space-y-4 hover:shadow-lg transition-shadow"
              >
                <div className="mt-2 text-gray-700 space-y-2 text-sm sm:text-base font-medium">
                  <p>
                    <strong>Booking ID:</strong> {booking.booking_id}
                  </p>
                  <p>
                    <strong>Hotel Name:</strong>{" "}
                    {getNameById(booking.property_id)}
                  </p>
                  <p>
                    <strong>Guest Name:</strong> {booking.name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {booking.contact}
                  </p>
                  <p>
                    <strong>Email:</strong> {booking.email}
                  </p>
                  <p>
                    <strong>Check-in:</strong> {booking.check_in_date} at{" "}
                    {booking.guest_check_in_time}
                  </p>
                  <p>
                    <strong>Check-out:</strong> {booking.check_out_date} at{" "}
                    {booking.guest_check_out_time}
                  </p>
                  <p>
                    <strong>Guests:</strong> {booking.number_of_adults} Adults,{" "}
                    {booking.number_of_children} Children
                  </p>
                  <p>
                    <strong>Room(s):</strong>{" "}
                    {booking.room_assigned
                      ?.map((room) => `${room.room_name} (x${room.quantity})`)
                      .join(", ")}
                  </p>
                  <p>
                    <strong>Total Room Price:</strong> ₹
                    {booking.total_roomPrice}
                  </p>
                  <p>
                    <strong>Extra Charges:</strong> ₹{booking.our_charges}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ₹{booking.total_amount}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    {booking.bill_clear ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </p>
                  <p>
                    <strong>Booking Status:</strong>{" "}
                    <span className="text-black font-medium">
                      {booking.booking_status}
                    </span>
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setShowInvoice(true)}
                    className="px-5 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
