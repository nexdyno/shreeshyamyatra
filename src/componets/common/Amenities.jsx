"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaDesktop,
  FaPumpSoap,
  FaShower,
  FaShuttleVan,
  FaWifi,
} from "react-icons/fa";
import { IoIosBed, IoIosRestaurant } from "react-icons/io";
import {
  MdBalcony,
  MdCancelScheduleSend,
  MdLiveTv,
  MdLocalLaundryService,
  MdOutlineBathroom,
  MdOutlineCoffeeMaker,
  MdOutlineGrass,
  MdSingleBed,
  MdTempleHindu,
} from "react-icons/md";
import { LuCctv, LuCircleParking } from "react-icons/lu";
import { BiFridge, BiSolidHot } from "react-icons/bi";
import {
  TbClothesRack,
  TbIroning,
  TbMicrowave,
  TbPhotoSpark,
  TbPicnicTable,
} from "react-icons/tb";
import { RiChargingPile2Fill, RiSofaLine } from "react-icons/ri";
import { PiBathtub, PiSolarRoof, PiToiletLight } from "react-icons/pi";
import {
  GiElevator,
  GiKitchenScale,
  GiLift,
  GiSlippers,
  GiTheaterCurtains,
} from "react-icons/gi";
import { IoFastFood, IoTvOutline, IoWaterSharp } from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { SiDovecot, SiSpringsecurity } from "react-icons/si";
import { FaBottleWater, FaMattressPillow } from "react-icons/fa6";
import { GrLounge } from "react-icons/gr";
import { CiDeliveryTruck } from "react-icons/ci";

const Amenities = ({ amenities }) => {
  // Define default visibility for amenities
  const [showAll, setShowAll] = useState(false);
  const popupRef = useRef(null);

  const visibleAmenities = amenities.slice(0, 4);
  const hiddenAmenities = amenities.slice(4);

  const handleami = (e) => {
    e.stopPropagation();
    setShowAll(true);
  };
  // Icons mapping based on amenities
  const icons = {
    cctv: <LuCctv />,
    wifi: <FaWifi />,
    doubleBed: <IoIosBed />,
    singleBed: <MdSingleBed />,
    shower: <FaShower />,
    parking: <LuCircleParking />,
    tv: <MdLiveTv />,
    fridge: <BiFridge />,
    microwave: <TbMicrowave />,
    restaurant: <IoIosRestaurant />,
    geyser: <BiSolidHot />,
    iron: <TbIroning />,
    coffeeMaker: <MdOutlineCoffeeMaker />,
    desk: <FaDesktop />,
    sofa: <RiSofaLine />,
    bathtub: <PiBathtub />,
    workTable: <TbPicnicTable />,
    slippers: <GiSlippers />,
    toiletries: <FaPumpSoap />,
    freeWater: <IoWaterSharp />,
    balcony: <MdBalcony />,
    kitchen: <GiKitchenScale />,
    safe: <AiFillSafetyCertificate />,
    cot: <SiDovecot />,
    clothesRack: <TbClothesRack />,
    curtains: <GiTheaterCurtains />,
    chargingPoints: <RiChargingPile2Fill />,
    attachBathroom: <MdOutlineBathroom />,
    hotWater: <BiSolidHot />,
    drinkingWater: <FaBottleWater />,
    lcdTv: <IoTvOutline />,
    lift: <GiLift />,
    attachedToilet: <PiToiletLight />,
    cancellationAvailable: <MdCancelScheduleSend />,
    extraMattressAvailable: <FaMattressPillow />,
    wifi: <FaWifi />,
    elevator: <GiElevator />,
    security: <SiSpringsecurity />,
    laundryService: <MdLocalLaundryService />,
    shuttleService: <FaShuttleVan />,
    garden: <TbPhotoSpark />,
    terrace: <PiSolarRoof />,
    temple: <MdTempleHindu />,
    lounge: <GrLounge />,
    groceryDelivery: <CiDeliveryTruck />,
    food: <IoFastFood />,
    lawn: <MdOutlineGrass />,
  };

  // const icons = {
  //   wifi: "📶",
  //   doubleBed: "🛏️",
  //   singleBed: "🛋️",
  //   shower: "🚿",
  //   parking: "🅿️",
  //   tv: "📺",
  //   fridge: "🧊",
  //   microwave: "🍴",
  //   restaurant: "🍽️",
  //   geyser: "🔥",
  //   iron: "🧼",
  //   coffeeMaker: "☕",
  //   desk: "💻",
  //   sofa: "🛋️",
  //   bathtub: "🛁",
  //   workTable: "📝",
  //   slippers: "🥿",
  //   toiletries: "🧴",
  //   freeWater: "💧",
  //   balcony: "🌅",
  //   kitchen: "🍳",
  //   safe: "🔒",
  //   cot: "🛌",
  //   clothesRack: "👕",
  //   curtains: "🪟",
  //   chargingPoints: "🔌",
  //   attachBathroom: "🚽",
  //   hotWater: "💦",
  //   drinkingWater: "🥤",
  //   lcdTv: "📺",
  //   lift: "⬆️",
  //   attachedToilet: "🚻",
  //   cancellationAvailable: "❌",
  //   extraMattressAvailable: "🛏️",
  //   elevator: "🏢",
  //   security: "🛡️",
  //   laundryService: "🧺",
  //   shuttleService: "🚌",
  //   garden: "🌳",
  //   terrace: "🏞️",
  //   temple: "⛩️",
  //   lounge: "🛋️",
  //   groceryDelivery: "🚚",
  //   food: "🍔",
  //   lawn: "🌱",
  // };

  // Divide amenities into visible and hidden
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowAll(false);
      }
    };

    if (showAll) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAll]);

  return (
    <div className="" onClick={() => setShowAll(false)}>
      <h3 className="text-base font-semibold mb-2">Amenities</h3>
      <div className=" lg:hidden grid grid-cols-2 space-y-1">
        {visibleAmenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2 text-nowrap">
            <span className="mr-2">{icons[amenity] || "-"}</span>
            <span className="text-sm">
              {amenity
                .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
                .toLowerCase() // Convert the entire string to lowercase
                .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
              {/* Capitalize first letter of each word */}
            </span>{" "}
          </div>
        ))}
      </div>
      <div className="hidden lg:grid grid-cols-2 space-y-1">
        {(showAll ? amenities : visibleAmenities).map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2 text-nowrap">
            <span className="mr-2">{icons[amenity] || "-"}</span>
            <span className="text-sm">
              {amenity
                .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
                .toLowerCase() // Convert the entire string to lowercase
                .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
              {/* Capitalize first letter of each word */}
            </span>{" "}
          </div>
        ))}
      </div>
      <div
        ref={popupRef}
        className={` lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg rounded-t-lg py-4 px-4 z-[99] border transform transition-transform duration-300 max-h-[60vh] overflow-y-auto ${
          showAll ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4 border-b pb-2 ">
          <p className="text-base font-semibold text-black">Amenities</p>
          <button
            className="text-gray-500 hover:text-gray-700 transition duration-200"
            onClick={() => setShowAll(false)}
            aria-label="Close Popup"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4 ">
          {hiddenAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="mr-2 text-base font-semibold">
                {icons[amenity] || ""}
              </span>
              <span className="text-sm font-semibold">
                {amenity
                  .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
                  .toLowerCase() // Convert the entire string to lowercase
                  .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
              </span>
            </div>
          ))}
        </div>
      </div>
      {amenities?.length > 4 && (
        <button
          onClick={handleami}
          className="mt-2 py-2 text-sm text-black underline rounded-md transition duration-300 font-semibold"
        >
          {showAll ? "Show Less Amenities" : "View More Amenities"}
        </button>
      )}
    </div>
  );
};

export default Amenities;
