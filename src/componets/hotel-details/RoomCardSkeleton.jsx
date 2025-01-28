import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RoomCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm p-4 border rounded-lg shadow-md">
      {/* Image Skeleton */}
      <Skeleton height={200} className="rounded-md" />

      {/* Title and Price */}
      <div className="mt-4">
        <Skeleton width="60%" height={24} />
        <Skeleton width="40%" height={20} className="mt-2" />
      </div>

      {/* Description */}
      <div className="mt-4">
        <Skeleton width="80%" height={16} />
      </div>

      {/* Button and View More */}
      <div className="flex justify-between mt-4">
        <Skeleton width={100} height={36} />
        <Skeleton width={60} height={36} />
      </div>

      {/* Amenities Section */}
      <div className="mt-4">
        <Skeleton width="50%" height={20} />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Skeleton height={16} />
          <Skeleton height={16} />
          <Skeleton height={16} />
          <Skeleton height={16} />
        </div>
      </div>

      {/* View More Amenities */}
      <div className="mt-4">
        <Skeleton width="40%" height={20} />
      </div>
    </div>
  );
};

export default RoomCardSkeleton;
