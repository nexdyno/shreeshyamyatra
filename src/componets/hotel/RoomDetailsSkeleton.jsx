import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RoomDetailsSkeleton = () => {
  return (
    <div className="w-full min-h-[30vh] flex flex-col lg:flex-row gap-2 py-3 px-3 lg:px-0">
      {/* Left Section */}
      <div className="w-full lg:w-[40%] min-h-[30vh] flex">
        {/* Swiper Section */}
        <div className="relative w-[80%]">
          <div className="w-full h-full">
            <Skeleton height="100%" />
          </div>
        </div>

        {/* Thumbnail Section */}
        <div className="w-[15%] grid grid-rows-5 gap-2 ml-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={`relative w-full h-full cursor-pointer`}
              >
                <Skeleton height="100%" />
              </div>
            ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[60%] flex flex-col justify-between">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            <Skeleton width="70%" />
          </h2>
          <p className="text-base font-medium">
            <Skeleton count={3} />
          </p>
        </div>

        <div className="w-full flex items-center gap-5 py-2 lg:py-0">
          <div className="w-fit text-white flex gap-2 items-center py-0.5 px-2 rounded-sm">
            <Skeleton circle width={24} height={24} />
            <Skeleton width={30} />
          </div>
          <p>
            <Skeleton width={100} />
          </p>
        </div>

        <div className="flex items-center gap-5 py-2 lg:py-0">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Skeleton circle width={24} height={24} />
                <Skeleton width={80} />
              </div>
            ))}
        </div>

        <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row items-start lg:items-center justify-between lg:pr-16">
          <div className="flex flex-col gap-1">
            <Skeleton width={80} />
            <Skeleton width={150} />
          </div>

          <div className="flex items-center gap-5 text-nowrap">
            <Skeleton width={120} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomDetailsSkeletonList = () => {
  return (
    <div className="px-10">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <RoomDetailsSkeleton key={index} />
        ))}
    </div>
  );
};

export default RoomDetailsSkeletonList;
