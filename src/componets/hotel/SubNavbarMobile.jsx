import React from "react";
import SearchbarMobile from "../common/SearchbarMobile";
import DateSelector from "../home/DateSelector";
import RoomGuestSelector from "../home/RoomGuestSelector";

export default function SubNavbarMobile() {
  return (
    <div className="px-5 pt-1 h-[30vh] lg:hidden">
      <div className="flex flex-col">
        <SearchbarMobile />
        <div className="border-b">
          <DateSelector />
          <RoomGuestSelector />
        </div>
      </div>
    </div>
  );
}
