"use client";

import FilterAndSort from "@/componets/common/FilterAndSort";
import MobileFooter from "@/componets/common/MobileFooter";
import ShowHotels from "@/container/hotels/ShowHotels";
import { useAppContext } from "@/context/AppContext";
import { initializeSession } from "@/lib/helperFunctions/sessionChecker";
import { anonymouslySignin, setUserSession } from "@/redux/authSlice";
import { fetchProperty, fetchRooms } from "@/redux/dataSlice";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const { property, rooms, status, error } = useSelector((state) => state.data);
  const { sessionFromLocal } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathName = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProperty()).unwrap();
        await dispatch(fetchRooms()).unwrap();
      } catch (err) {
        console.log("erorr while fetching the data", err);
      } finally {
      }
    };
    if (status === "idle" && !property.length && !rooms.length) {
      fetchData();
    }

    if (!sessionFromLocal) {
      initializeSession(dispatch);
    }
  }, [dispatch, status, property, rooms]); // Dependency array includes checks for fetched data

  return (
    <div className="overflow-hidden lg:mt-20">
      <div className="lg:hidden">
        <FilterAndSort />
      </div>

      {/* <ShowHotels data={property} status={status} error={error} /> */}
      <ShowHotels data={rooms} status={status} error={error} />
      <div className="md:hidden">
        <MobileFooter />
      </div>
    </div>
  );
}
