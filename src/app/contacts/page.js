import MobileFooter from "@/componets/common/MobileFooter";
import Navbar from "@/componets/common/Navbar";
import Image from "next/image";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="lg:hidden">
        <Navbar />
      </div>
      <div className="w-full min-h-[70vh] flex items-center justify-center mt-20 p-5 ">
        <div className=" flex items-center border border-gray-400 "></div>
        <div className="relative hidden lg:block w-1/2 h-80">
          <Image
            src="/assets/contact.png"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col items-center ">
          <h1 className="text-5xl  font-bold text-primary mb-6 text-center">
            Contact Us
          </h1>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              <strong>Email:</strong>hello@shreeshyamyatra.com
            </p>
            <p>
              <strong>Phone:</strong> 7073390557
            </p>
            <p>
              <strong>Address:</strong> Suratwali Dharmshala,Khatu Shyam
              Chauraha ,Khatu 332602
            </p>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <MobileFooter />
      </div>
    </>
  );
};

export default ContactUs;
