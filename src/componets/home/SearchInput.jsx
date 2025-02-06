"use client";
import React, { useEffect, useState, useRef } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperty, setSearchValue } from "@/redux/dataSlice";

const SearchInput = () => {
  const { searchValue, property } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(""); // Local state for the input value
  const [filteredProperties, setFilteredProperties] = useState(property);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null); // To detect clicks outside

  useEffect(() => {
    dispatch(fetchProperty());
  }, [dispatch]);

  const filterProperties = (value) => {
    return value
      ? property
          ?.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 8) // Show only top 6 results
      : [];
  };

  useEffect(() => {
    const filtered = filterProperties(searchValue);
    setFilteredProperties(filtered);
  }, [property, searchValue]);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    dispatch(setSearchValue(newValue));
    setShowSuggestions(true);
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (name) => {
    setInputValue(name);
    dispatch(setSearchValue(name));
    setShowSuggestions(false);
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative w-full lg:flex-1 border-b lg:border-r lg:border-b-0 border-gray-500 p-3"
      ref={inputRef}
    >
      <div className="flex items-center">
        <IoLocationSharp size={20} className="text-primary" />
        <input
          type="text"
          placeholder="Search by city, hotel"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
          className="text-sm px-5 py-1 w-full focus:outline-none font-medium"
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredProperties.length > 0 && (
        <ul className="absolute left-0 w-full bg-white shadow-md border rounded-md mt-2 z-50">
          {filteredProperties.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(item.name)}
              className="p-2 cursor-pointer hover:bg-gray-200 text-sm"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
