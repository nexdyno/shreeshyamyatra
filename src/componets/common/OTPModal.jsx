import { useAppContext } from "@/context/AppContext";
import React, { useState, useRef } from "react";

const OTPModal = () => {
  const { isOTPModalOpen, setIsOTPModalOpen } = useAppContext();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Handle OTP input changes
  const handleChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if filled
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace to move focus
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerify = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length === 6) {
      alert("OTP Verified Successfully!");
      setIsOTPModalOpen(!isOTPModalOpen);
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  if (!isOTPModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#182532] p-10 rounded-md shadow-lg text-center text-white w-11/12 sm:w-2/3 md:w-1/3">
        <h2 className="text-2xl mb-4 font-bold">Enter verification code</h2>
        <p className="mb-4 text-sm">
          We have sent a Verification code on this +9182****36 number. Please
          enter the verification code below
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
          <button
            onClick={() => alert("Code Resent!")}
            className="text-primary underline"
          >
            Resend code
          </button>
        </p>

        {/* Close Button */}
        <button
          onClick={() => setIsOTPModalOpen(!isOTPModalOpen)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
