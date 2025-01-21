// import React from "react";
// import Head from "next/head";
// import MobileFooter from "@/componets/common/MobileFooter";
// import Navbar from "@/componets/common/Navbar";

// const TermsAndConditions = () => {
//   return (
//     <>
//       <div className="lg:hidden">
//         <Navbar />
//       </div>
//       <Head>
//         <title>Terms and Conditions - Shree Shyam Yatra</title>
//         <meta
//           name="description"
//           content="Read the terms and conditions for hotels and customers using Shree Shyam Yatra's booking platform."
//         />
//         <meta
//           name="keywords"
//           content="terms and conditions, booking terms, hotel policy, refund policy, ShreeShyamYatra terms"
//         />
//       </Head>

//       <main className="min-h-screen bg-gray-50 py-16 px-4">
//         <div className="container mx-auto max-w-4xl bg-white p-8">
//           <section className="relative py-20 bg-blue-700 text-white text-center">
//             <div className="container mx-auto px-4">
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">
//                 Terms and Conditions
//               </h1>
//               <p className="text-lg md:text-xl max-w-2xl mx-auto">
//                 Please read these terms carefully before using our services
//               </p>
//             </div>
//             <div className="absolute bottom-0 w-full h-8 bg-white transform -skew-y-2"></div>
//           </section>

//           <div className="mt-20 space-y-12">
//             <TermsCard
//               icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
//               title="Hotel Information Accuracy"
//               items={[
//                 "Hotels must provide accurate and current information about facilities, services, and pricing.",
//                 "Any changes in services, prices, or amenities must be promptly updated.",
//                 "False or misleading information may result in immediate removal from the platform.",
//               ]}
//             />

//             <TermsCard
//               icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
//               title="Room Availability & Booking"
//               items={[
//                 "Hotels must maintain accurate room availability information.",
//                 "All bookings through the platform must be honored.",
//                 "Immediate notification is required for overbookings or cancellations.",
//               ]}
//             />

//             <TermsCard
//               icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
//               title="Pricing & Payment"
//               items={[
//                 "All listed prices must include taxes and fees.",
//                 "Platform service fees may apply to bookings.",
//                 "Payments are settled according to the agreed timeline.",
//               ]}
//             />

//             <TermsCard
//               icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
//               title="Service Standards"
//               items={[
//                 "High standards of cleanliness and hospitality are required.",
//                 "Regular quality assessments are conducted.",
//                 "Non-compliance may result in penalties or removal.",
//               ]}
//             />

//             <PolicySection
//               icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
//               title="Refund Policy"
//               className="bg-blue-50"
//             >
//               <div className="space-y-4">
//                 <p className="text-gray-700">
//                   Eligible refunds will be processed within{" "}
//                   <span className="font-semibold">5 to 7 business days</span>{" "}
//                   after receiving the cancellation request. All refunds will be
//                   issued to the original payment method used for booking.
//                 </p>
//                 <ul className="list-disc pl-6 text-gray-700 space-y-2">
//                   <li>
//                     Cancellation must be made within the eligible timeframe.
//                   </li>
//                   <li>Processing time may vary based on the payment method.</li>
//                   <li>Service fees may be non-refundable.</li>
//                 </ul>
//               </div>
//             </PolicySection>

//             <PolicySection
//               icon={<div className="w-6 h-6 bg-yellow-500 rounded-full"></div>}
//               title="Customer Details Policy"
//               className="bg-yellow-50"
//             >
//               <div className="space-y-4">
//                 <p className="text-gray-700">
//                   While Shree Shyam Yatra facilitates bookings, please note:
//                 </p>
//                 <ul className="list-disc pl-6 text-gray-700 space-y-2">
//                   <li>
//                     Customer-provided details are not independently verified by
//                     Shree Shyam Yatra.
//                   </li>
//                   <li>
//                     Customers are responsible for providing accurate
//                     information.
//                   </li>
//                   <li>False information may result in booking cancellation.</li>
//                   <li>Hotels may require ID verification at check-in.</li>
//                 </ul>
//               </div>
//             </PolicySection>

//             <section className="bg-gray-50 rounded-lg p-6">
//               <h2 className="text-xl font-semibold mb-4">Important Notice</h2>
//               <p className="text-gray-700">
//                 These terms and conditions are subject to change without notice.
//                 Continued use of our services constitutes acceptance of current
//                 terms. For the most recent version, please check this page
//                 regularly.
//               </p>
//             </section>

//             <section className="bg-white rounded-lg shadow-lg p-8">
//               <h2 className="text-2xl font-semibold mb-4">
//                 Questions About Our Terms?
//               </h2>
//               <p className="text-gray-700 mb-4">
//                 If you have any questions about our terms and conditions, please
//                 contact our support team:
//               </p>
//               <a
//                 href="mailto:support@shreeshyamyatra.com"
//                 className="text-blue-600 hover:text-blue-800 font-medium"
//               >
//                 support@shreeshyamyatra.com
//               </a>
//             </section>
//           </div>
//         </div>
//       </main>
//       <MobileFooter />
//     </>
//   );
// };

// const TermsCard = ({ icon, title, items }) => (
//   <div className="bg-white  p-6 border transition-shadow">
//     <div className="flex items-center mb-4">
//       <div className="text-blue-600 mr-3">{icon}</div>
//       <h3 className="text-xl font-semibold">{title}</h3>
//     </div>
//     <ul className="space-y-2">
//       {items.map((item, index) => (
//         <li key={index} className="text-gray-700 flex items-start">
//           <span className="text-blue-600 mr-2">&#8226;</span>
//           <span>{item}</span>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// const PolicySection = ({ icon, title, children, className = "" }) => (
//   <section className={`rounded-lg p-6 ${className}`}>
//     <div className="flex items-center mb-4">
//       <div className="text-blue-600 mr-3">{icon}</div>
//       <h2 className="text-2xl font-semibold">{title}</h2>
//     </div>
//     {children}
//   </section>
// );

// export default TermsAndConditions;

import React from "react";
import Head from "next/head";
import Navbar from "@/componets/common/Navbar";
import MobileFooter from "@/componets/common/MobileFooter";

const TermsAndConditions = () => {
  return (
    <>
      <div className="md:hidden">
        <Navbar />
      </div>
      <Head>
        <title>Terms and Conditions - Shree Shyam Yatra</title>
        <meta
          name="description"
          content="Read the terms and conditions for hotels and customers using Shree Shyam Yatra's booking platform."
        />
        <meta
          name="keywords"
          content="terms and conditions, booking terms, hotel policy, refund policy, ShreeShyamYatra terms"
        />
      </Head>

      <main className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl bg-white p-8">
          <section className="relative py-20 bg-blue-700 text-white text-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Terms and Conditions
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto">
                Please read these terms carefully before using our services
              </p>
            </div>
            <div className="absolute bottom-0 w-full h-8 bg-white transform -skew-y-2"></div>
          </section>

          <div className="mt-20 space-y-12">
            <TermsCard
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Hotel Information Accuracy"
              items={[
                "Hotels must provide accurate and up-to-date information about their facilities, services, and pricing.",
                "Any changes to services, prices, or amenities must be updated promptly on the platform.",
                "False or misleading information may result in immediate removal from the platform.",
              ]}
            />

            <TermsCard
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Room Availability & Booking"
              items={[
                "Hotels are responsible for maintaining accurate room availability on the platform.",
                "All bookings made through the platform must be honored.",
                "In case of overbookings or cancellations, hotels must notify the platform and customers immediately.",
              ]}
            />

            <TermsCard
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Pricing & Payment"
              items={[
                "All listed prices must include applicable taxes and fees.",
                "Platform service fees may apply to bookings.",
                "Payments will be settled according to the agreed timeline between hotels and Shree Shyam Yatra.",
              ]}
            />

            <TermsCard
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Service Standards"
              items={[
                "Hotels must maintain high standards of cleanliness and hospitality.",
                "Regular quality assessments may be conducted by Shree Shyam Yatra.",
                "Non-compliance with service standards may result in penalties or removal from the platform.",
              ]}
            />

            <PolicySection
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Refund Policy"
              className="bg-blue-50"
            >
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Refunds for eligible cancellations will be processed within 5
                  to 7 business days after receiving the request.
                </li>
                <li>
                  Refunds will be issued to the original payment method used for
                  the booking.
                </li>
                <li>
                  Cancellations must be requested at least 4 days before
                  check-in via the "Manage Booking" section on the website.
                </li>
                <li>
                  Cancellations requested within 24 hours of check-in are not
                  eligible for refunds.
                </li>
                <li>Service fees may be non-refundable.</li>
              </ul>
            </PolicySection>

            <PolicySection
              icon={<div className="w-6 h-6 bg-yellow-500 rounded-full"></div>}
              title="ID Requirements & Guest Rules"
              className="bg-yellow-50"
            >
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  All guests must present a valid government-issued ID (Aadhar
                  Card, Driving License, PAN Card, Passport, or Voter ID) during
                  check-in.
                </li>
                <li>Guests under 18 years of age are not allowed.</li>
                <li>Single guests or unmarried couples are not permitted.</li>
                <li>
                  Guests from the same city as the accommodation are not
                  allowed.
                </li>
                <li>
                  Shree Shyam Yatra is not responsible for refunds if check-in
                  is denied due to non-compliance with these rules.
                </li>
              </ul>
            </PolicySection>

            {/* Additional Sections */}
            <TermsCard
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Room Capacity"
              items={[
                "Each room/hall has a specific guest capacity that must be strictly adhered to.",
              ]}
            />

            <TermsCard
              icon={<div className="w-6 h-6 bg-blue-600 rounded-full"></div>}
              title="Check-in/Check-out Timings"
              items={[
                "Standard check-in and check-out timings are specified on the booking page.",
                "Early check-in or late check-out requests are subject to approval and may incur additional charges.",
                "Check-in during gate-closing times at certain accommodations is not possible and is non-refundable.",
              ]}
            />

            <section className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                Questions About Our Terms?
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our terms and conditions, please
                contact our support team:
              </p>
              <a
                href="mailto:support@shreeshyamyatra.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                support@shreeshyamyatra.com
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

export default TermsAndConditions;
