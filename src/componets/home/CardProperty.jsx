import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

export default function CardProperty({ image, item }) {
  const ArrayDefault = [
    { image_url: "/assets/logo.svg" },
    { image_url: "/assets/logo.svg" },
  ];

  // Determine which images to use, fallback to ArrayDefault if image is not provided
  const imagesToUse = image && image.length > 0 ? image : ArrayDefault;

  return (
    <div className="overflow-hidden transition duration-300 flex flex-col h-full">
      <div className="relative h-40 lg:h-48 w-full mb-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="w-full h-full"
        >
          {imagesToUse.map((imgSrc, index) => (
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
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-2">{item?.name}</h2>
          <p className="text-sm text-gray-800">{item?.address}</p>
          <p className="text-sm text-gray-600 mb-4">{item?.description}</p>
          <div className="flex overflow-hidden gap-2 flex-wrap">
            {item?.facilities?.map((ami, i) => (
              <p key={i} className="text-sm text-gray-600">
                {ami}
              </p>
            ))}
          </div>
          <p className="text-base text-primary font-semibold py-4">
            Starting from Rs. 499
          </p>
        </div>
        <button className="mt-4 bg-primaryGradient hover:border-none text-white py-2 px-4 rounded-sm hover:bg-gray-800 hover:text-white transition duration-300 w-full font-semibold">
          Book now
        </button>
      </div>
    </div>
  );
}
