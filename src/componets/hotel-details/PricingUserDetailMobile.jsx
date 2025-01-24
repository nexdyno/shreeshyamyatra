"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { bookingCreate, setTotalSummary } from "@/redux/dataSlice";
import Link from "next/link";
import { checkUserSession, setLoginIsModalOpen } from "@/redux/authSlice";
import { supabase } from "@/lib/supabase/supabaseClient";
import { format, parse } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import LoginModal from "@/container/login/LoginModal";

export default function PricingUserDetailMobile() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogIn] = useState(false);
  const [guestData, setGuestData] = useState(null);
  const {
    roomAndGuest,
    bookingDate,
    selectedRoom,
    matchedProperty,
    totalSummary,
  } = useSelector((state) => state.data);
  const { session, isLoginModalOpen, status, error } = useSelector(
    (state) => state.auth
  );
  const [roomTag, setRoomTag] = useState(null);

  const [billingData, setBillingData] = useState({
    numberOfDays: 1,
    commission: 0,
    roomPriceWIthGST: 0,
    extraPersonPrice: 0,
    finalRoomPrice: 0,
    totalPrice: 0,
  });

  const calculateBillingData = () => {
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

    const gstAmount = (matchedProperty?.gst / 100) * selectedRoom?.rate;
    const roomPriceWIthGST = selectedRoom?.rate + gstAmount;

    // Calculate extra person price
    const extraPersonPrice =
      (roomAndGuest?.extraPerson || 0) * 350 * numberOfDays;

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
  ]);

  useEffect(() => {
    dispatch(checkUserSession());

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
  }, [JSON.stringify(selectedRoom), JSON.stringify(roomAndGuest)]);

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

  const prepareGuestData = (formData) => {
    const { id, booking_id } = generateUniqueIds();
    localStorage.setItem("my_id", booking_id);
    const checkIsManual = matchedProperty?.is_auto ? false : true;

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
        extraPerson: roomAndGuest?.extraPerson,
        extraPrice: billingData?.extraPersonPrice,
      },
      our_charges: billingData?.commission,
      total_roomPrice: billingData?.finalRoomPrice,
    };
  };

  const bookingProcess = async () => {
    try {
      await dispatch(bookingCreate(guestData)).unwrap();
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
      dispatch(setLoginIsModalOpen(true));
    }
  };
  useEffect(() => {
    if (guestData) {
      bookingProcess();
    }
  }, [guestData]);

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Pricing Details Section */}
        <div>
          <p className="font-semibold text-lg text-black mb-4">
            Room name And Price
          </p>
          <div className="flex items-center justify-between text-secondary text-base font-semibold bg-gray-100 py-3 px-4 rounded-md">
            <p className=" text-secondary">
              Rs.{" "}
              {isNaN(billingData?.roomPriceWIthGST) ||
              !billingData?.roomPriceWIthGST
                ? 0
                : Math.round(billingData.roomPriceWIthGST)}
            </p>{" "}
            <p> {selectedRoom?.name}</p>
          </div>

          <div className=" py-5">
            <h2 className="text-lg font-semibold mb-2">Pricing details</h2>

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
            <div className="flex justify-between py-1">
              <p> Convenience Fee </p>
              <p className="text-secondary font-semibold">
                Rs {Math.round(billingData?.commission)}
              </p>
            </div>
            <hr />
            <div className="flex justify-between py-1 font-semibold text-lg">
              <p>Total Price</p>
              <p>Rs {Math.round(billingData?.totalPrice)}</p>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-14 bg-white w-full shadow-md py-2 px-3 border border-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-primary">
            Rs {Math.round(billingData?.totalPrice)}
          </span>
        </div>
        {/* <Link href="/guest-details"> */}
        <button
          onClick={handleBook}
          className="border border-blue-500 text-white bg-primaryGradient rounded-sm px-4 py-2 hover:bg-blue-100 transition"
        >
          Continue to Book
        </button>
        {/* </Link> */}
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => dispatch(setLoginIsModalOpen(false))}
      />
    </>
  );
}
