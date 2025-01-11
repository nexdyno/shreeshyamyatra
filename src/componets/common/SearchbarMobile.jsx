"use client";
import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";

export default function SearchbarMobile() {
  const { searchText, setSearchText } = useAppContext();

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClear = () => {
    setSearchText("");
  };

  return (
    <div className=" border bg-white flex items-center py-3 pl-2 pr-4 rounded-lg mb-2">
      <div className="mr-2">
        {searchText ? (
          <FaTimes
            className="text-primary cursor-pointer"
            onClick={handleClear}
          />
        ) : (
          <FaSearch size={18} className="text-primary" />
        )}
      </div>
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search by place, hotel"
        className="w-full bg-transparent outline-none pl-3 text-black text-base placeholder:text-black/60"
      />
    </div>
  );
}
