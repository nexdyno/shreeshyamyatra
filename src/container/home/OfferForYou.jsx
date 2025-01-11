"use client";

import { fetchProperty } from "@/redux/dataSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OfferForYou({ property }) {
  const options = ["All", "Hotel", "Resort", "Villa"];

  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Map property type for category filtering
  const typeMap = {
    hotel: "Hotel",
    resort: "Resort",
    villa: "Villa",
  };

  // // Filter cards based on selected category
  // const filteredCards =
  //   selectedCategory === "All"
  //     ? cardsData
  //     : cardsData.filter((card) => card.category === selectedCategory);

  // Filter properties based on selected category
  const filteredProperties =
    selectedCategory === "All"
      ? property
      : property.filter(
          (item) => typeMap[item.type.toLowerCase()] === selectedCategory
        );

  return (
    <section className="w-full h-full py-20 md:min-h-screen px-2 lg:px-10 mdpy-10 font-poppins">
      <h1 className="text-center text-2xl lg:text-4xl font-bold mb-8">
        Offers For You
      </h1>
      {/* Filter Options */}
      <div className="flex items-center justify-center  md:justify-start gap-3 mb-8 w-full">
        {options?.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(item)}
            className={`text-sm font-semibold rounded-md hover:bg-blue-600 hover:text-white hover:border-none cursor-pointer ${
              selectedCategory === item
                ? "bg-blue-600 text-white"
                : "text-[#666666] border border-gray-500"
            }`}
          >
            <p className="py-1 px-3">{item}</p>
          </div>
        ))}
      </div>
      {/* Cards Section */}
      <div className="overflow-x-auto lg:overflow-hidden">
        <div className="flex sm:flex-wrap md:grid-cols-3 lg:grid lg:grid-cols-3 gap-6 overflow-x-auto w-full">
          {filteredProperties?.map((item) => (
            <Link href={`/hotel/hotel-details/${item?.id}`}>
              <div
                key={item.id}
                className="border border-gray-300 rounded-lg overflow-hidden  transition duration-300 p-5 flex-shrink-0 w-72 lg:w-full"
              >
                <img
                  src={item.logo_url || "/assets/home/default-image.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.address}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <button className="mt-4 bg-primaryGradient text-white py-2 px-4 rounded-sm hover:bg-blue-700 transition duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
