"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsTvFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { IoBed, IoFitnessOutline } from "react-icons/io5";
import {
  MdBackupTable,
  MdLocationPin,
  MdPool,
  MdSpa,
  MdTv,
  MdWater,
  MdWifi,
} from "react-icons/md";
import BookingPaymentDetails from "./BookingPaymentDetails";
import PricingUserDetailMobile from "./PricingUserDetailMobile";
import { fetchRooms } from "@/redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import DateSelector from "../home/DateSelector";
import RoomGuestSelector from "../home/RoomGuestSelector";
import { format, parse } from "date-fns";
import Link from "next/link";

export default function RoomDetails({ property }) {
  const dispatch = useDispatch();
  const { rooms, bookingDate, roomAndGuest } = useSelector(
    (state) => state.data
  );
  const formatTime = (time) => {
    const parsedTime = parse(time, "HH:mm:ss", new Date());
    return format(parsedTime, "h a"); // Format as `11 AM` or `10 PM`
  };
  const [showAll, setShowAll] = useState(false);
  const pricingRef = useRef(null);

  console.log(property, "room is call again again");
  const toggleView = () => setShowAll(!showAll);

  const matchRooms = useMemo(
    () => rooms.filter((room) => room.property_id === property.id),
    [rooms, property.id]
  );

  useEffect(() => {
    if (!rooms || rooms.length === 0 || !matchRooms.length) {
      dispatch(fetchRooms());
    }
  }, [JSON.stringify(rooms), matchRooms.length, dispatch]);

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-full w-full font-poppins flex flex-col lg:flex-row gap-10 pb-20 lg:pb-0 lg:px-0">
      {/* Left Section */}
      <div className="w-full lg:w-[60%] h-full lg:px-5 overflow-y-auto px-5 ">
        <div className="flex flex-col gap-4 items-start lg:flex-row lg:items-center justify-between">
          <div className="text-start space-y-2">
            <h1 className="text-black text-2xl font-semibold">
              {property.name}
            </h1>
            <div className="flex gap-2 items-center">
              <div>
                <MdLocationPin className="text-primary" />
              </div>
              <p className="text-sm text-black py-2">{property.address}</p>
            </div>

            <div className=" flex items-center gap-4 font-semibold text-sm w-fit -ml-2  rounded-md">
              <DateSelector type="no-border" />
            </div>
            <div className=" flex items-center gap-1 font-semibold text-sm w-fit -ml-2 rounded-md">
              <RoomGuestSelector />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-center flex items-center gap-4">
                <p className="text-gray-800 text-sm">Check-In : </p>
                <p className="text-sm font-medium text-gray-800">
                  {formatTime(property?.check_in_time)}
                </p>
              </div>
              <div className="text-center flex items-center gap-4">
                <p className="text-gray-800 text-sm">Check-Out : </p>
                <p className="text-sm font-medium text-gray-800">
                  {formatTime(property?.check_out_time)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="py-10">
          <h1 className="text-lg lg:text-2xl font-semibold text-start text-black">
            Amenities
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 py-5 items-center ">
            {(showAll
              ? property?.facilities
              : property?.facilities?.slice(0, 6)
            )?.map((facility, index) => (
              <div key={index} className="flex gap-2 text-2xl items-center">
                <div className="text-black">
                  {/* Placeholder icons for now */}
                  {facility === "parking" && <IoFitnessOutline />} {/* Gym */}
                  {facility === "cctv" && <MdWifi />} {/* WiFi */}
                  {facility === "spa" && <MdSpa />} {/* Spa */}
                  {facility === "tv" && <MdTv />} {/* TV */}
                  {facility === "swimmingPool" && <MdPool />}{" "}
                  {/* Swimming Pool */}
                </div>
                <p className="text-sm text-black">{facility}</p>
              </div>
            ))}
          </div>
          <button
            onClick={toggleView}
            className="mt-2 text-black text-base font-semibold tracking-wide underline"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
        {/* <SelectedRoom matchRooms={matchRooms} /> */}
        {/* Reviews Section */}
      </div>
      <div className="lg:hidden fixed bottom-0 bg-white w-full shadow-md py-2 px-3 border-t border-b border-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-primary">Rs 1000</span>
        </div>
        <Link href="/hotel/hotel-details/rooms">
          <button className="border border-blue-500 text-white bg-primaryGradient rounded-full px-4 py-2 hover:bg-blue-100 transition">
            Select rooms
          </button>
        </Link>
      </div>

      {/* Right Section */}
      {/* <div className="w-full md:hidden" ref={pricingRef}>
        <PricingUserDetailMobile scrollToPricing={scrollToPricing} />
      </div> */}

      {/* Booking Details (Desktop) */}
      <div className="w-[40%] h-full hidden lg:block">
        <BookingPaymentDetails matchRooms={matchRooms} />
      </div>
    </div>
  );
}
