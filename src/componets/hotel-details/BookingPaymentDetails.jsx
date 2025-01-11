// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import DateSelector from "../home/DateSelector";
// import RoomGuestSelector from "../home/RoomGuestSelector";

// export default function BookingPaymentDetails() {
//   const roomAndGuest = JSON.parse(localStorage.getItem("roomAndGuest"));
//   const bookingDate = JSON.parse(localStorage.getItem("bookingDate"));
//   const selectedRoom = JSON.parse(localStorage.getItem("selectedRoom"));

//   const [extraGuest, setExtraGuests] = useState(0);
//   const [discountedPrice, setDiscountedPrice] = useState(0);
//   const [originalPrice, setOriginalPrice] = useState(0);
//   const [coupon, setCoupon] = useState("");
//   const [isCouponApplied, setIsCouponApplied] = useState(false);
//   const [inputCoupon, setInputCoupon] = useState("");
//   const [totalPrice, setTotalPrice] = useState(0);

//   const GUEST_EXTRA_FEE = 350;
//   const DISCOUNT_RATE = 0;

//   const validCoupons = {
//     FREEDOM78: 400,
//     SAVE50: 300,
//   };

//   useEffect(() => {
//     if (!roomAndGuest || !selectedRoom || !bookingDate) return;

//     const allowedGuests = roomAndGuest.room * 3;
//     const extraGuests = Math.max(roomAndGuest.guest - allowedGuests, 0);
//     setExtraGuests(extraGuests);

//     const startDate = new Date(bookingDate.startDate);
//     const endDate = new Date(bookingDate.endDate);
//     const numberOfDays = Math.max(
//       Math.ceil((endDate - startDate) / (1000 * 3600 * 24)),
//       1
//     );
//     const TAXES_AND_FEES = (selectedRoom?.rate * 25) / 100;
//     const RoomPriceWithGST = selectedRoom.rate * (1 + 12 / 100);
//     const calculatedOriginalPrice =
//       RoomPriceWithGST * numberOfDays * roomAndGuest.room;
//     const calculatedDiscountedPrice =
//       calculatedOriginalPrice * (1 - DISCOUNT_RATE);
//     const calculatedTotalPrice =
//       calculatedDiscountedPrice +
//       TAXES_AND_FEES +
//       extraGuests * GUEST_EXTRA_FEE;

//     setOriginalPrice(calculatedOriginalPrice);
//     setDiscountedPrice(calculatedDiscountedPrice);
//     setTotalPrice(calculatedTotalPrice);

//     const priceInfo = {
//       numberOfDays: numberOfDays,
//       discountedPrice: calculatedDiscountedPrice,
//       extraPrice: extraGuest * GUEST_EXTRA_FEE * numberOfDays,
//       taxesAndFees: TAXES_AND_FEES * numberOfDays,
//       totalPrice: calculatedTotalPrice,
//     };

//     localStorage.setItem("priceInfo", JSON.stringify(priceInfo));
//   }, [roomAndGuest, selectedRoom, bookingDate]);

//   const applyCoupon = () => {
//     if (!validCoupons[inputCoupon]) {
//       alert("Invalid coupon code. Please try again.");
//       return;
//     }

//     const discountAmount = validCoupons[inputCoupon];
//     const newDiscountedPrice = discountedPrice - discountAmount;
//     const newTotalPrice =
//       newDiscountedPrice + TAXES_AND_FEES + extraGuest * GUEST_EXTRA_FEE;

//     setCoupon(inputCoupon);
//     setIsCouponApplied(true);
//     setDiscountedPrice(newDiscountedPrice);
//     setTotalPrice(newTotalPrice);

//     const priceInfo = {
//       discountedPrice: newDiscountedPrice,
//       extraPrice: extraGuest * GUEST_EXTRA_FEE * numberOfDays,
//       taxesAndFees: TAXES_AND_FEES,
//       totalPrice: newTotalPrice,
//     };

//     localStorage.setItem("priceInfo", JSON.stringify(priceInfo));
//   };

//   const removeCoupon = () => {
//     const restoredDiscountedPrice = originalPrice * (1 - DISCOUNT_RATE);
//     const restoredTotalPrice =
//       restoredDiscountedPrice + TAXES_AND_FEES + extraGuest * GUEST_EXTRA_FEE;

//     setCoupon("");
//     setIsCouponApplied(false);
//     setDiscountedPrice(restoredDiscountedPrice);
//     setTotalPrice(restoredTotalPrice);

//     const priceInfo = {
//       discountedPrice: restoredDiscountedPrice,
//       extraPrice: extraGuest * GUEST_EXTRA_FEE * numberOfDays,
//       taxesAndFees: TAXES_AND_FEES,
//       totalPrice: restoredTotalPrice,
//     };

//     localStorage.setItem("priceInfo", JSON.stringify(priceInfo));
//   };

//   const priceInfo = JSON.parse(localStorage.getItem("priceInfo"));

//   return (
//     <div className="flex justify-end items-center">
//       <div className="bg-white shadow-lg border w-full max-w-md p-5 font-poppins">
//         {/* Price Section */}
//         <div className="border-b pb-5">
//           <div className="flex justify-between items-center">
//             <p className="text-2xl font-semibold text-secondary">
//               Rs {Math.round(discountedPrice)}
//             </p>
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-400 line-through">
//                 Rs {Math.round(originalPrice)}
//               </span>
//               <span className="text-red-500 text-sm font-semibold">
//                 {Math.round(DISCOUNT_RATE * 100)}% OFF
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Booking Date Selector */}
//         <div className="border-b py-5">
//           <div className="flex items-center justify-between">
//             <DateSelector />
//             <RoomGuestSelector />
//           </div>
//           <div className="mt-3 text-secondary text-sm font-semibold bg-gray-100 py-3 px-4 rounded-md">
//             {selectedRoom?.name}
//           </div>
//         </div>

//         {/* Coupon Section */}
//         <div className="border-b py-5">
//           {isCouponApplied ? (
//             <div>
//               <div className="flex items-center space-x-3">
//                 <div className="bg-blue-100 text-blue-500 text-sm font-semibold py-1 px-3 rounded-sm">
//                   {coupon} coupon applied
//                 </div>
//                 <p className="text-red-500 font-bold">
//                   -Rs {validCoupons[coupon]}
//                 </p>
//               </div>
//               <button
//                 onClick={removeCoupon}
//                 className="mt-3 text-red-500 underline text-sm font-semibold"
//               >
//                 Remove Coupon
//               </button>
//             </div>
//           ) : (
//             <div>
//               <input
//                 type="text"
//                 value={inputCoupon}
//                 onChange={(e) => setInputCoupon(e.target.value)}
//                 placeholder="Enter coupon code"
//                 className="w-full px-3 py-2 border rounded-md text-gray-700"
//               />
//               <button
//                 onClick={applyCoupon}
//                 className="mt-3 text-blue-500 underline text-sm font-semibold"
//               >
//                 Apply Coupon
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Total Price */}
//         <div className="border-b py-5">
//           <div className="flex justify-between py-1">
//             <p>Extra Guests: {priceInfo?.extraPrice / 350}</p>
//             <p className="text-secondary font-semibold">
//               Rs {priceInfo?.extraPrice || 0}
//             </p>
//           </div>
//           <div className="mt-3 flex justify-between items-center">
//             <p className="font-semibold text-gray-800">Total Price</p>
//             <div className="text-right">
//               <p className="text-gray-700 text-sm">
//                 Including taxes & fees {priceInfo?.taxesAndFees}
//               </p>
//               <p className="text-secondary font-semibold">
//                 Rs {priceInfo?.totalPrice || 0}
//               </p>
//             </div>
//           </div>
//         </div>

//         <Link href="/guest-details">
//           <button className="w-full mt-5 bg-primaryGradient text-white text-lg font-semibold py-2 rounded-sm hover:opacity-90 transition">
//             Continue to Book
//           </button>
//         </Link>

//         {/* Footer Section */}
//         <div className="mt-5 text-gray-600 text-sm space-y-2">
//           <p>12 people booked this hotel today</p>
//           <p className="text-blue-500 underline cursor-pointer">
//             Cancellation Policy
//           </p>
//           <p className="text-blue-500 underline cursor-pointer">
//             Follow safety measures advised at the hotel
//           </p>
//           <p className="text-gray-500">
//             By proceeding, you agree to our{" "}
//             <span className="text-blue-500 underline cursor-pointer">
//               Guest Policies
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DateSelector from "../home/DateSelector";
import RoomGuestSelector from "../home/RoomGuestSelector";
import { useDispatch } from "react-redux";
import { setTotalSummary } from "@/redux/dataSlice";
import toast from "react-hot-toast";

export default function BookingPaymentDetails() {
  const dispatch = useDispatch();
  const roomAndGuest = JSON.parse(localStorage.getItem("roomAndGuest"));
  const bookingDate = JSON.parse(localStorage.getItem("bookingDate"));
  const selectedRoom = JSON.parse(localStorage.getItem("selectedRoom"));
  const matchedProperty = JSON.parse(localStorage.getItem("matchedProperty"));

  const [billingData, setBillingData] = useState({
    numberOfDays: 1,
    commission: 0,
    roomPriceWIthGST: 0,
    extraPersonPrice: 0,
    finalRoomPrice: 0,
    totalPrice: 0,
  });

  const calculateBillingData = () => {
    // Calculate number of days
    const startDate = new Date(bookingDate?.startDate);
    const endDate = new Date(bookingDate?.endDate);
    const numberOfDays =
      startDate && endDate
        ? Math.max(Math.ceil((endDate - startDate) / (1000 * 3600 * 24)), 1)
        : 1;

    // Calculate commission
    const roomRate = selectedRoom?.rate || 0;
    const commissionPercentage = matchedProperty?.margin / 100;
    const commission = roomRate
      ? roomRate *
        commissionPercentage *
        (roomAndGuest?.room || 1) *
        numberOfDays
      : 0;

    // Calculate room price with GST

    const gstAmount = (matchedProperty?.GST / 100) * selectedRoom?.rate;
    const roomPriceWIthGST = selectedRoom?.rate + gstAmount;

    // Calculate extra person price
    const extraPersonPrice =
      (roomAndGuest?.extraPerson || 0) * 350 * numberOfDays;

    // Calculate final room price
    const finalRoomPrice = roomPriceWIthGST * numberOfDays;

    // Calculate total price
    const totalPrice = finalRoomPrice + extraPersonPrice + commission;

    // Update billing data
    setBillingData({
      numberOfDays,
      commission,
      roomPriceWIthGST,
      extraPersonPrice,
      finalRoomPrice,
      totalPrice,
    });
  };
  useEffect(() => {
    calculateBillingData();
    // Only call if dependencies change
  }, [
    JSON.stringify(bookingDate),
    JSON.stringify(selectedRoom),
    JSON.stringify(roomAndGuest),
  ]);

  const handleBook = () => {
    dispatch(setTotalSummary(billingData));
  };

  return (
    <div className="flex justify-end items-center">
      <div className="bg-white shadow-lg border w-full max-w-md p-5 font-poppins">
        {/* Price Section */}
        <div className="border-b pb-5">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold text-secondary">
              Rs .{Math.round(billingData?.roomPriceWIthGST)}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 line-through"></span>
              <span className="text-red-500 text-sm font-semibold"></span>
            </div>
          </div>
        </div>

        {/* Booking Date Selector */}
        <div className="border-b py-5">
          <div className="flex items-center justify-between">
            <DateSelector />
            <RoomGuestSelector />
          </div>
          <div className="mt-3 text-secondary text-sm font-semibold bg-gray-100 py-3 px-4 rounded-md">
            {selectedRoom?.name}
          </div>
        </div>

        {/* Total Price */}

        <div className="border-b py-5">
          <div className="flex gap-2 py-1">
            <p>Nights</p>
            <p className="text-secondary font-semibold">
              {Math.round(billingData?.numberOfDays)}
            </p>
          </div>
          <div className="flex justify-between py-1">
            <p>Room Price</p>
            <p className="text-secondary font-semibold">
              Rs {Math.round(billingData?.finalRoomPrice)}
            </p>
          </div>
          <div className="flex justify-between py-1">
            <p>Extra Guests: {roomAndGuest?.extraPerson}</p>
            <p className="text-secondary font-semibold">
              Rs {Math.round(billingData?.extraPersonPrice)}
            </p>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <p className="font-semibold text-gray-800">Total Price</p>
            <div className="text-right">
              <p className="text-gray-700 text-sm space-x-4">
                Convenience Fee (All inclusive){" "}
                <span> {Math.round(billingData?.commission)}</span>
              </p>
              <p className="text-secondary font-semibold">
                Rs {Math.round(billingData?.totalPrice)}
              </p>
            </div>
          </div>
        </div>

        <Link href="/guest-details">
          <button
            onClick={handleBook}
            className="w-full mt-5 bg-primaryGradient text-white text-lg font-semibold py-2 rounded-sm hover:opacity-90 transition"
          >
            Continue to Book
          </button>
        </Link>

        {/* Footer Section */}
        <div className="mt-5 text-gray-600 text-sm space-y-2">
          <p>12 people booked this hotel today</p>
          <p className="text-blue-500 underline cursor-pointer">
            Cancellation Policy
          </p>
          <p className="text-blue-500 underline cursor-pointer">
            Follow safety measures advised at the hotel
          </p>
          <p className="text-gray-500">
            By proceeding, you agree to our{" "}
            <span className="text-blue-500 underline cursor-pointer">
              Guest Policies
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
