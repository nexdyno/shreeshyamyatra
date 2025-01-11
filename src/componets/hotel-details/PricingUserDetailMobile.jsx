"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useDispatch } from "react-redux";
import { setTotalSummary } from "@/redux/dataSlice";
import Link from "next/link";

export default function PricingUserDetailMobile({ scrollToPricing }) {
  const { isOTPModalOpen, setIsOTPModalOpen } = useAppContext();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Full Name Validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Mobile Number Validation
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number";
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsOTPModalOpen(!isOTPModalOpen);
    }
  };

  const dispatch = useDispatch();
  // const roomAndGuest = JSON.parse(localStorage.getItem("roomAndGuest"));
  // const bookingDate = JSON.parse(localStorage.getItem("bookingDate"));
  // const selectedRoom = JSON.parse(localStorage.getItem("selectedRoom"));
  // const matchedProperty = JSON.parse(localStorage.getItem("matchedProperty"));
  const [roomAndGuest, setRoomAndGuest] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [matchedProperty, setMatchedProperty] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safely access localStorage
      setRoomAndGuest(
        localStorage.getItem("roomAndGuest")
          ? JSON.parse(localStorage.getItem("roomAndGuest"))
          : null
      );
      setBookingDate(
        localStorage.getItem("bookingDate")
          ? JSON.parse(localStorage.getItem("bookingDate"))
          : null
      );
      setSelectedRoom(
        localStorage.getItem("selectedRoom")
          ? JSON.parse(localStorage.getItem("selectedRoom"))
          : null
      );
      setMatchedProperty(
        localStorage.getItem("matchedProperty")
          ? JSON.parse(localStorage.getItem("matchedProperty"))
          : null
      );
    }
  }, []);

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
    <>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Pricing Details Section */}
        <div>
          <p className="font-semibold text-lg text-black mb-4">
            Room name And Price
          </p>
          <div className="flex items-center justify-between text-secondary text-base font-semibold bg-gray-100 py-3 px-4 rounded-md">
            <p className=" text-secondary">
              Rs .{Math.round(billingData?.roomPriceWIthGST)}
            </p>{" "}
            <p> {selectedRoom?.name}</p>
          </div>

          {/* Coupon Applied */}
          {/*         
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 text-blue-500" />
            <span className="text-sm">FREEDOM78 coupon applied</span>
          </div>
          <span className="text-green-500 font-semibold">-₹1366</span>
        </div> */}

          <div className=" py-5">
            <h2 className="text-lg font-semibold mb-2">Pricing details</h2>

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
            <div className="flex justify-between py-1">
              <p> Convenience Fee </p>
              <p className="text-secondary font-semibold">
                Rs {Math.round(billingData?.commission)}
              </p>
            </div>
            <hr />
            <div className="flex justify-between py-1 font-semibold text-lg">
              <p>Total Price</p>
              <p>Rs {Math.round(billingData?.totalPrice)}</p>
            </div>
            <hr />
          </div>
        </div>

        {/* Booking Details Section */}
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="text-lg font-semibold mb-4">Your booking details</h2>

            {/* Full Name Input */}
            <div className="mb-4">
              <label className="text-sm text-gray-600" htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="First name and last name"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Mobile Number Input */}
            <div className="mb-4">
              <label className="text-sm text-gray-600" htmlFor="mobileNumber">
                Mobile number
              </label>
              <div className="flex items-center gap-2 mt-1">
                <span className="border px-4 py-2 rounded-l-lg bg-gray-100 text-gray-500">
                  +91
                </span>
                <input
                  id="mobileNumber"
                  type="text"
                  placeholder="Enter mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 ${
                    errors.mobileNumber
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* Email Address Input */}
            <div className="mb-6">
              <label className="text-sm text-gray-600" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="abc@xyz.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Book Now Button */}
          <div className="relative">
            <button
              type="submit"
              className="w-full bg-primaryGradient text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Book now & pay at hotel
            </button>
          </div>
        </form>
      </div>

      <div className="lg:hidden fixed bottom-14 bg-white w-full shadow-md py-2 px-3 border border-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-primary">
            Rs {Math.round(billingData?.totalPrice)}
          </span>
          {/* <span className="line-through text-gray-400">$1,500</span> */}
          {/* <span className="text-orange-500 font-medium text-lg">20% OFF</span> */}
        </div>
        <Link href="/guest-details">
          <button
            // onClick={scrollToPricing}
            onClick={handleBook}
            className="border border-blue-500 text-white bg-primaryGradient rounded-sm px-4 py-2 hover:bg-blue-100 transition"
          >
            Continue to Book
          </button>
        </Link>
      </div>
    </>
  );
}
