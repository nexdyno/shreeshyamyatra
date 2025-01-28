import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingOfferForYou() {
  return (
    <div className="overflow-x-auto lg:overflow-hidden">
      <div className="flex items-center justify-center lg:grid lg:grid-cols-3 gap-6 overflow-x-auto w-full">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden transition duration-300 p-5 flex-shrink-0 w-72 lg:w-full"
          >
            <Skeleton height={192} className="w-full h-48 object-cover" />
            <div className="p-4">
              <Skeleton height={20} width="70%" className="mb-2" />
              <Skeleton height={14} width="50%" className="mb-2" />
              <Skeleton height={14} width="90%" className="mb-4" />
              <Skeleton height={36} width="50%" className="rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
