import React from "react";
import Head from "next/head";
import Navbar from "@/componets/common/Navbar";
import MobileFooter from "@/componets/common/MobileFooter";

const termsOfUse = () => {
  return (
    <>
      <div className="md:hidden">
        <Navbar />
      </div>
      <Head>
        <title>Terms of Use - Shree Shyam Yatra</title>
        <meta
          name="description"
          content="Read the Terms of Use for Shree Shyam Yatra's booking engine, outlining rights, responsibilities, and guidelines for users."
        />
        <meta
          name="keywords"
          content="terms of use, booking terms, Shree Shyam Yatra, platform rules, policies"
        />
      </Head>

      <main className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl bg-white p-8">
          <section className="relative py-20 bg-blue-700 text-white text-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Terms of Use
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto">
                Welcome to Shree Shyam Yatra! Please read these terms carefully
                before using our services.
              </p>
            </div>
            <div className="absolute bottom-0 w-full h-8 bg-white transform -skew-y-2"></div>
          </section>

          <div className="mt-20 space-y-12">
            <TermsCard
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Acceptance of Terms"
              items={[
                "By accessing or using Shree Shyam Yatra, you agree to comply with these Terms of Use.",
                "If you do not agree to these terms, you are prohibited from using our platform.",
              ]}
            />

            <TermsCard
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="User Responsibilities"
              items={[
                "Users must provide accurate and complete information during bookings.",
                "You are responsible for maintaining the confidentiality of your account and password.",
                "Unauthorized use of another user's account is strictly prohibited.",
              ]}
            />

            <TermsCard
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Booking and Payment"
              items={[
                "All bookings are subject to availability and confirmation from the accommodation.",
                "Prices displayed include applicable taxes unless otherwise stated.",
                "Payments must be made as per the instructions provided during the booking process.",
              ]}
            />

            <TermsCard
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Cancellation and Refund Policy"
              items={[
                "Cancellations must be made through the 'Manage Booking' section on our platform.",
                "Refund eligibility is subject to our cancellation policy.",
                "Refunds will be processed within 5 to 7 business days to the original payment method.",
              ]}
            />

            <TermsCard
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Prohibited Activities"
              items={[
                "Unauthorized access, data scraping, or use of the platform is prohibited.",
                "You may not use the platform for fraudulent or illegal activities.",
                "Violation of these terms may result in suspension or termination of your account.",
              ]}
            />

            <PolicySection
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Limitation of Liability"
              className="bg-blue-50"
            >
              <p className="text-gray-700">
                Shree Shyam Yatra is not responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Losses due to incorrect or incomplete information provided by
                  users.
                </li>
                <li>
                  Interruptions caused by technical issues, maintenance, or
                  unforeseen circumstances.
                </li>
                <li>
                  Delays, cancellations, or disputes between users and
                  accommodations.
                </li>
              </ul>
              <p className="mt-4 text-gray-700">
                Our liability is limited to the platform’s service fees where
                applicable.
              </p>
            </PolicySection>

            <PolicySection
              icon={<div className="w-6 h-6 bg-yellow-500 rounded-full"></div>}
              title="Policy Updates"
              className="bg-yellow-50"
            >
              <p className="text-gray-700">
                These Terms of Use may be updated periodically. Users will be
                notified of significant changes via email or announcements on
                the platform.
              </p>
              <p className="text-gray-700">
                Continued use of our platform after updates constitutes
                acceptance of the revised terms.
              </p>
            </PolicySection>

            <section className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Need Assistance?</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about these Terms of Use,
                please contact our support team:
              </p>
              <a
                href="mailto:hello@shreeshyamyatra.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                hello@shreeshyamyatra.com
              </a>
            </section>
          </div>
        </div>
      </main>
      <div className="md:hidden">
        <MobileFooter />
      </div>
    </>
  );
};

const TermsCard = ({ icon, title, items }) => (
  <div className="bg-white p-6 border transition-shadow">
    <div className="flex items-center mb-4">
      <div className="text-blue-600 mr-3">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-700 flex items-start">
          <span className="text-blue-600 mr-2">&#8226;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PolicySection = ({ icon, title, children, className = "" }) => (
  <section className={`rounded-lg p-6 ${className}`}>
    <div className="flex items-center mb-4">
      <div className="text-blue-600 mr-3">{icon}</div>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
    {children}
  </section>
);

export default termsOfUse;
