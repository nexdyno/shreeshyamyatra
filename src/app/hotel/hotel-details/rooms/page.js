"use client";

import InsideNavabr from "@/componets/common/InsideNavabr";
import PropertryRooms from "@/componets/hotel-details/PropertryRooms";
import SubNavbarMobile from "@/componets/hotel/SubNavbarMobile";
import LoginModal from "@/container/login/LoginModal";
import { supabase } from "@/lib/supabase/supabaseClient";
import { checkUserSession, setLoginIsModalOpen } from "@/redux/authSlice";
import {
  bookingCreate,
  fetchImages,
  fetchProperty,
  fetchRooms,
  setIsSearchOpen,
  setMatchedProperty,
  setTotalSummary,
} from "@/redux/dataSlice";
import { format, parse } from "date-fns";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { notFound } from "next/navigation";

export default function Page() {
  const dispatch = useDispatch();
  const [localMatchedProperty, setLocalMatchedProperty] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const { rooms, property, error, IsSearchOpen, allImages } = useSelector(
    (state) => state.data
  );

  const stableProperty = useMemo(() => property || [], [property]);

  useEffect(() => {
    // Get the matched property ID from local storage
    const match = JSON.parse(localStorage.getItem("matchedProperty"));
    if (match && match.id) {
      setLocalMatchedProperty(match.id);
    }

    // Fetch data if necessary
    if (!rooms || rooms.length === 0 || !property || property.length === 0) {
      dispatch(fetchRooms());
      dispatch(fetchProperty());
      dispatch(fetchImages());
    }
  }, [rooms, property, localMatchedProperty, dispatch]);

  const propertyWiseImages = allImages?.filter(
    (image) => image.property_id === localMatchedProperty
  );
  useEffect(() => {
    if (stableProperty.length > 0) {
      const foundProperty = stableProperty.find(
        (item) => item.id === localMatchedProperty
      );
      dispatch(setMatchedProperty(foundProperty || null));
    }
  }, [stableProperty, localMatchedProperty, dispatch]);

  const matchRooms = useMemo(
    () => rooms.filter((room) => room?.property_id === localMatchedProperty),
    [rooms, localMatchedProperty, propertyWiseImages]
  );

  const [isLogin, setIsLogIn] = useState(false);
  const [guestData, setGuestData] = useState(null);
  const {
    roomAndGuest,
    bookingDate,
    selectedRoom,
    matchedProperty,
    totalSummary,
  } = useSelector((state) => state.data);
  const { session, isLoginModalOpen, status } = useSelector(
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
    const extraPersonPrice =
      (roomAndGuest?.guestExtra || 0) *
      selectedRoom?.extra_charge_per_adult *
      numberOfDays;

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

    // Calculate extra person price

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
      setIsRedirect(false);
    } catch (error) {
      toast.error(
        error.message ||
          "An error occurred while booking process. Please try again."
      );
    }
  };

  const handleBook = () => {
    setIsRedirect(true);
    dispatch(setTotalSummary(billingData));
    if (session?.user?.email || session?.user?.phone) {
      const data = prepareGuestData();
      setIsLogIn(true);
      setGuestData(data);
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

  const [isMobile, setIsMobile] = useState(false);
  const [checked, setChecked] = useState(false); // To ensure no flickering on initial load

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen size is less than 1024px (Tailwind's lg breakpoint)
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Initial screen size check
    setChecked(true); // Mark that the check has been performed
    window.addEventListener("resize", handleResize); // Add listener for resizing

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  useEffect(() => {
    if (checked && !isMobile) {
      // If the screen size is too large, trigger the 404 page
      notFound();
    }
  }, [checked, isMobile]);

  if (!checked || !isMobile) {
    return null; // Avoid rendering while checking screen size
  }
  return (
    <div className="w-full mt-32 lg:mt-0">
      <div
        className={`fixed md:hidden top-0 pt-3 left-0 w-full z-50 bg-white transition-transform duration-500 ease-in-out`}
      >
        <InsideNavabr />
        {IsSearchOpen ? (
          <SubNavbarMobile
            IsSearchOpen={IsSearchOpen}
            onClose={() => dispatch(setIsSearchOpen(false))}
          />
        ) : null}
      </div>
      <PropertryRooms
        matchRooms={matchRooms}
        propertyWiseImages={propertyWiseImages}
      />
      <div className="lg:hidden fixed bottom-0 bg-white w-full shadow-md py-2 px-3 border-t border-b border-gray-300 flex items-center justify-between">
        {/* <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-primary">
            Rs. {billingData?.totalPrice}
          </p>
         
        </div> */}
        <div className="flex flex-col items-start py-2 font-poppins text-black">
          {/* Individual Price Details */}
          <div className="text-xs">
            <p>
              Room Price (incl. GST): Rs. {billingData?.finalRoomPrice || 0}
            </p>
            {/* Show only if extraPersonPrice > 0 */}
            {billingData?.extraPersonPrice > 0 && (
              <p>Extra Person Price: Rs. {billingData.extraPersonPrice}</p>
            )}
            {/* Show only if commission > 0 */}
            {billingData?.commission > 0 && (
              <p>Convenience Fee: Rs. {billingData.commission}</p>
            )}
          </div>

          {/* Total Price */}
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-black">
              Total: Rs. {billingData?.totalPrice || 0}
            </p>
          </div>
        </div>

        <button
          onClick={handleBook}
          disabled={isRedirect}
          className={`border border-blue-500 text-white bg-primaryGradient rounded-full px-4 py-2 hover:bg-blue-100
             transition ${
               isRedirect
                 ? "opacity-50 cursor-not-allowed"
                 : "hover:bg-gray-800 hover:text-white"
             }`}
        >
          Proceed
        </button>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => dispatch(setLoginIsModalOpen(false))}
      />
    </div>
  );
}
