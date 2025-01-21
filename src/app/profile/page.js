// "use client";
// import BookingCard from "@/container/profile/BookingCard";
// import Invoice from "@/container/profile/Invoice";
// import ProfileForm from "@/container/profile/ProfileForm";
// import ProfileSidebar from "@/container/profile/ProfileSidebar";
// import React, { useState } from "react";

// export default function Page() {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [activeTabMobile, setActiveTabMobile] = useState("");
//   const [formData, setFormData] = useState({
//     name: "Hasmuddin Ali",
//     email: "hasmuddin.ali@example.com",
//     mobileNumber: "1234567890",
//   });

//   const handleSave = (updatedData) => {
//     setFormData(updatedData);
//   };

//   return (
//     <>
//       <div className=" hidden  lg:mt-32 px-20 min-h-[70vh] lg:flex gap-10 font-poppins">
//         <div className="w-[30%] h-full ">
//           <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//         </div>
//         <div className="w-[70%]">
//           {activeTab === "profile" && (
//             <ProfileForm
//               initialData={formData}
//               onSave={handleSave}
//               onCancel={() => setActiveTabMobile("")}
//             />
//           )}
//           {activeTab === "booking" && (
//             <div className="p-5 bg-white rounded-sm border font-poppins">
//               <h2 className=" pt-2 pb-4 text-2xl font-semibold text-primary">
//                 Booking Details
//               </h2>
//               <BookingCard setActiveTab={setActiveTab} />
//             </div>
//           )}
//           {activeTab === "invoice" && (
//             <div className="p-5 bg-white rounded-sm border font-poppins">
//               <h2 className=" pt-2 pb-4 text-2xl font-semibold text-primary">
//                 Invoice Details
//               </h2>
//               <Invoice />
//             </div>
//           )}
//           {activeTab === "logout" && (
//             <div className="p-8 bg-white rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Log Out</h2>
//               <p className="mt-4 text-gray-600">You have been logged out.</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="lg:hidden  w-full h-full pt-14">
//         <div className="w-full h-full ">
//           {activeTabMobile === "" && (
//             <ProfileSidebar
//               activeTab={activeTabMobile}
//               setActiveTab={setActiveTabMobile}
//             />
//           )}
//         </div>
//         <div className="w-full h-full">
//           {activeTabMobile === "profile" && (
//             <ProfileForm
//               initialData={formData}
//               onSave={handleSave}
//               setActiveTab={setActiveTabMobile}
//               onCancel={() => setActiveTabMobile("")}
//             />
//           )}
//           {activeTabMobile === "booking" && (
//             <div className="w-full h-full bg-gray-100">
//               <h2 className=" pt-2 pb-4 text-2xl font-semibold text-primary">
//                 Booking Details
//               </h2>
//               <BookingCard setActiveTab={setActiveTabMobile} />
//             </div>
//           )}
//           {activeTabMobile === "invoice" && (
//             <div className=" p-5 bg-white rounded-sm border font-poppins">
//               <h2 className=" pt-2 pb-4 text-2xl font-semibold text-primary">
//                 Invoice Details
//               </h2>
//               <Invoice />
//             </div>
//           )}
//           {activeTabMobile === "logout" && (
//             <div className="p-8 bg-white rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold">Log Out</h2>
//               <p className="mt-4 text-gray-600">You have been logged out.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import MobileFooter from "@/componets/common/MobileFooter";
import LoginModal from "@/container/login/LoginModal";
import BookingCard from "@/container/profile/BookingCard";
import ProfileForm from "@/container/profile/ProfileForm";
import ProfileSidebar from "@/container/profile/ProfileSidebar";
import { checkUserSession, logoutUser } from "@/redux/authSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const { session } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [JSON.stringify(session)]);

  const termAndConditon = () => {
    window.location.href = "/legal/termsAndConditions";
  };
  const privacyPolicy = () => {
    window.location.href = "/legal/privacyPolicy";
  };
  const about = () => {
    window.location.href = "/about";
  };
  const signOutUser = () => {
    dispatch(logoutUser()).unwrap();
    setType("");
    setShowLogin(true);
  };
  return (
    <div className="w-full h-full">
      {type === "" && (
        <div>
          <ProfileSidebar type={type} setType={setType} />
        </div>
      )}
      {type === "Profile" && <ProfileForm setType={setType} />}
      {type === "Log in or create an account" && (
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      )}
      {type === "Bookings" && <BookingCard setType={setType} />}
      {type === "Guest policy" && privacyPolicy()}
      {type === "Property policy" && privacyPolicy()}
      {type === "Cancellation policy" && privacyPolicy()}
      {type === "Partner with Shree Shyam Yatra" && privacyPolicy()}
      {type === "Call us" && <ProfileForm />}
      {type === "About Us" && about()}
      {type === "Log Out" && signOutUser()}
      {type === "Terms and Conditions" && termAndConditon()}
      {type === "Privacy and Policy" && privacyPolicy()}
      <MobileFooter />
    </div>
  );
}
