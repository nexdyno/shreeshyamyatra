// import Link from "next/link";
// import React from "react";
// import { MdOutlinePerson4 } from "react-icons/md";

// export default function BannerOffer() {
//   const facilities = [
//     "Assured Check-in",
//     "Spacious clean Rooms",
//     "200+ properties",
//   ];

//   return (
//     <div className="w-full h-[80vh] lg:h-[50vh] lg:px-20 py-10 font-poppins">
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
//           <div className="flex flex-col gap-8 justify-center items-center lg:flex-row lg:justify-between lg:items-stretch  ">
//             {/* Top Section */}
//             <div className="border border-white flex items-center  gap-4 w-fit text-white bg-transparent px-2 py-0.5 rounded-lg  h-fit">
//               <MdOutlinePerson4 size={30} className="text-white" />
//               <p className="text-base font-medium">Company-Serviced</p>
//             </div>

//             {/* Bottom Section */}
//             <div className=" flex flex-col gap-5 items-center justify-center pt-5">
//               <h2 className="text-xl lg:text-4xl font-extrabold tracking-wide leading-7 text-white text-center">
//                 India's No. 1 Premium Value Hotels
//               </h2>
//               <div className="flex flex-col gap-2">
//                 {facilities?.map((item, index) => (
//                   <div key={index} className="flex items-center gap-4">
//                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                     <p className="text-lg font-semibold text-white">{item}</p>
//                   </div>
//                 ))}
//               </div>
//               <Link href="/hotel">
//                 <button className="bg-primaryGradient text-white font-medium tracking-wide text-lg py-2 px-16 w-fit rounded-lg">
//                   Book now
//                 </button>
//               </Link>
//             </div>
//             <div className=" font-bold tracking-wide text-white flex flex-col justify-end items-end gap-2">
//               <p className="text-lg">Starting from</p>
//               <p className="text-5xl">₹999</p>
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
              {/* <Link href="/hotel"> */}
              <button
                // onClick={fetchPaymentDetails()}
                className="bg-primaryGradient text-white font-medium tracking-wide text-lg py-2 px-16 w-fit rounded-lg"
              >
                Book now
              </button>
              {/* </Link> */}
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
