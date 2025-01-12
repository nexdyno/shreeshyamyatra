"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DateSelector from "../home/DateSelector";
import RoomGuestSelector from "../home/RoomGuestSelector";
import { useDispatch, useSelector } from "react-redux";
import { setTotalSummary } from "@/redux/dataSlice";
import toast from "react-hot-toast";
import { checkUserSession, setLoginIsModalOpen } from "@/redux/authSlice";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function BookingPaymentDetails() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogIn] = useState(true);
  const { roomAndGuest, bookingDate, selectedRoom, matchedProperty } =
    useSelector((state) => state.data);
  const { session, status, error } = useSelector((state) => state.auth);

  console.log(session, "sessionsessionsessionsto");
  const [billingData, setBillingData] = useState({
    numberOfDays: 1,
    commission: 0,
    roomPriceWIthGST: 0,
    extraPersonPrice: 0,
    finalRoomPrice: 0,
    totalPrice: 0,
  });

  const calculateBillingData = () => {
    // Calculate number of days
    const startDate = new Date(bookingDate?.startDate);
    const endDate = new Date(bookingDate?.endDate);
    const numberOfDays =
      startDate && endDate
        ? Math.max(Math.ceil((endDate - startDate) / (1000 * 3600 * 24)), 1)
        : 1;

    // Calculate commission
    const roomRate = selectedRoom?.rate || 0;
    const commissionPercentage = matchedProperty?.margin / 100;
    const commission = roomRate
      ? roomRate *
        commissionPercentage *
        (roomAndGuest?.room || 1) *
        numberOfDays
      : 0;

    // Calculate room price with GST

    const gstAmount = (matchedProperty?.GST / 100) * selectedRoom?.rate;
    const roomPriceWIthGST = selectedRoom?.rate + gstAmount;

    // Calculate extra person price
    const extraPersonPrice =
      (roomAndGuest?.extraPerson || 0) * 350 * numberOfDays;

    // Calculate final room price
    const finalRoomPrice = roomPriceWIthGST * numberOfDays;

    // Calculate total price
    const totalPrice = finalRoomPrice + extraPersonPrice + commission;

    // Update billing data
    setBillingData({
      numberOfDays,
      commission,
      roomPriceWIthGST,
      extraPersonPrice,
      finalRoomPrice,
      totalPrice,
    });
  };
  useEffect(() => {
    calculateBillingData();
    // Only call if dependencies change
  }, [
    JSON.stringify(bookingDate),
    JSON.stringify(selectedRoom),
    JSON.stringify(roomAndGuest),
  ]);
  useEffect(() => {
    // Check user session on mount
    dispatch(checkUserSession());

    // Real-time auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      dispatch(checkUserSession());
    });

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [dispatch]);
  const handleBook = () => {
    dispatch(setTotalSummary(billingData));
    if (session?.user?.email || session?.user?.phone) {
      setIsLogIn(true);
    } else {
      setIsLogIn(false);
      alert(" please login first.");
      dispatch(setLoginIsModalOpen(true));
    }

    // Check user session on mount
  };

  return (
    <div className="flex justify-end items-center">
      <div className="bg-white shadow-lg border w-full max-w-md p-5 font-poppins">
        {/* Price Section */}
        <div className="border-b pb-5">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold text-secondary">
              Rs .{Math.round(billingData?.roomPriceWIthGST)}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 line-through"></span>
              <span className="text-red-500 text-sm font-semibold"></span>
            </div>
          </div>
        </div>

        {/* Booking Date Selector */}
        <div className="border-b py-5">
          <div className="flex items-center justify-between">
            <DateSelector />
            <RoomGuestSelector />
          </div>
          <div className="mt-3 text-secondary text-sm font-semibold bg-gray-100 py-3 px-4 rounded-md">
            {selectedRoom?.name}
          </div>
        </div>

        {/* Total Price */}

        <div className="border-b py-5">
          <div className="flex gap-2 py-1">
            <p>Nights</p>
            <p className="text-secondary font-semibold">
              {Math.round(billingData?.numberOfDays)}
            </p>
          </div>
          <div className="flex justify-between py-1">
            <p>Room Price</p>
            <p className="text-secondary font-semibold">
              Rs {Math.round(billingData?.finalRoomPrice)}
            </p>
          </div>
          <div className="flex justify-between py-1">
            <p>Extra Guests: {roomAndGuest?.extraPerson}</p>
            <p className="text-secondary font-semibold">
              Rs {Math.round(billingData?.extraPersonPrice)}
            </p>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <p className="font-semibold text-gray-800">Total Price</p>
            <div className="text-right">
              <p className="text-gray-700 text-sm space-x-4">
                Convenience Fee (All inclusive){" "}
                <span> {Math.round(billingData?.commission)}</span>
              </p>
              <p className="text-secondary font-semibold">
                Rs {Math.round(billingData?.totalPrice)}
              </p>
            </div>
          </div>
        </div>
        {isLogin ? (
          <Link href="/guest-details">
            <button
              onClick={handleBook}
              className="w-full mt-5 bg-primaryGradient text-white text-lg font-semibold py-2 rounded-sm hover:opacity-90 transition"
            >
              Continue to Book
            </button>
          </Link>
        ) : (
          <button
            onClick={handleBook}
            className="w-full mt-5 bg-primaryGradient text-white text-lg font-semibold py-2 rounded-sm hover:opacity-90 transition"
          >
            Continue to Book
          </button>
        )}

        {/* Footer Section */}
        <div className="mt-5 text-gray-600 text-sm space-y-2">
          <p>12 people booked this hotel today</p>
          <p className="text-blue-500 underline cursor-pointer">
            Cancellation Policy
          </p>
          <p className="text-blue-500 underline cursor-pointer">
            Follow safety measures advised at the hotel
          </p>
          <p className="text-gray-500">
            By proceeding, you agree to our{" "}
            <span className="text-blue-500 underline cursor-pointer">
              Guest Policies
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
