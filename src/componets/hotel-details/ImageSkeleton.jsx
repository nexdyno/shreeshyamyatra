import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ImageSkeleton = () => {
  return (
    <div className="flex flex-col  gap-4 p-4">
      {/* Skeleton for Left Image */}
      <div className="w-full flex items-center px-5 lg:px-10 gap-10">
        <div className="w-full lg:w-1/2">
          <Skeleton height={400} />
        </div>

        {/* Skeleton for Right Image */}
        <div className="w-full lg:w-1/2 hidden lg:block">
          <Skeleton height={400} />
        </div>
      </div>

      {/* Skeleton for Details */}
      <div className="w-full flex items-center lg:pt-5 px-10">
        <div className="mt-4 w-full">
          <Skeleton width={200} height={30} />
          <Skeleton width="80%" height={20} className="mt-2" />
          <Skeleton width="60%" height={20} className="mt-2" />

          <div className="mt-4">
            <Skeleton width={100} height={20} />
            <Skeleton width="40%" height={20} className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSkeleton;
