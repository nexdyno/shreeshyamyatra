"use client";

import Image from "next/image";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoCubeOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

import { IoPersonCircleOutline } from "react-icons/io5";

const data = [
  {
    icon: IoPersonCircleOutline,
    text: "Profile Information",
    link: "profile",
  },
  {
    icon: IoCubeOutline,
    text: "My Bookings",
    link: "booking",
  },

  {
    icon: MdLogout,
    text: "Logout",
    link: "",
  },
];

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-full h-full font-nunito lg:pl-20 px-5 lg:px-0">
      <div className="w-full lg:w-64 h-full flex flex-col items-start gap-5">
        <div className="bg-white w-full border rounded-md  flex items-center cursor-pointer hover:bg-[#FFE1E0]">
          <Image
            src="/assets/profile.png"
            alt="profile"
            height={95}
            width={95}
            className="rounded-full"
          />
          <div className="space-y-1">
            <p className="text-sm text-black font-medium">Hii,</p>
            <p className="font-semibold text-lg">Hasmuddin</p>
          </div>
        </div>
        <div className=" w-full border rounded-md cursor-pointer">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(item.link)}
              className={`px-4 hover:bg-[#FFE1E0] `}
            >
              <div className="flex items-center justify-between py-5 border-b">
                <div className="flex items-center gap-2 ">
                  <item.icon size={22} />
                  <p className="text-lg  text-black font-nunito text-nowrap">
                    {item.text}
                  </p>
                </div>
                <IoIosArrowForward size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
