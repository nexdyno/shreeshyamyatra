"use client";

import { fetchRooms } from "@/redux/dataSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RecommendedRooms = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Recommended Rooms</h2>
      <div className="flex overflow-x-auto space-x-6 pb-4 custom-scrollbar flex-nowrap">
        {rooms?.map((room) => (
          <div
            key={room.id}
            className="bg-white border rounded-md w-[25%] p-4 flex-none transition-transform duration-300 transform hover:scale-105"
          >
            <Link href={`/hotel/hotel-details/${room?.property_id}`}>
              {/* Image */}
              <div className="relative h-48 w-full">
                <Image
                  src="assets/home/image1.svg"
                  alt={room.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* Room Details */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {room.name}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{room.description}</p>
                <p className="mt-4 text-lg font-bold text-gray-900">
                  ₹{room.rate} per night
                </p>
              </div>
              <div className="flex items-center justify-end gap-5 text-nowrap cursor-pointer">
                <button className="py-2 px-5 border border-black rounded-sm bg-transparent hover:bg-black hover:text-white transition-all duration-200 ease-in-out text-base font-semibold">
                  View Details
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedRooms;
