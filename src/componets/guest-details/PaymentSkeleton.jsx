import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function PaymentSkeleton() {
  return (
    // <div className="bg-white p-5 font-poppins mt-5 w-full">
    //   <Skeleton width="100%" height={24} style={{ marginBottom: "16px" }} />
    //   <div className="w-full flex gap-2">
    //     <div className="w-[70%] space-y-2">
    //       <Skeleton width="60%" height={16} />
    //       <div className="flex items-center">
    //         <Skeleton width={40} height={24} />
    //         <Skeleton width="50%" height={16} style={{ marginLeft: "8px" }} />
    //       </div>
    //     </div>
    //     <div className="w-[30%] mb-4">
    //       <Skeleton width={200} height={150} />
    //     </div>
    //   </div>

    //   <div className="text-sm flex flex-col gap-5 py-5 rounded-md font-semibold text-black w-full">
    //     <div className="flex items-center justify-between border-t border-b p-2">
    //       <Skeleton width="40%" height={16} />
    //       <Skeleton width="40%" height={16} />
    //     </div>
    //     <div className="flex items-center justify-between">
    //       <div className="flex items-center gap-4">
    //         <div className="space-y-1">
    //           <Skeleton width="60px" height={16} />
    //           <Skeleton width="60px" height={16} />
    //         </div>
    //         <div className="space-y-1">
    //           <Skeleton width="60px" height={16} />
    //           <Skeleton width="60px" height={16} />
    //         </div>
    //       </div>
    //       <div className="space-y-1">
    //         <Skeleton width="60px" height={16} />
    //         <Skeleton width="60px" height={16} />
    //       </div>
    //     </div>
    //   </div>

    //   <div className="border-b py-5">
    //     <div className="flex gap-2 py-1">
    //       <Skeleton width="30%" height={16} />
    //       <Skeleton width="20%" height={16} />
    //     </div>
    //     <div className="flex justify-between py-1">
    //       <Skeleton width="40%" height={16} />
    //       <Skeleton width="20%" height={16} />
    //     </div>
    //     <div className="flex justify-between py-1">
    //       <Skeleton width="60%" height={16} />
    //       <Skeleton width="20%" height={16} />
    //     </div>
    //     <div className="text-right">
    //       <Skeleton width="70%" height={16} style={{ marginBottom: "8px" }} />
    //       <div className="flex justify-between">
    //         <Skeleton width="40%" height={16} />
    //         <Skeleton width="30%" height={16} />
    //         <Skeleton width="40%" height={16} />
    //         <Skeleton width="30%" height={16} />
    //         <Skeleton width="40%" height={16} />
    //         <Skeleton width="30%" height={16} />
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex justify-between lg:justify-end pt-10 font-poppins">
    //     <Skeleton width={100} height={36} />
    //     <Skeleton width={100} height={36} />
    //   </div>
    // </div>
    <div className="bg-white p-5 font-poppins mt-5 w-full">
      {/* Title */}
      <Skeleton className="mb-4" height={24} width="60%" />

      {/* Subtitle */}
      <Skeleton className="mb-6" height={16} width="80%" />

      {/* Image & Ratings */}
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="rounded-md" height={80} width={100} />
        <div className="flex-1">
          <Skeleton className="mb-2" height={16} width="50%" />
          <Skeleton height={16} width="70%" />
        </div>
      </div>

      {/* Dates & Details */}
      <div className="flex justify-between mb-4">
        <Skeleton height={16} width="40%" />
        <Skeleton height={16} width="40%" />
      </div>
      <Skeleton className="mb-4" height={16} width="30%" />

      <div className="border-b border-gray-300 mb-4"></div>

      {/* Price Details */}
      <div className="flex justify-between mb-2">
        <Skeleton height={16} width="40%" />
        <Skeleton height={16} width="20%" />
      </div>
      <div className="flex justify-between mb-2">
        <Skeleton height={16} width="40%" />
        <Skeleton height={16} width="20%" />
      </div>
      <div className="flex justify-between mb-2">
        <Skeleton height={16} width="40%" />
        <Skeleton height={16} width="20%" />
      </div>

      <div className="border-b border-gray-300 mb-4"></div>

      {/* Total Price & Button */}
      <div className="flex justify-between items-center">
        <Skeleton height={16} width="40%" />
        <Skeleton className="rounded-md" height={36} width="30%" />
      </div>
    </div>
  );
}
