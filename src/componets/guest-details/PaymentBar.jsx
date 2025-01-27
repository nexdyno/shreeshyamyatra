"use client";

import {
  bookingCreate,
  fetchBookingData,
  fetchPropertyById,
  saveGuestData,
  savePaymentDetail,
  setIsConfirmOrder,
} from "@/redux/dataSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { IoChevronBackOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { parse, format } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Razorpay from "razorpay";
import Script from "next/script";
import PaymentSkeleton from "./PaymentSkeleton";

export default function PaymentBar({ formData, setStep, valid }) {
  const dispatch = useDispatch();
  const { bookingData, matchedProperty, property } = useSelector(
    (state) => state.data
  );
  const { session } = useSelector((state) => state.auth);
  const [roomTag, setRoomTag] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentTableId, setPaymentTableId] = useState(null);
  const [guestData, setGuestData] = useState({
    name: "",
    email: "",
    contact: "",
    payments: [],
    paid_to_status: "paidFromGuest",
    booking_status: "pending",
    bill_clear: true,
  });

  const generateUniqueIds = () => {
    return {
      payment_table_id: uuidv4(),
    };
  };

  const sendMsgToGuest = async ({ phone, message }) => {
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, message }),
      });

      if (response.ok) {
        return response;
      }
    } catch (error) {
      console.error("Error sending OTP.", error);
    }
  };

  useEffect(() => {
    if (!formData || !bookingData) return;
    if (!paymentTableId) {
      const { payment_table_id } = generateUniqueIds();
      setPaymentTableId(payment_table_id);
    }
    setGuestData((prevGuestData) => {
      const updatedGuestData = {
        ...prevGuestData,
        name: formData?.name,
        email: session?.user?.email || formData?.email,
        contact: session?.user?.phone || formData?.mobile,
        payments: [paymentTableId],
      };

      if (!bookingData[0]?.is_manual_entry) {
        updatedGuestData.booking_status = "confirmed";
      }

      return updatedGuestData;
    });
  }, [bookingData, formData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("my_id");
        if (!id) {
          throw new Error("Booking ID not found in local storage");
        }
        await dispatch(fetchBookingData(id)).unwrap();
      } catch (error) {
        console.error("Error while fetching booking data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const numerOfDays = () => {
    const checkIn = new Date(bookingData?.[0]?.check_in_date);
    const checkOut = new Date(bookingData?.[0]?.check_out_date);
    const differenceInMilliseconds = checkOut - checkIn;
    return differenceInMilliseconds / (1000 * 60 * 60 * 24);
  };

  const handelBooking = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: bookingData?.[0]?.total_amount,
          guestData,
          id: bookingData[0]?.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
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
          order_id: data.orderId,
          handler: async function (response) {
            // Dispatch Redux action to save guest data directly to Supabase
            try {
              const paymentdata = {
                id: paymentTableId,
                date: new Date().toISOString(),
                payment_method: "",
                amount: bookingData?.[0]?.total_amount,
                paid_to: "19d19b90-3b41-4f48-9fc7-b0a78255a5a4",
                paid_from: bookingData?.[0]?.profile_id,
                payment_type: "guestRelated",
                razorpay_receiptId: data?.receiptId,
                razorpay_payment_id: response?.razorpay_payment_id,
                razorpay_order_id: response?.razorpay_order_id,
                razorpay_signature: response?.razorpay_signature,
              };

              await dispatch(
                saveGuestData({
                  guestData,
                  id: bookingData[0]?.id,
                })
              ).unwrap();
              await dispatch(savePaymentDetail({ paymentdata })).unwrap();
              if (!bookingData?.[0]?.is_manual_entry) {
                toast.success("Booking successfully created!");

                const message = `Namaste! ${guestData?.name}, 🙏

Greetings from https://YatraDham.Org

Your room booking is currently pending for confirmation.

Please complete the payment at your earliest convenience using the payment link provided: -

 Booking Details:
Surat Bhawan - ${bookingData?.[0]?.room_assigned?.[0]?.room_name} 
Room Type :-${bookingData?.[0]?.room_assigned?.[0]?.room_name}
Check-In :- ${bookingData?.[0]?.check_in_date}
Check-Out :- ${bookingData?.[0]?.check_out_date}
Days/Nights :- ${numerOfDays()}
No of Rooms :- ${bookingData?.[0]?.room_assigned?.[0]?.quantity}
No of Guests :- ${bookingData?.[0]?.number_of_adults}

If you have already completed the payment and received a confirmation, please ignore this message.

Do you have any questions or concerns regarding this booking?

To process your booking, simply click on the link below:
👉 Link: https://yatradham.org/khatu-surat-bhavan.html
`;
                await sendMsgToGuest({ phone: bookingData?.contact, message });
              } else {
                dispatch(setIsConfirmOrder(true));
                const message = `Namaste! ${guestData?.name}, 🙏

Greetings from https://YatraDham.Org

Your room booking is currently pending for confirmation.

Please complete the payment at your earliest convenience using the payment link provided: -

 Booking Details:
Surat Bhawan - ${bookingData?.[0]?.room_assigned?.[0]?.room_name} 
Room Type :-${bookingData?.[0]?.room_assigned?.[0]?.room_name}
Check-In :- ${bookingData?.[0]?.check_in_date}
Check-Out :- ${bookingData?.[0]?.check_out_date}
Days/Nights :- ${numerOfDays()}
No of Rooms :- ${bookingData?.[0]?.room_assigned?.[0]?.quantity}
No of Guests :- ${bookingData?.[0]?.number_of_adults}
If you have already completed the payment and received a confirmation, please ignore this message.

Do you have any questions or concerns regarding this booking?

To process your booking, simply click on the link below:
👉 Link: https://yatradham.org/khatu-surat-bhavan.html
`;
                await sendMsgToGuest({ phone: guestData?.contact, message });
              }
            } catch (error) {
              console.error("Error saving guest data", error);
              toast.error("Error saving guest data. Please try again.");
            }
          },
          prefill: {
            name: guestData?.name,
            email: guestData?.email,
            contact: guestData?.contact,
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

  if (isLoading) {
    return (
      <div className="w-full h-full px-5 py-4">
        <PaymentSkeleton />
      </div>
    );
  }
  return (
    <div className="bg-white p-5 font-poppins mt-5 w-full ">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h3 className="text-2xl font-semibold pb-4">
        {bookingData?.[0]?.room_assigned?.[0]?.room_name}
      </h3>
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
            <span>{bookingData?.[0]?.check_in_date}</span> -{" "}
            <span>{bookingData?.[0]?.check_out_date}</span>
          </p>
          <p className="text-nowrap">
            <span>Room , {bookingData?.[0]?.room_assigned?.[0]?.quantity}</span>{" "}
            <span>Guest , {bookingData?.[0]?.number_of_adults}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <p className="text-nowrap text-green-700">Check-In</p>
              <p className="text-center">
                {bookingData?.[0]?.guest_check_out_time}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-nowrap text-red-700">Check-Out</p>
              <p className="text-center">
                {bookingData?.[0]?.guest_check_in_time}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <p className="text-nowrap text-green-700">Adults</p>
              <p className="text-center">
                {bookingData?.[0]?.number_of_adults}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}

      <div className="border-b py-5">
        <div className="flex gap-2 py-1">
          <p>Nights</p>
          <p className="text-secondary font-semibold">{numerOfDays()}</p>
        </div>
        <div className="flex justify-between py-1">
          <p>Room Price</p>
          <p className="text-secondary font-semibold">
            Rs {Math.round(bookingData?.[0]?.total_roomPrice)}
          </p>
        </div>
        <div className="flex justify-between py-1">
          <p>Extra Guests: {bookingData?.[0]?.extra_guest?.extraPerson}</p>
          <p className="text-secondary font-semibold">
            Rs {Math.round(bookingData?.[0]?.extra_guest?.extraPrice)}
          </p>
        </div>
        {/* <div className="mt-3 flex justify-between items-center mr-4 lg:pr-0"> */}
        <div className="text-right">
          <p className="text-gray-700 text-sm space-x-4 text-nowrap flex items-center justify-between">
            <p> Convenience Fee (All inclusive)</p>{" "}
            <span> Rs {Math.round(bookingData?.[0]?.our_charges)}</span>
          </p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-800 text-nowrap">
              Total Price
            </p>
            <p className="text-secondary font-semibold">
              Rs {Math.round(bookingData?.[0]?.total_amount)}
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
          disabled={!valid}
          className={`bg-primaryGradient text-white py-2 px-4 rounded-sm hover:bg-blue-600 transition text-base ${
            !valid ? "opacity-50" : ""
          }`}
        >
          {isProcessing ? "...Loading" : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
