"use client";

import FilterAndSort from "@/componets/common/FilterAndSort";
import ShowHotels from "@/container/hotels/ShowHotels";
import { useAppContext } from "@/context/AppContext";
import { fetchProperty, fetchRooms } from "@/redux/dataSlice";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const { property, rooms, status, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const pathName = usePathname(); // If pathName is used, make sure it's set properly in your context

  useEffect(() => {
    // Only dispatch actions if the status is "idle" and data is not yet fetched
    if (status === "idle" && !property.length && !rooms.length) {
      dispatch(fetchProperty());
      dispatch(fetchRooms());
    }
  }, [dispatch, status, property, rooms]); // Dependency array includes checks for fetched data

  return (
    <div className="overflow-hidden lg:mt-20">
      <div className="lg:hidden">
        <FilterAndSort />
      </div>

      {/* <ShowHotels data={property} status={status} error={error} /> */}
      <ShowHotels data={rooms} status={status} error={error} />
    </div>
  );
}
