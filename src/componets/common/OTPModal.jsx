import { setIsOTPModalOpen, verifyOtp } from "@/redux/authSlice";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const OTPModal = ({ handleSendOtp, phone }) => {
  const dispatch = useDispatch();
  const { isOTPModalOpen } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const token = otp.join("");
    if (token.length === 6) {
      try {
        await dispatch(verifyOtp({ phone, token })).unwrap();
        toast.success("OTP Verified Successfully!");
        dispatch(setIsOTPModalOpen()); // Close modal on success
      } catch (error) {
        console.error("OTP Verification Failed:", error);
        toast.error(error); // Display meaningful error message
      }
    } else {
      toast.error("Please enter a valid 6-digit OTP.");
    }
  };

  if (!isOTPModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#182532] p-10 rounded-md shadow-lg text-center text-white w-11/12 sm:w-2/3 md:w-1/3 relative">
        <h2 className="text-2xl mb-4 font-bold">Enter Verification Code</h2>
        <p className="mb-4 text-sm">
          We have sent a verification code to this +91 {phone}. Please enter the
          verification code below.
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-10 h-12 text-center text-xl bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleVerify}
          className="bg-primaryGradient text-white py-2 px-6 rounded-md"
        >
          Verify
        </button>

        {/* Resend Code */}
        <p className="mt-4 text-sm">
          Didn’t get the code?{" "}
          <button onClick={handleSendOtp} className="text-primary underline">
            Resend code
          </button>
        </p>

        {/* Close Button */}
        <button
          onClick={() => dispatch(setIsOTPModalOpen())}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
