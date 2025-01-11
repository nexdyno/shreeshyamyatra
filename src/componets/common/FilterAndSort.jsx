"use client";
import React, { useState } from "react";
import { MdFilterList } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import FilterSideBar from "@/componets/hotel/FilterSideBar";

export default function FilterAndSort() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterSortClick = () => {
    setIsFilterOpen(true);
  };

  const closeFilterSidebar = () => {
    setIsFilterOpen(false);
  };

  return (
    <div>
      {/* Filter & Sort Button */}
      <button
        onClick={handleFilterSortClick}
        className="fixed bottom-20 left-4 flex items-center justify-center gap-2 bg-primaryGradient text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition-colors z-50"
      >
        <MdFilterList className="text-lg" />
        <span className="text-sm font-medium">Filter & Sort</span>
      </button>

      {/* Filter Sidebar */}
      {isFilterOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeFilterSidebar}
          ></div>

          {/* Sidebar */}
          <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-lg shadow-lg z-50 transform translate-y-0 transition-transform duration-300">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h3 className="text-lg font-medium">Filter & Sort</h3>
              <FaTimes
                className="text-xl text-gray-500 cursor-pointer"
                onClick={closeFilterSidebar}
              />
            </div>

            {/* Scrollable Content */}
            <div className="p-4 pb-20 overflow-y-auto max-h-[calc(100vh-300px)]">
              <FilterSideBar />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
