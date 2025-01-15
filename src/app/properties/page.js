"use client";

import LoadingOfferForYou from "@/container/home/LoadingOfferForYou";
import { fetchImages, fetchProperty } from "@/redux/dataSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { property, error, status } = useSelector((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchProperty()).unwrap();
        await dispatch(fetchImages()).unwrap();
      } catch (err) {
        console.error("Error in fetching data:", err);
      } finally {
        setIsLoading(false);
        console.log("Data fetching completed");
      }
    };

    // Fetch data only if `property` is undefined or empty
    if (!property || property.length === 0) {
      fetchData();
    }
  }, [dispatch, property]);

  return (
    <div className="w-full min-h-screen font-poppins mt-20 px-20 pb-10">
      <div className="w-full flex items-center justify-center py-10">
        <h1 className="font-semibold tracking-wide text-5xl">All Hotels</h1>
      </div>
      {isLoading ? (
        <LoadingOfferForYou />
      ) : (
        <div className="flex sm:flex-wrap md:grid-cols-3 lg:grid lg:grid-cols-3 gap-6 overflow-x-auto w-full">
          {property?.map((item) => (
            <Link key={item.id} href={`/hotel/hotel-details/${item?.id}`}>
              <div className="border border-gray-300 rounded-lg overflow-hidden transition duration-300 p-5 flex-shrink-0 w-72 lg:w-full">
                <img
                  src={item.logo_url || "/assets/home/default-image.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.address}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <button className="mt-4 bg-primaryGradient text-white py-2 px-4 rounded-sm hover:bg-blue-700 transition duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
