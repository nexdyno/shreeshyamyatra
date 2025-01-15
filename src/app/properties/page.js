"use client";

import LoadingOfferForYou from "@/container/home/LoadingOfferForYou";
import { fetchImages, fetchProperty } from "@/redux/dataSlice";
import Image from "next/image";
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
    <div className="w-full min-h-screen font-poppins px-5 mt-5 lg:mt-20 lg:px-20 pb-20 lg:pb-10">
      <div className="w-full flex items-center justify-center py-5 lg:py-10">
        <h1 className="font-semibold tracking-wide text-2xl lg:text-5xl">
          All Hotels
        </h1>
      </div>
      {isLoading ? (
        <LoadingOfferForYou />
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {property?.slice(0, 6)?.map((item) => (
            <Link key={item.id} href={`/hotel/hotel-details/${item?.id}`}>
              <div className="border border-gray-300 rounded-lg overflow-hidden transition duration-300 p-5 flex flex-col h-full">
                <div className="relative h-40 w-full mb-4">
                  <Image
                    src={item.logo_url || "/assets/home/default-image.svg"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                    <p className="text-sm text-gray-600">{item.address}</p>
                    <p className="text-sm text-gray-600 mb-4">
                      {item.description}
                    </p>
                  </div>
                  <button className="mt-4 bg-transparent border border-gray-800 hover:border-none text-gray-800 py-2 px-4 rounded-sm hover:bg-gray-800 hover:text-white transition duration-300 w-full font-semibold">
                    View Details
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
