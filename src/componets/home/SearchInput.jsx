// components/SearchInput.jsx
import React from "react";
import { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchProperty } from "@/redux/dataSlice";

const SearchInput = ({ searchValue, setSearchValue }) => {
  const dispatch = useDispatch();
  const { property } = useSelector((state) => state.data);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProperty());
  }, []);

  // Filter properties based on searchValue
  const filteredProperties = property?.filter((p) =>
    p.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleItemClick = (value) => {
    setSearchValue(value); // Set input value to the clicked item's value
    setIsDropdownVisible(false); // Close dropdown
  };

  return (
    <div
      className="flex items-center w-full lg:flex-1 border-b lg:border-r lg:border-b-0 border-gray-500 p-3"
      onMouseEnter={() => setIsDropdownVisible(true)}
      // onMouseLeave={() => setIsDropdownVisible(false)}
    >
      <IoLocationSharp size={20} className="text-primary" />
      <input
        type="text"
        placeholder="Search by city, hotel"
        value={searchValue} // Bind input value to state
        onChange={(e) => setSearchValue(e.target.value)} // Update state on input change
        className="text-sm px-5 py-1 w-full focus:outline-none font-medium"
      />
      {/* Dropdown */}
      {isDropdownVisible && (
        <div
          className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-2"
          onMouseEnter={() => setIsDropdownVisible(true)}
          onMouseLeave={() => setIsDropdownVisible(false)}
        >
          <ul>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((item) => (
                <Link key={item?.id} href={`/hotel/hotel-details/${item?.id}`}>
                  <li
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleItemClick(item.name)} // Handle click to set input value
                  >
                    <IoLocationSharp size={20} className="text-primary" />
                    <span> {item.name}</span>
                  </li>
                </Link>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
