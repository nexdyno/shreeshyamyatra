import MobileFooter from "@/componets/common/MobileFooter";
import Navbar from "@/componets/common/Navbar";
import React from "react";

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
                At Shree Shyam Yatra, we understand that a peaceful stay is
                essential for a meaningful pilgrimage. Our mission extends
                beyond mere accommodation - we strive to create a spiritual
                haven where devotees can focus on their divine journey while we
                take care of their comfort and well-being.
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
                icon={<DefaultIcon text="\u2605" />}
                title="Premium Selections"
                description="Carefully curated accommodations that meet our strict standards for cleanliness, comfort, and devotee-friendly amenities."
              />
              <FeatureCard
                icon={<DefaultIcon text="\uD83D\uDEE1\uFE0F" />}
                title="Safe & Secure"
                description="Verified properties with 24/7 security, ensuring a worry-free stay for all our guests."
              />
              <FeatureCard
                icon={<DefaultIcon text="\uD83D\uDC65" />}
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
                icon={<DefaultIcon text="\u260E\uFE0F" />}
                title="Phone Support"
                info="+91 XXXXX XXXXX"
              />
              <ContactCard
                icon={<DefaultIcon text="\u2709\uFE0F" />}
                title="Email Us"
                info="contact@shreeshyamyatra.com"
              />
              <ContactCard
                icon={<DefaultIcon text="\u23F3" />}
                title="Available Hours"
                info="24/7 Support"
              />
            </div>
          </div>
        </section>
      </main>
      <MobileFooter />
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

const DefaultIcon = ({ text }) => (
  <span className="text-xl font-bold">{text}</span>
);

export default AboutPage;
