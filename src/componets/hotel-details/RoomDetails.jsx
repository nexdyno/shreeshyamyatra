"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import PricingUserDetailMobile from "./PricingUserDetailMobile";
import { fetchRooms } from "@/redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import DateSelector from "../home/DateSelector";
import RoomGuestSelector from "../home/RoomGuestSelector";
import { format, parse } from "date-fns";
import Link from "next/link";
import Amenities from "../common/Amenities";
import PropertyRules from "../common/PropertyRules";
import { MdLocationPin } from "react-icons/md";
import { calculateBillingData } from "@/lib/helperFunctions/calculationHelper";
import BookingPaymentDetails from "./BookingPaymentDetails";
import PropertryRooms from "./PropertryRooms";

export default function RoomDetails({ property, propertyWiseImages }) {
  const propertyRules = [
    {
      heading: "Cancellation Policy",
      description:
        "Cancellations made up to 48 hours before check-in are free of charge. For cancellations within 48 hours, 50% of the booking amount will be charged. No refunds are provided for same-day cancellations or no-shows.",
    },
    {
      heading: "Occupancy",
      description:
        "Each room accommodates a maximum of 2 adults and 2 children under 12 years. Additional guests will be charged $20 per person per night.",
    },
    {
      heading: "Pets",
      description:
        "Pets are not allowed on the property, except for service animals. Guests traveling with service animals must notify the property in advance.",
    },
    {
      heading: "Smoking",
      description:
        "Smoking is strictly prohibited indoors. A $200 cleaning fee will be charged if smoking occurs inside the property.",
    },
    {
      heading: "Noise Policy",
      description:
        "Quiet hours are from 10:00 PM to 7:00 AM. Parties and loud music are not permitted.",
    },
    {
      heading: "Damage Policy",
      description:
        "Guests are responsible for any damages caused to the property during their stay. A refundable security deposit of $100 is required at check-in.",
    },
    {
      heading: "Parking",
      description:
        "One parking spot is included per reservation. Additional vehicles may incur a $10 daily fee.",
    },
    {
      heading: "Amenities Usage",
      description:
        "The pool, gym, and other amenities are available from 7:00 AM to 9:00 PM. Guests are required to follow the posted rules for these areas.",
    },
    {
      heading: "ID and Payment",
      description:
        "Guests must present a valid government-issued photo ID at check-in. Full payment is required at the time of booking.",
    },
    {
      heading: "Housekeeping",
      description:
        "Daily housekeeping is included. Additional cleaning services can be requested for a fee.",
    },
    {
      heading: "Prohibited Activities",
      description:
        "Illegal activities, including drug use, are strictly prohibited. Firearms and hazardous materials are not allowed on the property.",
    },
    {
      heading: "Children",
      description:
        "Children must be supervised by an adult at all times. Cribs and highchairs are available upon request.",
    },
    {
      heading: "Internet Usage",
      description:
        "Complimentary Wi-Fi is available throughout the property. Guests are expected to use the internet responsibly and refrain from illegal downloads.",
    },
    {
      heading: "Accessibility",
      description:
        "The property is wheelchair accessible. Guests with special needs are encouraged to inform the property in advance for necessary arrangements.",
    },
  ];

  const [PriceValues, setPriceValues] = useState(null);
  const dispatch = useDispatch();
  const { rooms, roomAndGuest, bookingDate, selectedRoom, matchedProperty } =
    useSelector((state) => state.data);
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

  // useEffect(() => {
  //   const fetchBillingData = async () => {
  //     if (roomAndGuest && bookingDate && selectedRoom && matchedProperty) {
  //       try {
  //         // Call the helper function and await its result
  //         const values = await calculateBillingData(
  //           roomAndGuest,
  //           bookingDate,
  //           selectedRoom,
  //           matchedProperty
  //         );
  //         setPriceValues(values);
  //       } catch (error) {
  //         console.error("Error calculating billing data:", error);
  //       }
  //     }
  //   };

  //   fetchBillingData(); // Call the async function
  // }, [
  //   JSON.stringify(bookingDate),
  //   JSON.stringify(selectedRoom),
  //   JSON.stringify(roomAndGuest),
  // ]);

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
        <div className="pt-4">
          <Amenities amenities={property?.facilities} />
          <PropertyRules Rules={propertyRules} />
        </div>
        <div className="hidden lg:block">
          <PropertryRooms
            matchRooms={matchRooms}
            propertyWiseImages={propertyWiseImages}
          />
        </div>
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
      <div className="w-[40%] h-full  hidden lg:block ">
        <BookingPaymentDetails matchRooms={matchRooms} />
      </div>
    </div>
  );
}
