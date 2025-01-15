"use client";

import BookingConfirmPopUp from "@/componets/common/BookingConfirmPopUp";
import GuestInformation from "@/container/GuestDetails/GuestInformation";
import { anonymouslySignin, setUserSession } from "@/redux/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const dispatch = useDispatch();
  const { sessionFromLocal } = useSelector((state) => state.auth);

  const { isConfirmOrder } = useSelector((state) => state.data);

  useEffect(() => {
    if (!sessionFromLocal) {
      initializeSession(dispatch);
    }
  }, [dispatch]);

  return (
    <>
      <div className="lg:mt-20 lg:px-40">
        <GuestInformation />
      </div>
      {isConfirmOrder ? <BookingConfirmPopUp /> : ""}
    </>
  );
}
