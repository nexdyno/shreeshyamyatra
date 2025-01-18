"use client";

import { sendOtp, setIsOTPModalOpen } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import OTPModal from "../common/OTPModal";
import { use, useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import toast from "react-hot-toast";

export default function FormComponent({
  formData,
  setFormData,
  setValid,
  valid,
  setStep,
}) {
  const { session, isOTPModalOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name) newErrors.name = "First name is required.";

    // Validate email only if not already provided by the session
    if (!session?.user?.email && !formData.email) {
      newErrors.email = "Email is required.";
    }

    // Validate mobile only if not already provided by the session
    if (
      !session?.user?.phone &&
      (!formData.mobile || formData.mobile.length < 10)
    ) {
      newErrors.mobile = "Valid mobile number is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors for the field on change if session doesn't already provide it
    if (session?.user && (name === "email" || name === "mobile")) return;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handlePhoneChange = (value) => {
    const formattedValue = value.startsWith("+") ? value : `+${value}`; // Ensure the value starts with '+'
    setFormData({ ...formData, mobile: formattedValue });

    if (!session?.user?.phone) {
      setErrors((prevErrors) => ({ ...prevErrors, mobile: "" }));
    }
  };

  const handleSendOtp = async (value) => {
    // if (validateForm()) {
    //   const phone = formData?.mobile;
    //   dispatch(sendOtp(phone));
    //   if (!value) {
    //     dispatch(setIsOTPModalOpen());
    //   }
    // }
    // validateForm();
    // onContinue();

    if (validateForm()) {
      const phone = formData?.mobile;
      if (!phone) {
        toast.error("Please enter a phone number.");
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch("/api/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, id: session?.user?.id }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("OTP sent successfully. Please check your phone.");
          setIsLoading(false);
          if (!value) {
            dispatch(setIsOTPModalOpen());
          }
        } else {
          toast.success(data.error || "Failed to send OTP Try again");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error sending OTP.");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleVerify = () => {
    if (validateForm()) {
      setValid(true);
      setStep(2);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-fit font-poppins">
        <div className="bg-white w-full p-6 rounded-md font-poppins overflow-y-auto">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
            Enter Your Details
          </h3>
          <h3 className="text-base text-gray-500 leading-7 pb-7">
            Please review the details and ensure all required information is
            filled in for your booking.
          </h3>
          <form
            className="space-y-4 w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  placeholder="John"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary text-sm ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={session?.user?.email || formData?.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary text-sm ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="overflow-hidden ">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Mobile No
                </label>
                <PhoneInput
                  country="in"
                  value={session?.user?.phone || formData?.mobile}
                  onChange={handlePhoneChange}
                  inputClass={`w-full border rounded-md px-3 py-2 text-sm overflow-hidden ${
                    errors.mobile ? "border-red-500" : ""
                  }`}
                  containerClass="w-full relative z-[50]"
                  dropdownClass="absolute z-[100] bg-white h-[40vh] shadow-lg border rounded-md overflow-auto" // Ensure dropdown
                  inputProps={{
                    name: "mobile",
                    required: true,
                  }}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>
            </div>
          </form>
        </div>
        <button
          type="submit"
          onClick={() => {
            session?.user?.phone ? handleVerify() : handleSendOtp(false);
          }}
          disabled={valid}
          className={` hidden lg:block w-[90%] bg-primaryGradient font-semibold text-base text-white py-2 rounded-md shadow hover:bg-blue-600 transition ${
            valid ? "opacity-50" : ""
          }`}
        >
          {!valid ? (isLoading ? "Sending..." : "Verify") : "Details Verified"}
        </button>
        <button
          type="submit"
          onClick={() => {
            session?.user?.phone ? handleVerify() : handleSendOtp(false);
          }}
          className={`lg:hidden w-[90%] bg-primaryGradient font-semibold text-base text-white py-2 rounded-md shadow hover:bg-blue-600 transition`}
        >
          {session?.user?.phone
            ? "Continoue"
            : isLoading
            ? "Sending..."
            : "Verfy"}
        </button>
      </div>
      {isOTPModalOpen ? (
        <OTPModal
          handleSendOtp={handleSendOtp}
          phone={formData?.mobile}
          setValid={setValid}
          setStep={setStep}
        />
      ) : (
        ""
      )}
    </>
  );
}
