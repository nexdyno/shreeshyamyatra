// "use client";
// import { useState } from "react";
// import { MdOutlinePerson4 } from "react-icons/md";

// export default function BannerOffer() {
//   const [paymentId, setPaymentId] = useState("");
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [error, setError] = useState("");

//   const fetchPaymentDetails = async () => {
//     setError("");
//     setPaymentDetails(null);

//     if (!paymentId.trim()) {
//       setError("Payment ID is required.");
//       return;
//     }

//     try {
//       const response = await fetch("/api/details", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ payment_id: paymentId }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to fetch payment details");
//       }

//       const data = await response.json();
//       setPaymentDetails(data.paymentDetails);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="w-full min-h-fit lg:h-[70vh] lg:px-20 py-10 font-poppins">
//       <div
//         className="w-full h-full md:rounded-md"
//         style={{
//           backgroundImage: `linear-gradient(165deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url("/assets/home/offer1.jpg")`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//         }}
//       >
//         <div className="w-full p-6 flex flex-col justify-between">
//           <div className="flex flex-col gap-8 justify-center items-center lg:flex-row lg:justify-between lg:items-stretch">
//             <div className="border border-white flex items-center gap-4 w-fit text-white bg-transparent px-2 py-0.5 rounded-lg h-fit">
//               <MdOutlinePerson4 size={30} className="text-white" />
//               <p className="text-base font-medium">Shree Shyam Yatra Service</p>
//             </div>

//             <div className="flex flex-col gap-5 items-center justify-between pt-5">
//               <h2 className="text-xl lg:text-4xl font-extrabold tracking-wide leading-7 text-white text-center">
//                 Experience the Best Stays in Khatu Shyam Ji
//               </h2>

//               <div className="w-full flex flex-col gap-4">
//                 <label
//                   htmlFor="paymentId"
//                   className="block text-sm text-white font-medium"
//                 >
//                   Enter Payment ID:
//                 </label>
//                 <input
//                   type="text"
//                   id="paymentId"
//                   value={paymentId}
//                   onChange={(e) => setPaymentId(e.target.value)}
//                   className="border p-2 rounded w-full"
//                   placeholder="Enter Razorpay Payment ID"
//                 />
//               </div>

//               <button
//                 onClick={fetchPaymentDetails}
//                 className="bg-primaryGradient text-white font-medium tracking-wide text-lg py-2 px-16 w-fit rounded-lg"
//               >
//                 Fetch Details
//               </button>

//               {error && <p className="text-red-500 mt-4">{error}</p>}

//               {paymentDetails && (
//                 <div className="mt-4 p-4 border rounded bg-gray-50">
//                   <h2 className="text-xl font-bold">Payment Details</h2>
//                   <pre className="mt-2 text-sm">
//                     {JSON.stringify(paymentDetails, null, 2)}
//                   </pre>
//                 </div>
//               )}
//             </div>

//             <div className="font-bold tracking-wide text-white flex flex-col justify-end items-end gap-2">
//               <p className="text-lg">Starting from</p>
//               <p className="text-5xl">₹499</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import React from "react";
import { MdOutlinePerson4 } from "react-icons/md";

export default function BannerOffer() {
  const facilities = [
    "Comfortable Dharamshala Stays",
    "Clean & Spacious Rooms",
    "Best Properties in Khatu Shyam Ji",
  ];

  return (
    <div className="w-full min-h-fit lg:h-[70vh] lg:px-20 py-10 font-poppins">
      <div
        className="w-full h-full md:rounded-md"
        style={{
          backgroundImage: `linear-gradient(165deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url("/assets/home/offer1.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="w-full p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-8 justify-center items-center lg:flex-row lg:justify-between lg:items-stretch  ">
            {/* Top Section */}
            <div className="border border-white flex items-center  gap-4 w-fit text-white bg-transparent px-2 py-0.5 rounded-lg  h-fit">
              <MdOutlinePerson4 size={30} className="text-white" />
              <p className="text-base font-medium">Shree Shyam Yatra Service</p>
            </div>

            {/* Bottom Section */}
            <div className=" flex flex-col gap-5 items-center justify-between pt-5">
              <h2 className="text-xl lg:text-4xl font-extrabold tracking-wide leading-7 text-white text-center">
                Experience the Best Stays in Khatu Shyam Ji
              </h2>
              <div className="flex flex-col gap-2">
                {facilities?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <p className="text-lg font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
              <Link href="/properties">
                <button className="bg-primaryGradient text-white font-medium tracking-wide text-lg py-2 px-16 w-fit rounded-lg">
                  Book now
                </button>
              </Link>
            </div>
            <div className=" font-bold tracking-wide text-white flex flex-col justify-end items-end gap-2">
              <p className="text-lg">Starting from</p>
              <p className="text-5xl">₹499</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
