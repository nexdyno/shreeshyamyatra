import Image from "next/image";
import React from "react";

export default function OurCollection() {
  const data = [
    {
      image: "/assets/home/image.svg",
      heading: "Spot on",
      desc: "comfortable stay on ",
    },
    {
      image: "/assets/home/image1.svg",
      heading: "Spot on",
      desc: "comfortable stay on ",
    },
    {
      image: "/assets/home/image2.svg",
      heading: "Spot on",
      desc: "comfortable stay on ",
    },
  ];

  return (
    <section className="w-full h-fit">
      <div className="w-full h-full py-10 px-20">
        <h1 className="text-center text-4xl font-semibold">Our Collection</h1>

        <div className="w-full h-full grid grid-cols-3 gap-8 pt-10">
          {data.map((item, index) => (
            <div className="flex flex-col gap-2">
              <div key={index} className="relative h-[40vh]">
                <Image
                  src={item.image}
                  alt="image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="text-start pl-2">
                <p className="text-lg text-gray-600 font-semibold">
                  {item.heading}
                </p>
                <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
