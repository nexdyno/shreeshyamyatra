"use client";

import { useState } from "react";
import CustomRangeSlider from "./CustomRangeSlider";

export default function FilterSideBar() {
  const collections = [
    { type: "Family", label: "Family OYOs" },
    { type: "love", label: "Love OYOs" },
    { type: "solo", label: "Solo OYOs" },
    { type: "villa", label: "Villa OYOs" },
  ];

  const categories = [
    { type: "Family", label: "Family" },
    { type: "For group travellers", label: "For group travellers" },
    { type: "Local IDs accepted", label: "Local IDs accepted" },
  ];

  const [showAllCategories, setShowAllCategories] = useState(false);

  const toggleCategories = () => setShowAllCategories(!showAllCategories);

  const filters = [
    {
      title: "Accommodation Type",
      options: ["Hotel", "Hostel", "Resort", "Guest House"],
    },
    {
      title: "Hotel Facilities",
      options: ["Pool", "Gym", "Free Wi-Fi", "Parking"],
    },
    {
      title: "Check-in Features",
      options: ["24-hour Check-in", "Self Check-in", "Express Check-in"],
    },
  ];

  // Function to handle checkbox click
  const handleCheckboxClick = (type) => {
    console.log(type); // Logs the `type` of the clicked checkbox
  };

  return (
    <section className="w-full h-full py-5">
      <div className="w-full px-5">
        {/* Collections */}
        <div className="w-full h-full border-b border-gray-300 pb-5">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-2xl font-bold">Filters</h1>
            <p className="text-base font-semibold text-primary cursor-pointer">
              Clear All
            </p>
          </div>

          <div className="py-3">
            <h1 className="text-base font-semibold py-1">Price</h1>
            <div className="py-2">
              <CustomRangeSlider />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="py-4 border-b border-gray-300">
          <h3 className="text-base font-bold py-2">Category</h3>
          <div className="flex flex-col gap-4 justify-center pt-4">
            {(showAllCategories ? categories : categories.slice(0, 8)).map(
              (item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <input
                    type="checkbox"
                    className="bg-gray-100 border rounded-md outline-none focus:outline-none w-4 h-4"
                    onChange={() => handleCheckboxClick(item.type)}
                  />
                  <label className="text-sm">{item.label}</label>
                </div>
              )
            )}
            <button
              onClick={toggleCategories}
              className="text-primary text-sm font-medium mt-2"
            >
              {showAllCategories ? "View Less" : "View More"}
            </button>
          </div>
        </div>

        {/* Filters */}
        {filters.map((filter, index) => (
          <div key={index} className="py-4 border-b border-gray-300">
            <h3 className="text-base font-bold py-2">{filter.title}</h3>
            <div className="flex flex-col gap-4 justify-center pt-4">
              {filter.options.map((option, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <input
                    type="checkbox"
                    className="bg-gray-100 border rounded-md outline-none focus:outline-none w-4 h-4"
                    onChange={() => console.log(`${filter.title}: ${option}`)}
                  />
                  <label className="text-sm">{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
