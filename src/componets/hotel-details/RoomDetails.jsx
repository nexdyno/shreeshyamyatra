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
  MdPool,
  MdSpa,
  MdTv,
  MdWater,
  MdWifi,
} from "react-icons/md";
import BookingPaymentDetails from "./BookingPaymentDetails";
import PricingUserDetailMobile from "./PricingUserDetailMobile";
import SelectedRoom from "./SelectedRoom";
import { fetchRooms } from "@/redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";

export default function RoomDetails({ property }) {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.data);

  const [showAll, setShowAll] = useState(false);
  const pricingRef = useRef(null);

  console.log("room is call again again");
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
          {/* Hotel Name and Description */}
          <div className="text-start space-y-2">
            <h1 className="text-secondary text-2xl font-semibold">
              {property.name}
            </h1>
            {/* <p className="text-sm text-gray-500">{property.description}</p> */}
          </div>
          {/* Rating */}
          <div className="w-fit bg-green-500 text-white flex gap-2 items-center py-0.5 px-2 rounded-sm">
            <p>4.3</p> {/* Replace with dynamic rating if available */}
            <FaStar className="text-white" />
          </div>
        </div>

        {/* Amenities */}
        <div className="py-10">
          <h1 className="text-2xl font-semibold text-start text-secondary">
            Amenities
          </h1>
          <div className="grid grid-cols-3 gap-5 py-5 items-center">
            {(showAll
              ? property?.facilities
              : property?.facilities?.slice(0, 6)
            )?.map((facility, index) => (
              <div key={index} className="flex gap-2 text-2xl items-center">
                <div className="text-gray-500">
                  {/* Placeholder icons for now */}
                  {facility === "gym" && <IoFitnessOutline />} {/* Gym */}
                  {facility === "wifi" && <MdWifi />} {/* WiFi */}
                  {facility === "spa" && <MdSpa />} {/* Spa */}
                  {facility === "tv" && <MdTv />} {/* TV */}
                  {facility === "swimmingPool" && <MdPool />}{" "}
                  {/* Swimming Pool */}
                </div>
                <p className="text-xs md:text-sm text-gray-500">{facility}</p>
              </div>
            ))}
          </div>
          <button
            onClick={toggleView}
            className="mt-2 text-blue-500 text-base font-semibold tracking-wide underline"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
        <SelectedRoom matchRooms={matchRooms} />
        {/* Reviews Section */}
      </div>

      {/* Right Section */}
      <div className="w-full md:hidden" ref={pricingRef}>
        <PricingUserDetailMobile scrollToPricing={scrollToPricing} />
      </div>

      {/* Booking Details (Desktop) */}
      <div className="w-[40%] h-full hidden lg:block">
        <BookingPaymentDetails matchRooms={matchRooms} />
      </div>
    </div>
  );
}
