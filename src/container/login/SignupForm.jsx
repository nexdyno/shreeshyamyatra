"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { newUserSignUp } from "@/redux/authSlice";
import { googleAuth } from "@/lib/helperFunctions/authHelpers";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

const SignupForm = ({
  step,
  setStep,
  email,
  setEmail,
  emailOtp,
  setEmailOtp,
  password,
  setPassword,
  error,
  setError,
  onClose,
  handleSignUp,
  handleSignIn,
  handleWelcomeEmail,
  handleWelcomePhone,
  emailOrPhone,
  phone,
  setPhone,
}) => {
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Ensures a valid 10-digit phone number
    return phoneRegex.test(phone);
  };
  const handleNext = () => {
    setError("");

    if (step === 1) {
      if (emailOrPhone && !validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (!emailOrPhone && !validatePhone(phone)) {
        setError("Please enter a valid 10-digit phone number.");
        return;
      }
    }

    if (step === 2 && !emailOtp) {
      setError("Please enter the OTP sent to your email or phone.");
      return;
    }

    if (step === 3 && !password) {
      setError("Please enter a valid password.");
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("Account created successfully!");
      onClose();
    }
  };

  const handleBack = () => {
    setError("");
    if (step > 1) setStep(step - 1);
  };

  // const handleGoogleLogin = async () => {
  //   const { data, error } = await googleAuth();
  //   if (error) {
  //     alert("Login failed: " + error.message);
  //   } else {
  //     alert("Login successful!");
  //   }
  // };
  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await googleAuth();

      if (error) {
        console.error("Google login failed:", error);
        alert(`Login failed: ${error.message}`);
        return;
      }

      if (data) {
        console.log("Google login successful:", data);
        alert("Login successful!");
        // Perform post-login actions, e.g., navigation or user state update.
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleSubmit = () => {
    if (emailOrPhone === "email") {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
    } else if (emailOrPhone === "phone") {
      if (!validatePhone(phone)) {
        setError("Please enter a valid 10-digit phone number.");
        return;
      }
    }
    if (!password) {
      setError("Please enter a valid password.");
      return;
    }
    const data =
      emailOrPhone === "email" ? { email, password } : { phone, password };
    console.log("Submitted Data:", data);

    dispatch(newUserSignUp(data));
    // dispatch(newUserSignUp({ email, password }));
  };

  return (
    <div className="w-full max-w-md">
      {step === 1 && (
        <>
          {emailOrPhone ? (
            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@gmail.com"
                className="w-full text-sm px-4 py-2 border rounded-md mb-2 focus:outline-none focus:border-primary font-poppins"
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your Phone number"
                className="w-full text-sm px-4 py-2 border rounded-md mb-2 focus:outline-none focus:border-primary font-poppins"
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            </div>
          )}
          <button
            onClick={handleNext}
            className="w-full bg-primaryGradient text-white py-2 rounded-md mb-4 hover:bg-blue-800"
          >
            Continue
          </button>

          <div className="text-center text-gray-500 my-2 cursor-pointer">
            <p className="text-base font-medium text-primary mb-2">
              {" "}
              SignIn and SignUp With{" "}
            </p>
            <div className="flex items-center justify-center gap-5 mb-2">
              <span className="hover:text-primary" onClick={handleWelcomeEmail}>
                <Image src="/gmail.png" height={25} width={25} />
              </span>{" "}
              <span className="hover:text-primary" onClick={handleWelcomePhone}>
                <Image src="/phone.png" height={25} width={25} />
              </span>
            </div>
          </div>

          <div className="text-center text-gray-500 my-4 cursor-pointer ">
            <span className="hover:text-primary" onClick={handleSignUp}>
              Signup
            </span>{" "}
            /
            <span className="hover:text-primary" onClick={handleSignIn}>
              SignIn
            </span>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="w-full border flex items-center justify-center py-2 rounded-md hover:bg-gray-100"
            aria-label="Sign in with Google"
          >
            <FcGoogle size={20} className="mr-2" />
            Sign in with Google
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="block text-gray-700 mb-2">OTP</label>
          <input
            type="text"
            value={emailOtp}
            onChange={(e) => setEmailOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full text-sm px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-primary"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="bg-gray-200 text-sm text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-primaryGradient text-sm text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <label className="block text-gray-700 mb-2">Set Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a strong password"
            className="w-full text-sm px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-primary"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="bg-gray-200 text-sm text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-primaryGradient text-sm text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupForm;
