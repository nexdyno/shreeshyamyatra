import React from "react";
import SearchbarMobile from "../common/SearchbarMobile";
import DateSelector from "../home/DateSelector";
import RoomGuestSelector from "../home/RoomGuestSelector";
import { RxCross2 } from "react-icons/rx";

export default function SubNavbarMobile({ onClose, IsSearchOpen }) {
  return (
    // <div className="px-5 pt-1 h-[30vh] lg:hidden">
    //   <div>
    //     <p>Edit Search</p>
    //     <div className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 cursor-pointer shadow-sm">
    //       <RxCross2 onClick={onClose} size={24} className="text-gray-600" />
    //     </div>
    //   </div>
    //   <div className="flex flex-col">
    //     <SearchbarMobile />
    //     <div className="border-b">
    //       <DateSelector />
    //       <RoomGuestSelector />
    //     </div>
    //   </div>
    // </div>

    <div
      className={`fixed top-0 left-0 w-full bg-white min-h-fit transition-transform duration-300 ease-in-out ${
        IsSearchOpen ? "translate-y-0" : "-translate-y-full"
      } lg:hidden px-5 pt-3 shadow-lg z-50`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-lg font-semibold text-gray-800 font-poppins">
          Edit Search
        </p>
        <div className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 cursor-pointer shadow-sm">
          <RxCross2 onClick={onClose} size={24} className="text-gray-600" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-4">
        {/* Searchbar */}
        <SearchbarMobile />

        {/* Date and Room/Guest Selectors */}
        <div className="border-b pb-2">
          <DateSelector />
          <RoomGuestSelector />
        </div>
      </div>
    </div>
  );
}
