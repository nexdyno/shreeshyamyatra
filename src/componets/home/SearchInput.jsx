"use client";
import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperty, setSearchValue } from "@/redux/dataSlice";
import Link from "next/link";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(""); // Local state for the input value

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter" && inputValue.trim() !== "") {
  //     window.location.href = "/properties";
  //   }
  // };
  useEffect(() => {
    // Initialize input value from localStorage
    const storedValue = localStorage.getItem("searchValue") || "";
    setInputValue(storedValue); // Set initial value in state
  }, []);
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue); // Update local state
    dispatch(setSearchValue(newValue)); // Dispatch Redux action
    localStorage.setItem("searchValue", newValue); // Update localStorage
  };
  useEffect(() => {
    dispatch(fetchProperty());
  }, [dispatch]);

  return (
    <div className="flex items-center w-full lg:flex-1 border-b lg:border-r lg:border-b-0 border-gray-500 p-3">
      <IoLocationSharp size={20} className="text-primary" />
      {/* <Link href="/properties"> */}
      <input
        type="text"
        placeholder="Search by city, hotel"
        value={inputValue}
        onChange={handleInputChange}
        // onKeyDown={handleKeyDown}
        className="text-sm px-5 py-1 w-full focus:outline-none font-medium"
      />
      {/* </Link> */}
    </div>
  );
};

export default SearchInput;
