import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BookingDetailsSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 w-full mx-auto font-poppins mb-16 lg:mb-20 lg:overflow-y-auto">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6 lg:mb-8 lg:hidden">
        <div className="cursor-pointer">
          <Skeleton width={24} height={24} circle />
        </div>
        <h2 className="text-lg font-bold text-gray-800">
          <Skeleton width={150} height={24} />
        </h2>
      </div>

      {/* Booking Cards Skeleton */}
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-xl shadow-md border border-gray-300 space-y-4 hover:shadow-lg transition-shadow"
        >
          {/* Booking Details Skeleton */}
          <div className="mt-2 text-gray-700 space-y-2 text-sm sm:text-base font-medium">
            <p>
              <Skeleton width={100} /> <Skeleton width={150} />
            </p>
            <p>
              <Skeleton width={100} /> <Skeleton width={200} />
            </p>
            <p>
              <Skeleton width={100} /> <Skeleton width={150} />
            </p>
            <p>
              <Skeleton width={100} /> <Skeleton width={150} />
            </p>
            <p>
              <Skeleton width={100} /> <Skeleton width={150} />
            </p>
            <p>
              <Skeleton width={100} /> <Skeleton width={200} />
            </p>
            <p>
              <Skeleton width={100} /> <Skeleton width={200} />
            </p>
            <p>
              <Skeleton width={100} /> <Skeleton width={150} />
            </p>
            <p>
              <Skeleton width={100} /> <Skeleton width={150} />
            </p>
            <p>
              <Skeleton width={100} /> <Skeleton width={150} />
            </p>
            <p>
              <Skeleton width={100} /> <Skeleton width={150} />
            </p>
            <p>
              <Skeleton width={100} /> <Skeleton width={150} />
            </p>
          </div>

          {/* Button Skeleton */}
          <div className="flex justify-end">
            <Skeleton width={150} height={40} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingDetailsSkeleton;
