"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { googleAuth, newUserSignUp } from "@/redux/authSlice";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabase/supabaseClient.js";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Make sure to import the styles

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
  confirmPassword,
  setConfirmPassword,
  passwordVisible,
  setPasswordVisible,
  togglePasswordVisibility,
}) => {
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = async () => {
    setError("");

    if (step === 1) {
      alert("emailOrPhone" + emailOrPhone + "email" + email + "phone" + phone);
      if (email && !validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (phone && !isValidPhoneNumber(phone)) {
        // alert(phone);
        setError("Please enter a valid phone number.");
        return;
      }

      // Send OTP for phone verification
      if (phone) {
        try {
          // const { error } = await supabase.auth.signInWithOtp({
          //   phone,
          // });
          await dispatch(sendOtp(phone)).unwrap();
          toast.success("OTP send successfully");
          if (error) {
            setError(`Error sending OTP: ${error.message}`);
            return;
          }
        } catch (err) {
          console.error("Error sending OTP:", err);
          setError("Failed to send OTP. Please try again.");
          return;
        }
      }
    }

    if (step === 2 && !emailOtp) {
      setError("Please enter the OTP sent to your email or phone.");
      return;
    }

    if (step === 2 && phone) {
      // Verify OTP for phone
      try {
        const { data, error } = await supabase.auth.verifyOtp({
          phone,
          token: emailOtp,
          type: "sms",
        });
        if (error) {
          setError(`Error verifying OTP: ${error.message}`);
          return;
        }
        alert("Phone number verified successfully!");
      } catch (err) {
        console.error("Error verifying OTP:", err);
        setError("Failed to verify OTP. Please try again.");
        return;
      }
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

  const handleGoogleLogin = async () => {
    const currentPath = window.location.href; // or use router.asPath for path only
    dispatch(googleAuth(currentPath));
  };

  const handleSubmit = async () => {
    alert("phones" + phone);
    alert(email);

    if (email === "email") {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
    } else if (phone === "phone") {
      if (!isValidPhoneNumber(phone)) {
        setError("Please enter a valid phone number.");
        return;
      }
    }
    if (!password || !confirmPassword) {
      setError("Please enter and confirm your password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const data = email === "email" ? { email, password } : { phone, password };

    alert(data);

    try {
      // If the phone or email is already registered, sign in. Otherwise, create a new account
      const { user, error } = await supabase.auth.signUp(data);
      if (error) {
        setError(`Error during signup: ${error.message}`);
        return;
      }

      // Update user password in Supabase after verification
      await supabase.auth.updateUser({ password });

      alert("Account created successfully!");
      onClose();
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Failed to create account. Please try again.");
    }

    dispatch(newUserSignUp(data));
    // dispatch(newUserSignUp({ email, password }));
  };

  const handleResendOtp = async () => {
    setError(""); // Clear previous errors

    // Check if the user has selected email or phone
    if (emailOrPhone === "email" && validateEmail(email)) {
      try {
        // Resend OTP to email (assuming you're using Supabase for this)
        const { error } = await supabase.auth.signInWithOtp({
          email: email,
        });
        if (error) {
          setError(`Error sending OTP to email: ${error.message}`);
          return;
        }
        alert("OTP sent to your email address.");
      } catch (err) {
        console.error("Error sending OTP to email:", err);
        setError("Failed to resend OTP to email. Please try again.");
      }
    } else if (emailOrPhone === "phone" && validatePhone(phone)) {
      try {
        // Resend OTP to phone (assuming you're using Supabase for this)
        const { error } = await supabase.auth.signInWithOtp({
          phone: phone,
        });
        if (error) {
          setError(`Error sending OTP to phone: ${error.message}`);
          return;
        }
        alert("OTP sent to your phone number.");
      } catch (err) {
        console.error("Error sending OTP to phone:", err);
        setError("Failed to resend OTP to phone. Please try again.");
      }
    } else {
      setError("Please enter a valid email or phone number.");
    }
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
              {/* <input
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your Phone number"
                className="w-full text-sm px-4 py-2 border rounded-md mb-2 focus:outline-none focus:border-primary font-poppins"
              /> */}

              <PhoneInput
                international
                defaultCountry="IN" // Set India as the default country
                value={phone}
                onChange={setPhone}
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
                <Image src="/gmail.png" alt="gmail" height={25} width={25} />
              </span>{" "}
              <span className="hover:text-primary" onClick={handleWelcomePhone}>
                <Image src="/phone.png" alt="phone" height={25} width={25} />
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

          {/* Resend OTP Button */}
          <div className="text-center mt-4">
            <button
              onClick={handleResendOtp}
              className="bg-gray-200 text-sm text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
            >
              Resend OTP
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <label className="block text-gray-700 mb-2">Set Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a strong password"
              className="w-full text-sm px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2"
            >
              {passwordVisible ? (
                <FaEyeSlash className="text-gray-600" size={20} />
              ) : (
                <FaEye className="text-gray-600" size={20} />
              )}
            </button>
          </div>
          <label className="block text-gray-700 mb-2 mt-4">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full text-sm px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2"
            >
              {passwordVisible ? (
                <FaEyeSlash className="text-gray-600" size={20} />
              ) : (
                <FaEye className="text-gray-600" size={20} />
              )}
            </button>
          </div>

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
