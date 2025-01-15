"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaMailBulk,
  FaLocationArrow,
  FaRegCopyright,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { RxTwitterLogo } from "react-icons/rx"; // X (formerly Twitter)
import { useMediaQuery } from "react-responsive";

const icons = [
  { id: 1, Icon: FaInstagram, link: "https://instagram.com" },
  { id: 2, Icon: FaLinkedinIn, link: "https://linkedin.com" },
  { id: 3, Icon: RxTwitterLogo, link: "https://twitter.com" },
  { id: 4, Icon: FaFacebookF, link: "https://facebook.com" },
];

const footerLinks = [
  {
    title: "OUR SERVICES",
    linksArray: [
      {
        name: "List Your property",
        link: "#",
      },
      {
        name: "Register Properties",
        link: "#",
      },

      {
        name: "Hotel Room Booking",
        link: "#",
      },
      {
        name: "All Rooms",
        link: "#",
      },
      {
        name: "Offers For you",
        link: "#",
      },
      {
        name: "Call us now for the Booking",
        link: "#",
      },
    ],
  },
  {
    title: "IMPORTANT LINKS",
    linksArray: [
      {
        name: "About Us",
        link: "/about",
      },
      {
        name: "Terms & Conditions",
        link: "/legal/termsAndConditions",
      },
      {
        name: "Privacy Policy",
        link: "/legal/privacyPolicy",
      },
      {
        name: "Contact Us",
        link: "#",
      },
    ],
  },
];

const ContactDetailsDiv = () => {
  const contactDetails = [
    {
      Icon: FaPhone, // Icon name
      title: "Phone Number:",
      value: "7073390557",
    },
    {
      Icon: FaMailBulk, // Icon name
      title: "Email Address:",
      value: "support@shreeshyamyatra.com",
    },
    {
      Icon: FaLocationArrow, // Icon name
      title: "Office Location:",
      value: "123 Main Street, Downtown, Cityville",
    },
  ];
  return (
    <div className="w-full px-5 flex flex-col md:justify-between md:flex-row  md:flex-wrap md:gap-8 md:bg-[#223142B2] md:py-4 md:rounded-md gap-4 lg:py-10 lg:px-10">
      {contactDetails.map(({ Icon, title, value }, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="p-2 w-10 h-10 bg-white rounded-md text-black flex items-center justify-center">
            <Icon className="text-xl" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-300">{title}</h4>
            <p className="">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Footer() {
  const isMobile = useMediaQuery({
    minWidth: "1024px",
  });

  return (
    <div className="w-full h-fit font-nunito bg-[#182532] text-white pt-16 bg-cover bg-no-repeat bg-center flex items-center gap-4 flex-col lg:gap-5">
      <div className="hidden md:block w-full  md:px-10 lg:px-20">
        <ContactDetailsDiv />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6  md:px-10 lg:px-20 md:mt-5">
        {/* Logo and social links */}
        <div className="w-full flex flex-col items-start gap-4">
          <div className="h-20 w-40 bg-white rounded-r-full flex items-center justify-center">
            <div className="h-12 w-full relative">
              <Image
                src={"/assets/logo.svg"}
                alt="logoImage"
                fill={true}
                className="w-full h-full object-contain object-center"
              />
            </div>
          </div>
          <div className=" px-5 flex flex-col gap-4 md:px-0">
            <p className="opacity-80">
              Join our platform to showcase your property to thousands of daily
              travelers. Experience seamless management and increased bookings.
            </p>
            <div className=" flex items-center justify-start gap-2">
              {icons.map(({ id, link, Icon }) => (
                <div
                  key={id}
                  className="w-8 h-8 bg-white flex items-center justify-center rounded-full"
                >
                  <Link href={link}>
                    <Icon className="text-[18px] text-black" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Our services section */}
        <div className="w-full md:col-span-2 flex flex-col items-start gap-4 px-5">
          <h4 className="text-2xl font-bold">{footerLinks[0].title}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-6 w-full">
            {footerLinks[0].linksArray.map((item, i) => (
              <Link
                href={item.link}
                key={i}
                className={`border-b border-gray-600 text-gray-300 pb-2 text-base text-nowrap relative group ${
                  i === footerLinks[0].linksArray.length - 1 && "border-b-0"
                }
                ${i === 6 && "md:border-b-0"}
                `}
              >
                <span className="group-hover:!text-white">{item.name}</span>
                <span
                  className={`h-[2px] rounded-md w-0 group-hover:w-full absolute bottom-0 left-0 bg-white transition-all ease-in-out duration-200`}
                ></span>
              </Link>
            ))}
          </div>
        </div>
        {/* Important links section */}
        <div className="w-full flex flex-col items-start gap-4 px-5">
          <h4 className="text-2xl font-bold">{footerLinks[1].title}</h4>
          <div className="grid grid-cols-1 gap-2 lg:gap-6  w-full">
            {footerLinks[1].linksArray.map((item, i) => (
              <Link
                href={item.link}
                key={i}
                className={`relative border-b border-gray-600 text-gray-300 pb-2 text-base text-nowrap group ${
                  i === footerLinks[1].linksArray.length - 1 && "border-b-0"
                }`}
              >
                <span className="group-hover:!text-white">{item.name}</span>
                <span
                  className={`h-[2px] rounded-md w-0 group-hover:w-full absolute bottom-0 left-0 bg-white transition-all ease-in-out duration-200`}
                ></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:hidden">
        <ContactDetailsDiv />
      </div>
      <div className="mt-6 md:mt-0 bg-[#182532] w-full py-2 flex items-center justify-center text-sm gap-1 text-white">
        <span>&copy; 2024 Nexdyno</span>
        <p>| Shree Shyam Yatra | All Rights Reserved.</p>
      </div>
    </div>
  );
}
