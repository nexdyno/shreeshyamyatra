"use client";

import LoadingOfferForYou from "@/container/home/LoadingOfferForYou";
import {
  fetchImages,
  fetchProperty,
  fetchPropertyEvent,
  setIsSearchOpen,
} from "@/redux/dataSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import CardProperty from "@/componets/home/CardProperty";
import SubNavbarMobile from "@/componets/hotel/SubNavbarMobile";
import InsideNavabr from "@/componets/common/InsideNavabr";
import MobileFooter from "@/componets/common/MobileFooter";

export default function Page() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    property,
    IsSearchOpen,
    allImages,
    searchValue,
    propertyEvent,
    bookingDate,
  } = useSelector((state) => state.data);
  const [filteredProperties, setFilteredProperties] = useState(property);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchProperty()).unwrap();
        await dispatch(fetchImages()).unwrap();
        await dispatch(fetchPropertyEvent()).unwrap();
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch data only if `property` is undefined or empty
    if (!property || property.length === 0) {
      fetchData();
    }
  }, [dispatch, property]);

  const filterProperties = (value) => {
    return value
      ? property?.filter(
          (item) => item.name.toLowerCase().includes(value.toLowerCase()) // Filter by name
        )
      : property; // If query is empty, show all properties
  };

  const updateProperties = (properties) => {
    const start = new Date(bookingDate?.startDate);
    const end = new Date(bookingDate?.endDate);

    // Filter properties based on matching property_id and overlapping dates with "dateBlock" type
    const filteredProperties = properties.filter((property) => {
      const hasDateBlock = propertyEvent.some((event) => {
        const eventStart = new Date(event.start_date);
        const eventEnd = new Date(event.end_date);

        return (
          event.property_id === property.id && // Match property_id
          event.event_type === "dateBlock" && // Check for 'dateBlock' type
          ((start >= eventStart && start <= eventEnd) || // Start date overlaps
            (end >= eventStart && end <= eventEnd) || // End date overlaps
            (start <= eventStart && end >= eventEnd)) // Encloses the event date
        );
      });

      // Exclude properties that have a matching 'dateBlock' event
      return !hasDateBlock;
    });

    return filteredProperties;
  };

  useEffect(() => {
    const value = searchValue;
    const properties = filterProperties(value);
    const result = updateProperties(properties);

    setFilteredProperties(result);
  }, [property, propertyEvent, searchValue, JSON.stringify(bookingDate)]);

  const getValidImages = (propertyId) =>
    (Array.isArray(allImages) ? allImages : [])
      .filter((image) => image.property_id === propertyId && !image.is_rejected)
      .sort((a, b) => (b.is_cover_photo ? 1 : 0) - (a.is_cover_photo ? 1 : 0));

  return (
    <div className="w-full min-h-screen font-poppins lg:mt-28 lg:px-20 pb-20 lg:pb-10">
      <div className="w-full md:hidden">
        <InsideNavabr />
        {IsSearchOpen ? (
          <SubNavbarMobile
            IsSearchOpen={IsSearchOpen}
            onClose={() => dispatch(setIsSearchOpen(false))}
          />
        ) : (
          ""
        )}
      </div>
      {isLoading ? (
        <LoadingOfferForYou />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-2 mt-5 ">
          {filteredProperties?.length === 0 && (
            <h1 className="text-2xl font-semibold font-poppins flex items-center justify-center">
              No Result Found
            </h1>
          )}
          {filteredProperties?.length > 0 &&
            filteredProperties?.map((item) => (
              // <Link key={item.id} href={`/hotel/hotel-details/${item?.id}`}>
              <div className="shadow-md border border-gray-400 p-5 rounded-md">
                <CardProperty image={getValidImages(item?.id)} item={item} />
              </div>
              // </Link>
            ))}
        </div>
      )}
      <div className="md:hidden">
        <MobileFooter />
      </div>
    </div>
  );
}
