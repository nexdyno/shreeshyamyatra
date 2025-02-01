"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { FcGoogle, FcPhone } from "react-icons/fc";
import SignupForm from "./SignupForm";
import Signin from "./Signin";
import Image from "next/image";

const images = ["/assets/home/hoteloffer.jpg", "/assets/home/offer1.jpg"];

export default function LoginModal({ isOpen, onClose }) {
  const [showForm, setShowForm] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState(true);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [password, setPassword] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleSignIn = () => setShowForm(true);
  const handleSignUp = () => setShowForm(false);
  const handleWelcomeEmail = () => setEmailOrPhone(true);
  const handleWelcomePhone = () => setEmailOrPhone(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 font-poppins">
      <div className="bg-white rounded-lg shadow-lg w-[90%] lg:w-[60%] h-[80vh] flex overflow-hidden relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close"
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Image Slider Section */}
        <div className="w-1/2 hidden lg:block relative overflow-hidden">
          <div className="w-full h-full relative">
            <Image
              src={images[currentImage]}
              alt={`Slide ${currentImage + 1}`}
              fill
              className="object-cover transition-opacity duration-1000"
            />
          </div>
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentImage === index ? "bg-white" : "bg-gray-500"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-2xl font-bold mb-6">Welcome</h1>
          {showForm ? (
            <Signin
              emailOrPhone={emailOrPhone}
              handleWelcomeEmail={handleWelcomeEmail}
              handleWelcomePhone={handleWelcomePhone}
              handleSignUp={handleSignUp}
              handleSignIn={handleSignIn}
              step={step}
              setStep={setStep}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              error={error}
              setError={setError}
              phone={phone}
              setPhone={setPhone}
              passwordVisible={passwordVisible}
              setPasswordVisible={setPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              emailOtp={emailOtp}
              setEmailOtp={setEmailOtp}
              onClose={onClose}
            />
          ) : (
            <SignupForm
              handleWelcomeEmail={handleWelcomeEmail}
              handleWelcomePhone={handleWelcomePhone}
              emailOrPhone={emailOrPhone}
              handleSignUp={handleSignUp}
              handleSignIn={handleSignIn}
              step={step}
              setStep={setStep}
              email={email}
              setEmail={setEmail}
              emailOtp={emailOtp}
              setEmailOtp={setEmailOtp}
              password={password}
              setPassword={setPassword}
              error={error}
              setError={setError}
              phone={phone}
              setPhone={setPhone}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              passwordVisible={passwordVisible}
              setPasswordVisible={setPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
