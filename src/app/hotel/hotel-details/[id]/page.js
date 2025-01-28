"use client";

import SubNavbarMobile from "@/componets/hotel/SubNavbarMobile";
import HotelDetails from "@/container/hotel-details/HotelDetails";
import { useAppContext } from "@/context/AppContext";
import {
  fetchImages,
  fetchProperty,
  fetchPropertyEvent,
  setIsSearchOpen,
  setMatchedProperty,
} from "@/redux/dataSlice";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { anonymouslySignin, setUserSession } from "@/redux/authSlice";
import { initializeSession } from "@/lib/helperFunctions/sessionChecker";
import InsideNavabr from "@/componets/common/InsideNavabr";
import { IoArrowBack } from "react-icons/io5";
import ImageSkeleton from "@/componets/hotel-details/ImageSkeleton";
import RoomCardSkeleton from "@/componets/hotel-details/RoomCardSkeleton";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    property,
    propertyEvent,
    matchedProperty,
    error,
    IsSearchOpen,
    allImages,
  } = useSelector((state) => state.data);
  const { sessionFromLocal } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true); // Set isLoading to true initially
  const { setRoutePathName } = useAppContext();
  const pathName = usePathname();

  const id = useMemo(() => pathName.split("/").pop(), [pathName]);
  // Fetch property if it's not available
  useEffect(() => {
    const handleFetchProperty = async () => {
      try {
        await dispatch(fetchProperty()).unwrap();
        await dispatch(fetchImages()).unwrap();
        await dispatch(fetchPropertyEvent().unwrap());
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
    if (!sessionFromLocal) {
      initializeSession(dispatch);
    }
  }, [property, propertyEvent, dispatch]);

  // Use memoized property to prevent unnecessary re-renders
  const stableProperty = useMemo(() => property || [], [property]);

  useEffect(() => {
    const foundProperty = stableProperty.find((item) => item.id === id);
    dispatch(setMatchedProperty(foundProperty || null));
  }, [id, stableProperty, dispatch]);

  useEffect(() => {
    setRoutePathName(pathName);
  }, [pathName, setRoutePathName]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Adjust the scroll threshold as needed
      if (scrollTop > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="lg:pt-20">
      <div
        className={`fixed md:hidden top-0 pt-3 left-0 w-full z-50 bg-white transition-transform duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <InsideNavabr />
        {IsSearchOpen ? (
          <SubNavbarMobile
            IsSearchOpen={IsSearchOpen}
            onClose={() => dispatch(setIsSearchOpen(false))}
          />
        ) : null}
      </div>
      <div>
        {isLoading ? (
          <div className="w-full min-h-screen pb-8">
            <ImageSkeleton />
            <div className="w-full px-10 lg:flex items-center gap-5 hidden ">
              {[...Array(2)].map((_, index) => (
                <RoomCardSkeleton key={index} />
              ))}
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
      <div></div>
    </div>
  );
}
