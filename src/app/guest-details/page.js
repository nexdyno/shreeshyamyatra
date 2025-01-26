"use client";

import { checkUserSession } from "@/redux/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import GuestInformation from "@/container/GuestDetails/GuestInformation";
import BookingConfirmPopUp from "@/componets/common/BookingConfirmPopUp";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter(); // Use Next.js router
  const { session } = useSelector((state) => state.auth);
  const { isConfirmOrder } = useSelector((state) => state.data);

  // Ensure the user is authenticated
  useEffect(() => {
    const verifySession = async () => {
      try {
        await dispatch(checkUserSession()).unwrap();

        // Redirect to home if the session is invalid
        if (session?.user?.email === "" || session?.user?.phone === "") {
          // router.push("/");
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        // router.push("/"); // Redirect in case of an error
      }
    };

    verifySession();
  }, [dispatch, session?.user?.email, session?.user?.phone, router]);

  return (
    <>
      <div className="lg:mt-20 lg:px-40">
        <GuestInformation />
      </div>
      {isConfirmOrder && <BookingConfirmPopUp />}
    </>
  );
}
