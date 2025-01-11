"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

// export default function PhotoGallery() {
//   const images = [
//     "/assets/home/image.svg",
//     "/assets/home/image1.svg",
//     "/assets/home/image2.svg",
//     "/assets/home/image1.svg",
//     "/assets/home/image.svg",
//   ];

//   return (
//     <div className="w-full">
//       <div className="w-full min-h-[30vh] flex gap-2 pb-5 ">
//         {/* Swiper Section */}
//         <div className="relative w-full lg:w-[50%] h-full">
//           <Swiper
//             spaceBetween={0}
//             centeredSlides={true}
//             autoplay={{
//               delay: 2000,
//               disableOnInteraction: false,
//             }}
//             modules={[Autoplay]}
//             loop={true}
//             className="h-full"
//           >
//             {images.map((src, index) => (
//               <SwiperSlide key={index}>
//                 <div className="relative w-full h-[30vh] md:h-[60vh]">
//                   <Image
//                     src={src}
//                     alt={`Main Room Image ${index + 1}`}
//                     layout="fill"
//                     objectFit="cover"
//                     className=""
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//         <div className="w-[50%] grid grid-rows-2 gap-5 ">
//           <div className="relative w-full">
//             <Image
//               src="/assets/home/image1.svg"
//               alt="image"
//               layout="fill"
//               objectFit="cover"
//               className=""
//             />
//           </div>
//           <div className="relative w-full ">
//             <Image
//               src="/assets/home/image2.svg"
//               alt="image"
//               layout="fill"
//               objectFit="cover"
//               className=""
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


export default function PhotoGallery({ propertyWiseImages }) {
  // Filter the images to only include non-rejected ones
  // const validImages = propertyWiseImages?.find(
  //   (image) => !image.is_rejected
  // );

  // Ensure matchRooms is an array
 const images = typeof propertyWiseImages === "object" && propertyWiseImages !== null ? [propertyWiseImages] : [];

 const validImages = images?.filter((image) => !image.is_rejected);

  return (
    <div className="w-full">
      <div className="w-full min-h-[30vh] flex gap-2 pb-5">
        {/* Swiper Section */}
        <div className="relative w-full lg:w-[50%] h-full">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            loop={true}
            className="h-full"
          >
            {validImages?.map((image, index) => (
              <SwiperSlide key={image.id}>
                <div className="relative w-full h-[30vh] md:h-[60vh]">
                  <Image
                    src={image.image_url}
                    alt={`Property Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Static Images or Additional Images */}
        <div className="w-[50%] grid grid-rows-2 gap-5">
          {validImages?.slice(0, 2).map((image, index) => (
            <div className="relative w-full h-full" key={image.id}>
              <Image
                src={image.image_url}
                alt={`Additional Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
