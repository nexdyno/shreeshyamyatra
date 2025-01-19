"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { IoArrowBack } from "react-icons/io5";

export default function PhotoGallery({ propertyWiseImages }) {
  // Filter the images to only include non-rejected ones
  // const validImages = propertyWiseImages?.find(
  //   (image) => !image.is_rejected
  // );

  // Ensure matchRooms is an array
  const [currentIndex, setCurrentIndex] = useState(0);

  const images =
    typeof propertyWiseImages === "object" && propertyWiseImages !== null
      ? [propertyWiseImages]
      : [];

  const validImages = images?.filter((image) => !image.is_rejected);
  const image = ["/topimg.jpg", "/topimg.jpg", "/topimg.jpg", "/topimg.jpg"];

  return (
    <div className="w-full">
      <div className="relative h-64 lg:h-48 w-full mb-4">
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 z-10 bg-white text-black p-2 rounded-full shadow-md hover:bg-black/70"
        >
          <IoArrowBack />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="w-full h-full"
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        >
          {image.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <Image
                src={imgSrc}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-2 left-1/2 z-10 text-center text-white bg-black/50 px-3 py-1 rounded">
          {`${currentIndex + 1} / ${image.length}`}
        </div>
      </div>
    </div>
  );
}
