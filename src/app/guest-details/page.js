"use client";

import BookingConfirmPopUp from "@/componets/common/BookingConfirmPopUp";
import GuestInformation from "@/container/GuestDetails/GuestInformation";
import { checkUserSession } from "@/redux/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const dispatch = useDispatch();
  const { session } = useSelector((state) => state.auth);

  const { isConfirmOrder } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!session?.user?.email && !session?.user?.phone) {
  //     window.location.href = "/";
  //   }
  // }, [JSON.stringify(session)]);

  return (
    <>
      <div className="lg:mt-20 lg:px-40">
        <GuestInformation />
      </div>
      {isConfirmOrder ? <BookingConfirmPopUp /> : ""}
    </>
  );
}
