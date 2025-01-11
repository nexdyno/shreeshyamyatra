"use client";
import SubNavbarMobile from "@/componets/hotel/SubNavbarMobile";
import HotelDetails from "@/container/hotel-details/HotelDetails";
import { useAppContext } from "@/context/AppContext";
import { fetchProperty, setMatchedProperty } from "@/redux/dataSlice";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const { property, matchedProperty } = useSelector((state) => state.data);
  const { setRoutePathName } = useAppContext();
  const pathName = usePathname();

  const id = useMemo(() => pathName.split("/").pop(), [pathName]);

  // Fetch property if it's not available
  useEffect(() => {
    if (!property || property.length === 0) {
      dispatch(fetchProperty());
    }
  }, [property, dispatch]);

  // Use memoized property to prevent unnecessary re-renders
  const stableProperty = useMemo(() => property || [], [property]);

  useEffect(() => {
    const foundProperty = stableProperty.find((item) => item.id === id);
    dispatch(setMatchedProperty(foundProperty || null));
  }, [id, stableProperty, dispatch]);

  useEffect(() => {
    setRoutePathName(pathName);
  }, [pathName, setRoutePathName]);

  return (
    <div className="pt-[35vh] lg:pt-20">
      <div className="fixed top-0 pt-3 left-0 w-full z-20 bg-white">
        <SubNavbarMobile />
      </div>
      <div>
        {matchedProperty ? (
          <HotelDetails property={matchedProperty} />
        ) : (
          <p className="text-center text-red-500">Property not found</p>
        )}
      </div>
    </div>
  );
}
