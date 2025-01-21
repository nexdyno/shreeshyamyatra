"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { IoArrowBack } from "react-icons/io5";

export default function PhotoGallery({ propertyWiseImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLgIndex, setCurrentLgIndex] = useState(2);

  const images =
    typeof propertyWiseImages === "object" && propertyWiseImages !== null
      ? Array.isArray(propertyWiseImages)
        ? propertyWiseImages
        : [propertyWiseImages]
      : [];

  // Filter out the valid images
  const validImages = images
    .filter((image) => !image.is_rejected) // Filter out rejected images
    .sort((a, b) => (b.is_cover_photo ? 1 : 0) - (a.is_cover_photo ? 1 : 0)); // Sort by `is_cover_photo`

  useEffect(() => {
    if (!validImages?.length) return;

    const interval = setInterval(() => {
      setCurrentLgIndex((prevIndex) => (prevIndex + 1) % validImages.length);
    }, 1500);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [validImages?.length]);

  return (
    <div className="w-full lg:flex lg:items-center lg:gap-10 lg:mb-5">
      <div className="relative h-64 lg:h-96  w-full lg:w-[50%] mb-4 lg:mb-0">
        <button
          onClick={() => window.history.back()}
          className="absolute lg:hidden top-4 left-4 z-10 bg-white text-black p-2 rounded-full shadow-md hover:bg-black/70"
        >
          <IoArrowBack />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: null,
            prevEl: null,
          }}
          // autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="w-full h-full"
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        >
          {validImages?.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <Image
                src={imgSrc?.image_url}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-2 left-1/2 z-10 text-center text-white bg-black/50 px-3 py-1 rounded">
          {`${currentIndex + 1 || 1} / ${validImages?.length}`}
        </div>
      </div>
      <div className="hidden lg:block relative w-[50%] h-96">
        <Image
          src={validImages?.[currentLgIndex]?.image_url}
          alt="iamge"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
    </div>
  );
}
