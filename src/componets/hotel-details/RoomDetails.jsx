"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsTvFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { IoBed } from "react-icons/io5";
import { MdBackupTable, MdWater, MdWifi } from "react-icons/md";
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

  const toggleView = () => setShowAll(!showAll);

  const matchRooms = useMemo(
    () => rooms.filter((room) => room.property_id === property.id),
    [rooms, property.id]
  );

  useEffect(() => {
    if (!rooms || rooms.length === 0 || rooms[0].property_id !== property.id) {
      dispatch(fetchRooms());
    }
  }, []);

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
            <p className="text-sm text-gray-500">{property.description}</p>
          </div>
          {/* Rating */}
          <div className="w-fit bg-green-500 text-white flex gap-2 items-center py-0.5 px-2 rounded-sm">
            <p>4.3</p> {/* Replace with dynamic rating if available */}
            <FaStar className="text-white" />
          </div>
        </div>

        {/* Room Types */}
        <div className="pt-5 lg:pt-10 flex items-start lg:items-center gap-5 md:gap-10">
          <h1 className="text-lg md:text-xl font-semibold text-start text-secondary text-nowrap">
            Rooms Type
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            {/* Replace these buttons with dynamic room types if available */}
            <button className="text-black border border-black text-sm md:text-base rounded-full bg-transparent py-0.5 md:py-1 px-3 lg:px-4 hover:bg-black hover:text-white">
              Basic
            </button>
            <button className="text-green-600 border border-green-600 text-sm md:text-base rounded-full bg-transparent py-0.5 md:py-1 px-3 lg:px-4 hover:bg-green-600 hover:text-white">
              Classic
            </button>
            <button className="text-primary border border-primary text-sm md:text-base rounded-full bg-transparent py-0.5 md:py-1 px-3 lg:px-4 hover:bg-primary hover:text-white">
              Premium
            </button>
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
                  {facility === "gym" && <IoBed />}
                  {facility === "wifi" && <MdWifi />}
                  {facility === "spa" && <MdWater />}
                  {facility === "tv" && <BsTvFill />}
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
        <div className="w-full h-full py-3">
          <h1 className="text-2xl font-semibold text-start text-secondary mb-4">
            Rating And Reviews
          </h1>
          <div className="flex flex-col gap-4">
            {/* Example Review */}
            <div className="flex items-center gap-2">
              <IoIosPerson className="text-gray-500" size={25} />
              <div className="flex gap-1 items-center">
                <span className="text-lg text-gray-500">Bharti Mishra</span>
                <span className="text-secondary text-xs">(20 Nov 2024)</span>
              </div>
            </div>
            <p className="text-sm text-secondary w-[80%] text-start leading-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:hidden" ref={pricingRef}>
        <PricingUserDetailMobile scrollToPricing={scrollToPricing} />
      </div>

      {/* Fixed Pricing Bar (Mobile) */}
      {/*       
      <div className="lg:hidden fixed bottom-14 bg-white w-full shadow-md py-2 px-3 border border-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-primary">$1,200</span>
          <span className="line-through text-gray-400">$1,500</span>
          <span className="text-orange-500 font-medium text-lg">20% OFF</span>
        </div>
        <button
          onClick={scrollToPricing}
          className="border border-blue-500 text-white bg-primaryGradient rounded-sm px-4 py-2 hover:bg-blue-100 transition"
        >
          Book Now
        </button>
      </div> */}

      {/* Booking Details (Desktop) */}
      <div className="w-[40%] h-full hidden lg:block">
        <BookingPaymentDetails matchRooms={matchRooms} />
      </div>
    </div>
  );
}
