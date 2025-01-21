"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ onClose, type, setType }) => {
  const { session } = useSelector((state) => state.auth);

  // Menu items for logged-in users
  const loggedInMenuItems = [
    { name: "Profile", link: "#" },
    { name: "Bookings", link: "#" },
    { name: "Terms and Conditions", link: "#" },
    { name: "Privacy and Policy", link: "#" },
    { name: "Term of Use", link: "#" },
    { name: "About Us", link: "#" },
    { name: "Call us", link: "#" },
    { name: "Log Out", link: "#" },
  ];

  // Menu items for non-logged-in users
  const notLoggedInMenuItems = [
    { name: "Log in or create an account", link: "#" },
    { name: "Property policy", link: "#" },
    { name: "Terms and Conditions", link: "#" },
    { name: "Term of Use", link: "#" },
    { name: "Privacy and Policy", link: "#" },
    { name: "About Us", link: "#" },
    { name: "Call us", link: "#" },
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full lg:w-64 bg-white shadow-lg transform font-poppins  ${
        type === "" ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Fixed Header */}
      <div className="mt-10 pb-5 flex items-center justify-center border-b">
        {session?.user?.phone || session?.user.email ? (
          <div className="flex flex-col items-center gap-2 pr-2">
            <FaUserCircle size={60} className="text-primary" />
            <p className="text-base font-semibold text-gray-700">
              Welcome, Guest
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-center items-center pl-2">
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
            <h2 className="text-xl font-semibold mb-4 text-center">
              My Yatra Partner
            </h2>
          </div>
        )}

        <button
          className="text-gray-500 hover:text-gray-800 hidden lg:block"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      {/* Scrollable Content */}
      <div className=" h-[calc(100%-190px)] overflow-y-auto mb-24">
        {(session?.user?.phone || session?.user.email
          ? loggedInMenuItems
          : notLoggedInMenuItems
        ).map((item, index) => (
          <div
            key={index}
            onClick={() => setType(item?.name)}
            className="px-4 py-3 flex items-center gap-4 border-b hover:bg-gray-100"
          >
            <div className="hover:text-blue-500">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
