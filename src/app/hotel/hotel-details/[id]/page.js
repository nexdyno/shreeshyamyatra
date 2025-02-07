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
import Swal from "sweetalert2";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAvalProperty, setIsAvalProperty] = useState(false);
  const dispatch = useDispatch();
  const {
    property,
    propertyEvent,
    matchedProperty,
    error,
    IsSearchOpen,
    bookingDate,
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
        await dispatch(fetchPropertyEvent()).unwrap();
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

  useEffect(() => {
    if (!matchedProperty || !bookingDate?.startDate || !bookingDate?.endDate)
      return;

    const start = new Date(bookingDate.startDate);
    const end = new Date(bookingDate.endDate);

    // Function to format date (e.g., "March 1" or "March 1, 2025")
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });
    };

    // Find a blocking event
    const blockedEvent = propertyEvent.find((event) => {
      const eventStart = new Date(event.start_date);
      const eventEnd = new Date(event.end_date);

      return (
        event?.property_id === matchedProperty?.id &&
        event.event_type === "dateBlock" &&
        ((start >= eventStart && start <= eventEnd) ||
          (end >= eventStart && end <= eventEnd) ||
          (start <= eventStart && end >= eventEnd))
      );
    });

    if (blockedEvent) {
      setIsAvalProperty(true);
      Swal.fire({
        title: "Property Unavailable",
        html: `
    <p style="font-size: 16px; color: #555;">
      Sorry, this property is <strong style="color: #D9534F;">unavailable</strong> from 
      <strong>${formatDate(blockedEvent.start_date)}</strong> to 
      <strong>${formatDate(blockedEvent.end_date)}</strong>.
    </p>
    <p style="font-size: 14px; margin-top: 10px; color: #777;">
      Please select different dates or explore other properties.
    </p>
  `,
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonText: "Choose New Dates",
        confirmButtonColor: "#3085d6",
        backdrop: true,
        showCloseButton: true,
        allowOutsideClick: false,
      });
    } else {
      setIsAvalProperty(false);
    }
  }, [
    JSON.stringify(bookingDate),
    JSON.stringify(matchedProperty),
    propertyEvent,
  ]);

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
          <HotelDetails
            property={matchedProperty}
            isAvalProperty={isAvalProperty}
          />
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
