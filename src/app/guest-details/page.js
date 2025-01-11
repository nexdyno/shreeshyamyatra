"use client";

import BookingConfirmPopUp from "@/componets/common/BookingConfirmPopUp";
import GuestInformation from "@/container/GuestDetails/GuestInformation";
import React from "react";
import { useSelector } from "react-redux";

export default function page() {
  const { isConfirmOrder } = useSelector((state) => state.data);

  return (
    <>
      <div className="lg:mt-20 lg:px-40">
        <GuestInformation />
      </div>
      {isConfirmOrder ? <BookingConfirmPopUp /> : ""}
    </>
  );
}
