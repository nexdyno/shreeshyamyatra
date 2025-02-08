import React from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useAppContext } from "@/context/AppContext";
import SearchInput from "./SearchInput";
import DateSelector from "./DateSelector";
import RoomGuestSelector from "./RoomGuestSelector";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const SearchComponent = ({ onClose }) => {
  const pathname = usePathname();
  const { mobileSearch, setmobileSearch } = useAppContext();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);

    // Navigate to the new page
    router.push("/properties");
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row items-center justify-center">
        <div className="relative flex flex-col lg:flex-row items-center w-full max-w-5xl gap-4 bg-white rounded-md lg:shadow-md  lg:pb-0 border border-gray-500">
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <DateSelector />
          <RoomGuestSelector />
          <div className="w-auto px-3 hidden lg:block">
            <Link href="/properties">
              <button className="w-full bg-primaryGradient lg:w-auto py-2 px-6 lg:py-3 text-white text-sm transition flex items-center justify-center gap-2 font-medium rounded">
                <IoIosSearch size={20} className="text-white" />
                <span>Search</span>
              </button>
            </Link>
          </div>
        </div>
        <div
          className={`w-full lg:w-auto  mt-5  lg:hidden ${
            pathname === "/hotel/hotel-details/rooms" ? "hidden" : ""
          }`}
        >
          {/* <Link onClick={onClose} href="/properties">
            <button className="w-full bg-primaryGradient lg:w-auto py-2 px-6 lg:py-3 text-white text-sm transition flex items-center justify-center gap-2 font-medium rounded-full">
              <span className="text-base ">Search</span>
            </button>
          </Link> */}
          <button
            onClick={handleClick}
            disabled={isLoading}
            className={`w-full bg-primaryGradient lg:w-auto py-2 px-6 lg:py-3 text-white text-sm transition flex items-center justify-center gap-2 font-medium rounded-full ${
              isLoading ? "opacity-40" : ""
            }`}
          >
            <span className="text-base">
              {isLoading ? "Searching..." : "Search"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
