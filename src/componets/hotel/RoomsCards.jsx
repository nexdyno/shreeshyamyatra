"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

// Import required Swiper modules
import { Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { IoWifiOutline } from "react-icons/io5";
import Link from "next/link";
import { setOneRoom } from "@/redux/dataSlice";
import { useDispatch } from "react-redux";

export default function RoomsCards({ data }) {
  const [activeImage, setActiveImage] = useState(0);
  const swiperRef = useRef(null); // To access Swiper instance

  // const data = [
  //   {
  //     id: 1,
  //     image: [
  //       "/assets/home/image.svg",
  //       "/assets/home/image1.svg",
  //       "/assets/home/image2.svg",
  //       "/assets/home/image1.svg",
  //       "/assets/home/image.svg",
  //     ],
  //     title: "Hotel O Sector 19 Dwarka",
  //     description:
  //       "Near Satya Public School, Qutub Vihar, Phase-1, Near Sec-19, Dwarka",
  //     price: 989,
  //     ratings: 3.9,
  //     ratingCount: 38,
  //   },
  //   {
  //     id: 2,
  //     image: [
  //       "/assets/home/image.svg",
  //       "/assets/home/image1.svg",
  //       "/assets/home/image2.svg",
  //       "/assets/home/image1.svg",
  //       "/assets/home/image.svg",
  //     ],
  //     title: "Hotel A Sector 5 Dwarka",
  //     description: "Near Sector 5, Dwarka, Close to Metro Station",
  //     price: 1150,
  //     ratings: 4.2,
  //     ratingCount: 45,
  //   },
  //   {
  //     id: 3,
  //     image: [
  //       "/assets/home/image.svg",
  //       "/assets/home/image1.svg",
  //       "/assets/home/image2.svg",
  //       "/assets/home/image1.svg",
  //       "/assets/home/image.svg",
  //     ],
  //     title: "Hotel B Sector 10 Dwarka",
  //     description: "Near Sector 10, Dwarka, Main Road",
  //     price: 899,
  //     ratings: 3.7,
  //     ratingCount: 28,
  //   },
  //   {
  //     id: 4,
  //     image: [
  //       "/assets/home/image.svg",
  //       "/assets/home/image1.svg",
  //       "/assets/home/image2.svg",
  //       "/assets/home/image1.svg",
  //       "/assets/home/image.svg",
  //     ],
  //     title: "Hotel C Sector 12 Dwarka",
  //     description: "Sector 12, Dwarka, Walking Distance to Park",
  //     price: 1200,
  //     ratings: 4.0,
  //     ratingCount: 32,
  //   },
  //   {
  //     id: 5,
  //     image: [
  //       "/assets/home/image.svg",
  //       "/assets/home/image1.svg",
  //       "/assets/home/image2.svg",
  //       "/assets/home/image1.svg",
  //       "/assets/home/image.svg",
  //     ],
  //     title: "Hotel D Sector 15 Dwarka",
  //     description: "Near Sector 15, Dwarka, Airport Shuttle Available",
  //     price: 1050,
  //     ratings: 4.5,
  //     ratingCount: 50,
  //   },
  // ];

  return (
    <div className="w-full min-h-[40vh] pt-5 pb-20 lg:py-5 px-2 flex flex-col gap-5 font-poppins">
      {data.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}

function RoomCard({ room }) {
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState(0);
  const swiperRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setActiveImage(index);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index); // Correct method for looping Swiper
    }
  };
  const handleViewDetail = (data) => {
    dispatch(setOneRoom(data));
  };

  return (
    <div className="w-full min-h-[30vh] flex flex-col lg:flex-row gap-2 py-3 px-3 lg:px-0">
      {/* Left Section */}
      <div className="w-full lg:w-[40%] min-h-[30vh] flex ">
        {/* Swiper Section */}
        <div className="relative w-[80%]">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            loop={true}
            className="h-full"
            onSlideChange={(swiper) => setActiveImage(swiper.realIndex)}
          >
            {/* {room.image.map((src, index) => ( */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image
                  // src={src}
                  src="/assets/home/image2.svg"
                  // alt={`Main Room Image ${index + 1}`}
                  alt="Main Room Image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
            {/* ))} */}
          </Swiper>
        </div>

        {/* Thumbnail Section */}
        <div className="w-[15%] grid grid-rows-5 gap-2 ml-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative w-full h-full cursor-pointer ${
                  activeImage === index ? "ring-2 ring-blue-400" : ""
                }`}
              >
                <Image
                  src="/assets/home/image1.svg"
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-sm"
                />
              </div>
            ))}
        </div>
      </div>

      <div className="w-full lg:w-[60%] flex flex-col justify-between">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{room?.name}</h2>
          <p className="text-base font-medium">{room?.description}</p>
        </div>

        <div className="w-full flex items-center gap-5 py-2 lg:py-0">
          <div className="w-fit bg-green-500 text-white flex gap-2 items-center py-0.5 px-2 rounded-sm">
            <p>4</p>
            <FaStar className="text-white" />
          </div>
          <p>(32 Ratings) · Good</p>
        </div>

        <div className="flex items-center gap-5 py-2 lg:py-0">
          {room?.amenities?.map((faci, index) => (
            <div key={index} className="flex items-center gap-2">
              <IoWifiOutline />
              <p>{faci}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row items-start lg:items-center justify-between lg:pr-16">
          <div className="flex flex-col gap-1">
            <p>{room?.rate}</p>
            <p>+ ₹106 taxes & fees · per room per night</p>
          </div>

          <div className="flex items-center gap-5 text-nowrap cursor-pointer">
            <Link href={`/hotel/hotel-details/${room?.property_id}`}>
              <button
                onClick={() => handleViewDetail(room)}
                className="py-2 px-5 border border-black rounded-sm bg-transparent hover:bg-black hover:text-white transition-all duration-200 ease-in-out text-base font-semibold"
              >
                View Details
              </button>
            </Link>

            {/* <button className="py-2 px-5 text-white rounded-sm bg-primaryGradient hover:bg-black hover:text-white transition-all duration-200 ease-in-out text-base font-semibold">
              Book now
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
