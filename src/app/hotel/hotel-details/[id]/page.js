"use client";

import SubNavbarMobile from "@/componets/hotel/SubNavbarMobile";
import HotelDetails from "@/container/hotel-details/HotelDetails";
import { useAppContext } from "@/context/AppContext";
import { fetchProperty, setMatchedProperty } from "@/redux/dataSlice";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Page() {
  const dispatch = useDispatch();
  const { property, matchedProperty, error } = useSelector(
    (state) => state.data
  );
  const [isLoading, setIsLoading] = useState(true); // Set isLoading to true initially
  const { setRoutePathName } = useAppContext();
  const pathName = usePathname();

  const id = useMemo(() => pathName.split("/").pop(), [pathName]);

  // Fetch property if it's not available
  useEffect(() => {
    const handleFetchProperty = async () => {
      try {
        await dispatch(fetchProperty()).unwrap();
      } catch (err) {
        console.error("Error while fetching the data", err);
      } finally {
        setIsLoading(false); // Set loading to false after fetching completes
      }
    };

    if (!property || property.length === 0) {
      handleFetchProperty();
    } else {
      setIsLoading(false); // If property already exists, stop loading
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
        {isLoading ? (
          <div className="w-full min-h-screen ">
            <div className="flex items-center justify-center h-screen">
              <div className="w-16 h-16 border-4 border-t-transparent border-blue-600 border-solid rounded-full animate-spin"></div>
            </div>
          </div>
        ) : matchedProperty ? (
          <HotelDetails property={matchedProperty} />
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p> // Show error message
        ) : (
          <p className="text-center text-red-500">Property not found</p> // Show "Property not found" if no match
        )}
      </div>
    </div>
  );
}
