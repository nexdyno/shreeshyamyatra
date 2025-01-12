"use client";

import { useDispatch } from "react-redux";
import { googleAuth } from "@/lib/helperFunctions/authHelpers";
import { FcGoogle } from "react-icons/fc";
import { userSignIn } from "@/redux/authSlice";
import Image from "next/image";

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
}) => {
  const dispatch = useDispatch();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleNext = () => {
    if (emailOrPhone) {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
    } else {
      if (!validatePhone(phone)) {
        setError("Please enter a valid 10-digit phone number.");
        return;
      }
    }
    if (!password) {
      setError("Password cannot be empty.");
      return;
    }
    setError("");
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
    handleNext(); // Validate inputs first
    if (error) return; // Prevent submission if there are errors

    const data = emailOrPhone ? { email, password } : { phone, password };

    dispatch(userSignIn(data));
    // dispatch(userSignIn({ email, password }));
  };

  return (
    <div className="w-full max-w-md">
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
        onClick={handleSubmit}
        className="w-full bg-primaryGradient text-white py-2 rounded-md mb-4 hover:bg-blue-800"
      >
        Submit
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
