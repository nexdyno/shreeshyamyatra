"use client";

import { bookingCreate, setIsConfirmOrder } from "@/redux/dataSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { IoChevronBackOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { parse, format } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Razorpay from "razorpay";
import Script from "next/script";

export default function PaymentBar({ formData, setStep }) {
  const dispatch = useDispatch();
  const {
    totalSummary,
    selectedRoom,
    bookingDate,
    roomAndGuest,
    matchedProperty,
  } = useSelector((state) => state.data);
  const [roomTag, setRoomTag] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);

  // const loadRazorpayScript = () => {
  //   return new Promise((resolve, reject) => {
  //     const script = document.createElement("script");
  //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //     script.onload = () => resolve(true);
  //     script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
  //     document.body.appendChild(script);
  //   });
  // };
  const [formattedDates, setFormattedDates] = useState({
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    if (selectedRoom && roomAndGuest) {
      const { room_book } = generateUniqueIds();

      setRoomTag({
        id: room_book,
        rate: selectedRoom?.rate,
        room_id: selectedRoom?.id,
        quantity: roomAndGuest?.room,
        room_name: selectedRoom?.name,
        special_requirements: null,
      });
    }
  }, [selectedRoom, roomAndGuest]);

  useEffect(() => {
    if (bookingDate?.startDate && bookingDate?.endDate) {
      const formatDate = (dateString) => {
        const parsedDate = parse(dateString, "MMM d, yyyy", new Date());
        if (parsedDate) {
          return format(parsedDate, "yyyy-MM-dd");
        } else {
          console.error(`Invalid date format: ${dateString}`);
          return "";
        }
      };

      setFormattedDates({
        startDate: formatDate(bookingDate?.startDate),
        endDate: formatDate(bookingDate?.endDate),
      });
    }
  }, [bookingDate]);

  const generateUniqueIds = () => {
    return {
      id: uuidv4(),
      booking_id: uuidv4(),
      room_book: uuidv4(),
    };
  };

  const prepareGuestData = (formData) => {
    const { id, booking_id } = generateUniqueIds();

    return {
      id,
      property_id: selectedRoom?.property_id,
      name: formData?.firstName,
      contact: formData?.mobile,
      email: formData?.email,
      check_in_date: formattedDates.startDate,
      check_out_date: formattedDates.endDate,
      guest_check_in_time: matchedProperty?.check_in_time,
      guest_check_out_time: matchedProperty?.check_out_time,
      number_of_children: formData?.children,
      number_of_adults: formData?.adults,
      room_assigned: [roomTag],
      bill_clear: false,
      created_at: new Date(),
      updated_at: new Date(),
      booking_id,
      booking_status: "pending",
      payments: [],
      paid_to_status: "paidFromGuest",
      is_manual_entry: false,
      total_amount: totalSummary?.totalPrice,
    };
  };

  // const handelBooking = async () => {
  //   const guestData = prepareGuestData(formData);

  //   try {
  //     const result = await dispatch(bookingCreate(guestData)).unwrap();
  //     toast.success("Booking created successfully!");
  //     if (!matchedProperty?.isAuto) {
  //       dispatch(setIsConfirmOrder(true));
  //     }
  //   } catch (error) {
  //     console.error("Error occurred during booking:", error);
  //     toast.error(
  //       "Failed to create booking: " + (error?.message || "Unknown error")
  //     );
  //   }
  // };

  // const handelBooking = async () => {
  //   const guestData = prepareGuestData(formData);
  //   setIsProcessing(true);
  //   try {
  //     const response = await fetch("/api/payment", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         amount: guestData?.total_amount,
  //         guestData,
  //       }),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("Order created:", data);

  //       // Call Razorpay Checkout with the order ID
  //       const options = {
  //         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  //         amount: amount * 100,
  //         currency: "INR",
  //         name: "Shree Shyam Yatra",
  //         description: "Payment for the Room Booking",
  //         order_id: data.id,
  //         handler: function (response) {
  //           console.log("Payment successful:", response);
  //           // Handle payment success
  //         },
  //         prefill: {
  //           name: guestData.name,
  //           email: guestData.email,
  //           contact: guestData.contact,
  //         },
  //         notes: {
  //           address: "Khatu shyam",
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };

  //       const rzp = new window.Razorpay(options);
  //       rzp.open();
  //     } else {
  //       console.error("Error creating order:", data.error);
  //     }
  //   } catch (error) {
  //     console.error("Payment failed", error);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };
  console.log("Razorpay Key ID:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

  const handelBooking = async () => {
    const guestData = prepareGuestData(formData);
    setIsProcessing(true);
    try {
      // const isScriptLoaded = await loadRazorpayScript();
      // if (!isScriptLoaded) {
      //   toast.error("Failed to load Razorpay SDK");
      //   return;
      // }
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: guestData?.total_amount,
          guestData,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Order created:", data);
        const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        if (!razorpayKey) {
          throw new Error(
            "Razorpay key is missing. Check environment variables."
          );
        }

        // Call Razorpay Checkout with the order ID
        const options = {
          key_id: razorpayKey,
          amount: guestData.total_amount * 100, // Ensure this is the correct amount
          currency: "INR",
          name: "Shree Shyam Yatra",
          description: "Payment Booking",
          order_id: data.orderId, // Adjust according to your response structure
          handler: function (response) {
            console.log("Payment successful:", response);

            // After successful payment, show toast
            toast.success("Booking successfully created!");

            // Handle further actions like updating state or navigating
          },
          prefill: {
            name: guestData.name,
            email: guestData.email,
            contact: guestData.contact,
          },
          notes: {
            address: "Khatu shyam",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("Error creating order:", data.error);
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Payment failed", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (
    !totalSummary ||
    !selectedRoom ||
    !bookingDate ||
    !roomAndGuest ||
    !matchedProperty
  ) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white p-5 font-poppins mt-5 w-full ">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h3 className="text-2xl font-semibold pb-4">{selectedRoom?.name}</h3>
      <div className="w-full flex gap-2">
        <div className="w-[70%] space-y-2">
          <p className="text-sm text-secondary py-1 text-start">
            Near Patel Nagar Metro, Block 2, Khatu
          </p>
          <div className="flex items-center text-start">
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md mr-2">
              4.1 ★
            </span>
            <span className="text-sm text-secondary text-start">
              (368 Ratings), Very Good
            </span>
          </div>
        </div>

        {/* Hotel Image */}
        <div className="w-[30%] mb-4">
          <Image
            src="/assets/home/image1.svg"
            alt="Hotel Shree Shyam"
            width={200}
            height={150}
            className=""
          />
        </div>
      </div>

      {/* Booking Details */}
      <div className="text-sm flex flex-col gap-5 py-5 rounded-md font-semibold text-black w-full">
        <div className="flex items-center justify-between border-t border-b p-2">
          <p className="">
            <span>{bookingDate?.startDate}</span> -{" "}
            <span>{bookingDate?.endDate}</span>
          </p>
          <p className="text-nowrap">
            <span>Room , {roomAndGuest?.room}</span>{" "}
            <span>Guest , {roomAndGuest?.guest}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <p className="text-nowrap text-green-700">Check-In</p>
              <p className="text-center">{matchedProperty?.check_in_time}</p>
            </div>
            <div className="space-y-1">
              <p className="text-nowrap text-red-700">Check-Out</p>
              <p className="text-center">{matchedProperty?.check_out_time}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <p className="text-nowrap text-green-700">Adults</p>
              <p className="text-center">{formData?.adults}</p>
            </div>
            <div className="space-y-1">
              <p className="text-nowrap text-red-700">Children</p>
              <p className="text-center">{formData?.children}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}

      <div className="border-b py-5">
        <div className="flex gap-2 py-1">
          <p>Nights</p>
          <p className="text-secondary font-semibold">
            {Math.round(totalSummary?.numberOfDays)}
          </p>
        </div>
        <div className="flex justify-between py-1">
          <p>Room Price</p>
          <p className="text-secondary font-semibold">
            Rs {Math.round(totalSummary?.finalRoomPrice)}
          </p>
        </div>
        <div className="flex justify-between py-1">
          <p>Extra Guests: {roomAndGuest?.extraPerson}</p>
          <p className="text-secondary font-semibold">
            Rs {Math.round(totalSummary?.extraPersonPrice)}
          </p>
        </div>
        {/* <div className="mt-3 flex justify-between items-center mr-4 lg:pr-0"> */}
        <div className="text-right">
          <p className="text-gray-700 text-sm space-x-4 text-nowrap flex items-center justify-between">
            <p> Convenience Fee (All inclusive)</p>{" "}
            <span> {Math.round(totalSummary?.commission)}</span>
          </p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-800 text-nowrap">
              Total Price
            </p>
            <p className="text-secondary font-semibold">
              Rs {Math.round(totalSummary?.totalPrice)}
            </p>
          </div>
        </div>
        {/* </div> */}
      </div>
      <div className="flex justify-between lg:justify-end pt-10 font-poppins">
        <button
          onClick={() => setStep(1)}
          className=" text-black py-2 text-base rounded-sm hover:text-primary transition flex items-center gap-2 font-semibold lg:hidden"
        >
          <IoChevronBackOutline size={20} />
          Back
        </button>
        <button
          onClick={handelBooking}
          className="bg-primaryGradient text-white py-2 px-4 rounded-sm hover:bg-blue-600 transition text-base"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
