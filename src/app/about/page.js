import MobileFooter from "@/componets/common/MobileFooter";
import Navbar from "@/componets/common/Navbar";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { RiShieldCheckFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { MdPhone, MdEmail, MdAccessTime } from "react-icons/md";

const AboutPage = () => {
  return (
    <>
      <div className="lg:hidden">
        <Navbar />
      </div>
      <main className="min-h-screen mt-20 bg-gradient-to-b from-blue-100 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-blue-700 text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to Shree Shyam Yatra
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Your Trusted Partner in Finding the Perfect Stay in Khatu
            </p>
          </div>
          <div className="absolute bottom-0 w-full h-8 bg-white transform -skew-y-2"></div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Our Sacred Mission
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is straightforward: to deliver travelers a smooth
                and enjoyable booking experience that saves time, fits their
                budget, and surpasses their expectations. We meticulously curate
                our hotel listings to ensure each property adheres to high
                standards of cleanliness, comfort, and safety, providing our
                users with peace of mind during their stay.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              What Sets Us Apart
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <FeatureCard
                icon={<AiOutlineStar size={30} />}
                title="Premium Selections"
                description="Carefully curated accommodations that meet our strict standards for cleanliness, comfort, and devotee-friendly amenities."
              />
              <FeatureCard
                icon={<RiShieldCheckFill size={30} />}
                title="Safe & Secure"
                description="Verified properties with 24/7 security, ensuring a worry-free stay for all our guests."
              />
              <FeatureCard
                icon={<FaUsers size={30} />}
                title="Community Focus"
                description="Join a community of devoted pilgrims and share in the spiritual journey together."
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Connect With Us
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <ContactCard
                icon={<MdPhone size={30} />}
                title="Phone Support"
                info="+91 7073390557"
              />
              <ContactCard
                icon={<MdEmail size={30} />}
                title="Email Us"
                info="hello@shreeshyamyatra.com"
              />
              <ContactCard
                icon={<MdAccessTime size={30} />}
                title="Available Hours"
                info="24/7 Support"
              />
            </div>
          </div>
        </section>
      </main>
      <div className="lg:hidden">
        <MobileFooter />
      </div>
    </>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
    <div className="inline-block p-3 bg-blue-100 rounded-full mb-4 text-blue-700">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ContactCard = ({ icon, title, info }) => (
  <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
    <div className="inline-block p-2 bg-blue-100 rounded-full mb-3 text-blue-700">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{info}</p>
  </div>
);

export default AboutPage;
