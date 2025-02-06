"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { PiBuildings, PiHandshake } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { SlLogin } from "react-icons/sl";
import SearchComponent from "../home/SearchComponent";
import { useAppContext } from "@/context/AppContext";
import LoginModal from "@/container/login/LoginModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { supabase } from "@/lib/supabase/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  checkUserSession,
  logoutUser,
  setLoginIsModalOpen,
} from "@/redux/authSlice";
import toast from "react-hot-toast";
import BookingCard from "@/container/profile/BookingCard";
import BookingSidebar from "@/container/profile/BookingSidebar";
import ProfileForm from "@/container/profile/ProfileForm";
import ProfileFormSidebar from "@/container/profile/ProfileFormSidebar";
import { fetchAllBookingById } from "@/redux/dataSlice";
import { MdOutlinePrivacyTip } from "react-icons/md";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter
  const [showLogin, setShowLogin] = useState(false);
  const [type, setType] = useState("");
  const dropdownRef = useRef(null);
  const { userData, isLoginModalOpen, session } = useSelector(
    (state) => state.auth
  );
  const { routePathName, setRoutePathName } = useAppContext();
  const [token, setToken] = useState("");
  const [guestName, setGuestName] = useState(""); // To store guest name
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown visibility
  const [isScrolled, setIsScrolled] = useState(
    routePathName === "/" ? false : true
  );

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  useEffect(() => {
    if (session) {
      const user = session.user;
      if (user && !user.is_anonymous) {
        setToken(session.access_token || "");
        setGuestName(user.user_metadata?.name || "Guest");
      } else {
        setToken("");
      }
    }
  }, [JSON.stringify(session)]); // Dependency should be session directly

  useEffect(() => {
    setIsScrolled(routePathName === "/" ? false : true);
  }, [routePathName]);

  const handleScroll = () => {
    if (window.scrollY >= window.innerHeight / 2) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (session?.user?.email === "" && session?.user?.phone === "")
        setShowLogin(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const data = [
    {
      icon: <PiBuildings size={30} />,
      heading: "All Property",
      desc: "Book now ",
      link: "/properties",
    },
    {
      icon: <IoCallOutline size={30} />,
      heading: "7073390557",
      desc: "Call us to Book now",
      link: "/contacts",
    },
    {
      icon: <MdOutlinePrivacyTip size={30} />,
      heading: "Privacy & Policy",
      desc: "Read now",
      link: "/privacy-policy",
    },
  ];

  const handleLogoutBtn = async () => {
    try {
      // Dispatch logoutUser and handle the response
      await dispatch(logoutUser()).unwrap();

      // Clear local token or any other necessary client-side data
      setToken("");

      // Redirect to the home page after successful logout
      window.location.href = "/";
    } catch (err) {
      // Catch and log any error from the thunk
      toast.error("Error during logout:", err);
    }
  };
  const handleProfileClick = () => {
    // Navigate to the profile page or handle profile-related logic
    window.location.href = "/profile"; // Example redirect
  };

  const handleUserAllBooking = async () => {
    try {
      const id = session?.user?.id;

      if (!id) {
        throw new Error("User ID is not available in the session");
      }

      // Dispatch the Redux action to fetch bookings
      await dispatch(fetchAllBookingById(id)).unwrap();
    } catch (error) {
      console.error("Error fetching user bookings:", error.message || error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full min-h-[12vh] flex justify-around md:justify-between items-center border border-gray-400 md:px-2 lg:px-10 font-poppins bg-white fixed top-0 left-0 right-0 z-30 transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="relative py-2 px-2 lg:px-5 lg:w-[15%]">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="logo"
              height={100}
              width={120}
              className=""
            />
          </Link>
        </div>
        {!isScrolled ? (
          <div className="hidden lg:block lg:w-[75%] px-2 xl:px-5 cursor-pointer">
            <div className="w-full h-full flex items-center justify-center">
              {data.map((item, index) => (
                <Link key={index} href={item?.link}>
                  <div
                    key={index}
                    className="border-r h-full px-2 xl:px-4 w-fit group hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2 xl:gap-5 xl:px-3 xl:py-5">
                      <div className="group-hover:text-primary">
                        {item.icon}
                      </div>
                      <div className="text-wrap">
                        <p className="text-sm font-bold group-hover:text-primary text-nowrap">
                          {item.heading}
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-primary text-nowrap">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden lg:block lg:w-[65%] cursor-pointer px-2 transition-all ease-in-out duration-300">
            <SearchComponent isScrolled={isScrolled} />
          </div>
        )}

        <div
          className="lg:w-[20%] h-full flex items-center justify-center"
          // onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}
        >
          {token ? (
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative flex items-center gap-2 cursor-pointer"
            >
              <FaUserCircle size={24} className="text-primary" />
              <p className="text-sm font-semibold text-gray-700">
                Welcome, {guestName}
              </p>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className=" hidden lg:block absolute top-10 right-0 bg-white border shadow-lg rounded-md w-48">
                  <ul className="py-2">
                    <li
                      onClick={() => {
                        setType("booking");
                        handleUserAllBooking();
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      My Bookings
                    </li>
                    <li
                      onClick={() => setType("profileform")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      My Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <span>Call Us: 7073390557</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link href="/help">Help</Link>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                      onClick={handleLogoutBtn}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-3 bg-primaryGradient py-2 px-3 rounded-md"
            >
              <div>
                <SlLogin size={20} className="text-white" />
              </div>
              <p className="text-sm font-semibold text-nowrap text-white">
                Login / Signup
              </p>
            </button>
          )}
        </div>
      </div>
      {showLogin ? (
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      ) : (
        ""
      )}
      {type === "booking" && (
        <BookingSidebar type={type} closeSidebar={() => setType("")} />
      )}
      {type === "profileform" && (
        <ProfileFormSidebar type={type} closeSidebar={() => setType("")} />
      )}
    </>
  );
}
