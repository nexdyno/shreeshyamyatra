"use client";

import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import {
  checkUserSession,
  googleAuth,
  sendOtp,
  userSignIn,
  verifyOtp,
} from "@/redux/authSlice";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Make sure to import the styles
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import toast from "react-hot-toast";

const Signin = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
  handleSignUp,
  handleSignIn,
  handleWelcomeEmail,
  handleWelcomePhone,
  emailOrPhone,
  phone,
  setPhone,
  emailOtp,
  setEmailOtp,
  onClose,
}) => {
  const dispatch = useDispatch();
  const {
    userData,
    status,
    session,
    error: authError,
  } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1); // Step for OTP modal handling
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  useEffect(() => {
    dispatch(checkUserSession());
    if (status === "succeeded" && userData) {
      // Perform any additional actions, such as redirecting
    }
  }, []);

  const handleNext = async () => {
    if (emailOrPhone) {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
    } else {
      alert("Valid Phone Number" + phone);
      if (!isValidPhoneNumber(phone)) {
        setError("Please enter a valid 10-digit phone number.");
        return;
      }
      try {
        alert("Valid Phone Number in try" + phone);
        // Send OTP for phone verification
        const { error } = await supabase.auth.signInWithOtp({ phone });
        if (error) {
          setError(`Error sending OTP: ${error.message}`);
          return;
        }
        alert("OTP sent to your phone.");
        setStep(2); // Move to OTP step
      } catch (err) {
        console.error("Error sending OTP:", err);
        setError("Failed to send OTP. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const currentPath = window.location.href; // or use router.asPath for path only
    dispatch(googleAuth(currentPath));
  };

  const handleVerifyOtp = async () => {
    try {
      setError(""); // Clear any existing errors
      const token = emailOtp; // OTP entered by the user
      dispatch(verifyOtp({ phone, token })).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Phone number verified successfully!");
          onClose(); // Close the modal
        } else {
          setError(result.payload || "Failed to verify OTP. Please try again.");
        }
      });
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError("Failed to verify OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    setError(""); // Clear previous errors

    // Check if the user has selected email or phone
    if (email && validateEmail(email)) {
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
    } else if (phone && isValidPhoneNumber(phone)) {
      try {
        // Resend OTP to phone (assuming you're using Supabase for this)
        // const { error } = await supabase.auth.signInWithOtp({
        //   phone: phone,
        // });
        const Id = session?.user?.id;
        await dispatch(sendOtp(phone, Id)).unwrap();
        toast.success("OTP send successfully");
        if (error) {
          setError(`Error sending OTP to phone: ${error.message}`);
          return;
        }
      } catch (err) {
        console.error("Error sending OTP to phone:", err);
        setError("Failed to resend OTP to phone. Please try again.");
      }
    } else {
      setError("Please enter a valid email or phone number.");
    }
  };

  const handleSubmit = () => {
    handleNext(); // Validate inputs first
    if (error) return; // Prevent submission if there are errors

    const data = emailOrPhone ? { email, password } : { phone, password };

    dispatch(userSignIn(data));
    // dispatch(userSignIn({ email, password }));
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
            type="text"
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

          {!emailOrPhone && (
            <button
              onClick={handleNext}
              className="w-full bg-primaryGradient text-white py-2 rounded-md mb-4 hover:bg-blue-800"
            >
              Continue
            </button>
          )}

          {emailOrPhone && (
            <>
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="w-full text-sm px-4 py-2 border rounded-md mb-2 focus:outline-none focus:border-primary font-poppins"
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              </div>
              <button
                // onClick={handleSubmit}
                onClick={handleNext}
                className="w-full bg-primaryGradient text-white py-2 rounded-md mb-4 hover:bg-blue-800"
              >
                Submit
              </button>
            </>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <label className="block text-gray-700 mb-2">Enter OTP</label>
          <input
            type="text"
            value={emailOtp}
            onChange={(e) => setEmailOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full text-sm px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-primary font-poppins"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-primaryGradient text-white py-2 rounded-md mb-4 hover:bg-blue-800"
          >
            Verify OTP
          </button>
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
      <div className="text-center text-gray-500 my-4 cursor-pointer">
        <span className="hover:text-primary" onClick={handleSignUp}>
          Signup
        </span>{" "}
        /{" "}
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
    </div>
  );
};

export default Signin;
