import MobileFooter from "@/componets/common/MobileFooter";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="lg:hidden">
        <Navbar />
      </div>
      <main className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl bg-white p-8">
          <section className="relative py-20 bg-blue-700 text-white text-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Privacy Policy
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto">
                Your Trusted Partner in Finding the Perfect Stay in Khatu
              </p>
            </div>
            <div className="absolute bottom-0 w-full h-8 bg-white transform -skew-y-2"></div>
          </section>

          <p className="text-gray-700 leading-relaxed mt-20">
            ShreeShyamYatra.com is committed to safeguarding your information.
            This Privacy Notice provides details about the information we
            collect, how we use it, and the steps we take to protect it. It also
            explains how you can contact us with any questions regarding the use
            of your information.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            <strong>Policy last updated:</strong> 10 October 2024
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Information about Shree Shyam Yatra
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            In this privacy notice, references to “Shree Shyam Yatra”,
            “ShreeShyamYatra.com”, "we," "us," or "our" are to Shree Shyam
            Yatra.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Scope of Our Privacy Notice
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This notice applies to anyone who interacts with ShreeShyamYatra.com
            in relation to our products and services (“you,” “your”) through any
            channel (e.g., app, chat, website, email, phone, walk-ins to
            accommodations, or booking accommodations through a third-party
            travel agency, etc.). We may provide additional privacy notices if
            needed for specific interactions.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            If you book a stay through us at one of our partner properties—such
            as hotels, the property manager/owner may use your personal data
            according to their privacy notice, if applicable.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How We Collect Personal Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We collect personal information directly from you, as well as from
            third parties such as property managers/owners, travel agents, and
            others who book accommodations on your behalf.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            If you provide us with information about other individuals (e.g.,
            names of others who will be staying at your booked accommodation),
            please ensure they have reviewed this privacy policy and consent to
            you sharing their information with us.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How We Use Cookies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cookies are small files that request permission to be placed on your
            computer’s hard drive. Once you agree, the file is added, and the
            cookie helps analyze web traffic or alerts you when you visit
            specific sites. Cookies allow web applications to respond to you
            personally by tailoring their operations to your preferences and
            needs.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            We use traffic log cookies to identify which pages are being
            visited, which helps us analyze website traffic and enhance our
            website to better meet customer needs. This information is used
            solely for statistical analysis, after which the data is removed
            from our system.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Customer Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To make online booking easy and accessible, Shree Shyam Yatra takes
            basic details of the customer and the customer should not have any
            objection to the same.
          </p>
        </div>
      </main>
      <MobileFooter />
    </>
  );
};

export default PrivacyPolicy;
