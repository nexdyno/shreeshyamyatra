"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DateSelector from "../home/DateSelector";
import RoomGuestSelector from "../home/RoomGuestSelector";
import { useDispatch, useSelector } from "react-redux";
import { bookingCreate, setTotalSummary } from "@/redux/dataSlice";
import toast from "react-hot-toast";
import { checkUserSession, setLoginIsModalOpen } from "@/redux/authSlice";
import { supabase } from "@/lib/supabase/supabaseClient";
import { format, parse } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import LoginModal from "@/container/login/LoginModal";
import Loader from "../common/Loader";

export default function BookingPaymentDetails() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [guestData, setGuestData] = useState(null);
  const {
    roomAndGuest,
    bookingDate,
    selectedRoom,
    matchedProperty,
    totalSummary,
  } = useSelector((state) => state.data);
  const { session, status, error } = useSelector((state) => state.auth);
  const [roomTag, setRoomTag] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

    // Calculate extra person price
    const extraPersonPrice =
      (roomAndGuest?.guestExtra || 0) *
      selectedRoom?.extra_charge_per_adult *
      numberOfDays;

    // Calculate commission
    const roomRate = selectedRoom?.rate || 0;
    const roomRateWithExtraPerson = roomRate + extraPersonPrice || 0;
    const commissionPercentage = matchedProperty?.margin / 100;
    const commission = roomRate
      ? roomRateWithExtraPerson *
        commissionPercentage *
        (roomAndGuest?.room || 1) *
        numberOfDays
      : 0;

    // Calculate room price with GST

    const gstAmount = (matchedProperty?.gst / 100) * selectedRoom?.rate;
    const roomPriceWIthGST = selectedRoom?.rate + gstAmount;

    // Calculate final room price
    const finalRoomPrice = roomPriceWIthGST * numberOfDays * roomAndGuest?.room;

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
    roomAndGuest?.guestExtra,
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

  const [formattedDates, setFormattedDates] = useState({
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    if (selectedRoom && roomAndGuest) {
      const { room_book } = generateUniqueIds();

      setRoomTag({
        id: room_book,
        rate: selectedRoom?.rate,
        room_id: selectedRoom?.id,
        quantity: roomAndGuest?.room,
        room_name: selectedRoom?.name,
        special_requirements: null,
      });
    }
  }, [selectedRoom, roomAndGuest]);

  useEffect(() => {
    if (bookingDate?.startDate && bookingDate?.endDate) {
      const formatDate = (dateString) => {
        const parsedDate = parse(dateString, "MMM d, yyyy", new Date());
        if (parsedDate) {
          return format(parsedDate, "yyyy-MM-dd");
        } else {
          console.error(`Invalid date format: ${dateString}`);
          return "";
        }
      };

      setFormattedDates({
        startDate: formatDate(bookingDate?.startDate),
        endDate: formatDate(bookingDate?.endDate),
      });
    }
  }, [JSON.stringify(bookingDate)]);

  const generateUniqueIds = () => {
    return {
      id: uuidv4(),
      booking_id: uuidv4(),
      room_book: uuidv4(),
    };
  };
  // const generateUniqueIds = () => {
  //   const id = uuidv4();
  //   const bookingIdSmall = uuidv4().substring(0, 8); // Shortened booking ID from UUID
  //   const createdAt = new Date(); // Current date and time    const booking_id = getBookingId(bookingIdSmall);
  //   const booking_id = getBookingId(createdAt, bookingIdSmall); // Generate booking ID with current year
  //   const room_book = uuidv4();

  //   return {
  //     id,
  //     booking_id,
  //     room_book,
  //   };
  // };

  // const getBookingId = (createdAt, bookingIdSmall) => {
  //   return `SSY${createdAt.getFullYear()}${bookingIdSmall}`;
  // };

  const prepareGuestData = (formData) => {
    const { id, booking_id } = generateUniqueIds();
    localStorage.setItem("my_id", booking_id);
    const checkIsManual = matchedProperty?.is_auto ? true : false;

    return {
      id,
      property_id: selectedRoom?.property_id,
      profile_id: session?.user?.id,
      name: session?.user_metadata?.name || "",
      contact: session?.user?.phone || "",
      email: session?.user?.email || "",
      check_in_date: formattedDates.startDate,
      check_out_date: formattedDates.endDate,
      guest_check_in_time: matchedProperty?.check_in_time,
      guest_check_out_time: matchedProperty?.check_out_time,
      number_of_children: 0,
      number_of_adults: roomAndGuest?.guest,
      room_assigned: [roomTag],
      bill_clear: false,
      created_at: new Date(),
      updated_at: new Date(),
      booking_id,
      booking_status: "processing",
      payments: [],
      paid_to_status: "unPaidFromGuest",
      is_manual_entry: checkIsManual,
      total_amount: billingData?.totalPrice,
      extra_guest: {
        extraPerson: roomAndGuest?.guestExtra,
        extraPrice: billingData?.extraPersonPrice,
      },
      our_charges: billingData?.commission,
      total_roomPrice: billingData?.finalRoomPrice,
    };
  };

  const bookingProcess = async () => {
    try {
      setIsLoading(true);
      await dispatch(bookingCreate(guestData)).unwrap();
      setIsLoading(false);
      window.location.href = "/guest-details";
    } catch (error) {
      toast.error(
        error.message ||
          "An error occurred while booking process. Please try again."
      );
    }
  };

  const handleBook = () => {
    dispatch(setTotalSummary(billingData));
    if (session?.user?.email || session?.user?.phone) {
      const data = prepareGuestData();
      setIsLogIn(true);
      setGuestData(data); // This will trigger the useEffect
    } else {
      setIsLogIn(false);
      // dispatch(setLoginIsModalOpen(true));
      setShowLogin(true);
    }
  };
  useEffect(() => {
    if (guestData) {
      bookingProcess();
    }
  }, [guestData]);

  return (
    <>
      <div className="w-full h-full flex justify-end items-center">
        {selectedRoom ? (
          <div className="bg-white shadow-lg border w-full max-w-md p-5 font-poppins">
            {/* Price Section */}
            <div className="border-b pb-5">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold text-secondary">
                  Rs.{" "}
                  {isNaN(billingData?.roomPriceWIthGST) ||
                  !billingData?.roomPriceWIthGST
                    ? 0
                    : Math.round(billingData.roomPriceWIthGST)}
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
                {selectedRoom?.name || "Select Room"}
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
                <p>Extra Guests: {roomAndGuest?.guestExtra}</p>
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
            {/* {isLogin ? ( */}
            <button
              onClick={handleBook}
              className="w-full mt-5 bg-primaryGradient text-white text-lg font-semibold py-2 rounded-sm hover:opacity-90 transition"
            >
              {isLoading ? <Loader /> : "Continue to Book"}
            </button>
            {/* ) : ( */}
            {/* <button
              onClick={handleBook}
              className="w-full mt-5 bg-primaryGradient text-white text-lg font-semibold py-2 rounded-sm hover:opacity-90 transition"
            >
              Continue to Book
            </button> */}
            {/* )} */}

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
        ) : (
          ""
        )}
      </div>
      {showLogin ? (
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      ) : (
        ""
      )}
    </>
  );
}
