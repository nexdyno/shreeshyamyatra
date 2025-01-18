import { setIsConfirmOrder } from "@/redux/dataSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

const BookingConfirmPopUp = () => {
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      dispatch(setIsConfirmOrder(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const closePopup = () => {
    dispatch(setIsConfirmOrder(false));
    window.location.href = "/";
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black/70 backdrop-blur-sm fixed top-0 left-0 z-50 px-5 font-poppins">
      <div
        ref={popupRef}
        className="w-full sm:max-w-[50%] lg:max-w-[35%] rounded-xl flex flex-col items-center gap-4 bg-white p-10 relative"
      >
        {/* Cancel button */}
        <button
          onClick={closePopup}
          className="w-8 h-8 rounded-full bg-[white] border border-[#E7E7E7] drop-shadow absolute -top-4 -right-4 flex items-center justify-center"
        >
          <Image
            src={"/assets/cross.svg"}
            alt="cancel"
            width={25}
            height={25}
            objectFit="contain"
          />
        </button>

        <Image
          src={"/assets/check.svg"}
          alt="confirmed"
          width={100}
          height={100}
          objectFit="contain"
        />
        <h1 className="text-xl font-semibold">Your Booking is Done</h1>
        <p className="leading-7 font-semibold text-center text-red-600">
          Thanks for Booking! Booking is not confirmed yet. It will be confirmed
          within 24 hours.
        </p>
        <div className="flex items-center text-sm  justify-between lg:justify-center lg:gap-4 w-full ">
          <button className="text-nowrap bg-[#223142] py-2 px-4 sm:px-6 lg:px-8 lg:border lg:border-[#223142] rounded-[4px] text-white">
            View Order
          </button>
          <Link href="/">
            <button className="border-[#223142] border py-2 text-nowrap px-2 sm:px-4 rounded-[4px] text-[#223142] flex items-center gap-2">
              Back to Home
              {/*               
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  fill="none"
                >
                  <path
                    d="M12.585 0.961428L19.335 7.71143C19.4399 7.81594 19.5231 7.94014 19.5799 8.07688C19.6367 8.21363 19.6659 8.36024 19.6659 8.5083C19.6659 8.65637 19.6367 8.80298 19.5799 8.93972C19.5231 9.07647 19.4399 9.20066 19.335 9.30518L12.585 16.0552C12.3737 16.2665 12.087 16.3853 11.7881 16.3853C11.4892 16.3853 11.2026 16.2665 10.9913 16.0552C10.7799 15.8438 10.6612 15.5572 10.6612 15.2583C10.6612 14.9594 10.7799 14.6728 10.9913 14.4614L15.8203 9.63237L2.03906 9.63237C1.74069 9.63237 1.45455 9.51384 1.24357 9.30286C1.03259 9.09188 0.914063 8.80573 0.914063 8.50737C0.914063 8.209 1.03259 7.92285 1.24357 7.71187C1.45455 7.50089 1.74069 7.38237 2.03906 7.38237L15.8203 7.38237L10.9903 2.5533C10.779 2.34196 10.6602 2.05532 10.6602 1.75643C10.6602 1.45754 10.779 1.1709 10.9903 0.959554C11.2017 0.748209 11.4883 0.629475 11.7872 0.629475C12.0861 0.629475 12.3727 0.748209 12.5841 0.959554L12.585 0.961428Z"
                    fill="#223142"
                  />
                </svg>
              </span> */}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmPopUp;
