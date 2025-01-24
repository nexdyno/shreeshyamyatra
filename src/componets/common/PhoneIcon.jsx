import React from "react";
import { FaPhone } from "react-icons/fa"; // Importing the Phone icon

const PhoneIcon = () => {
  const handlePhoneRedirect = () => {
    const phoneNumber = 8130679338;

    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div
      className="fixed bottom-20 z-[99] left-5 bg-blue-500 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-blue-600 transition"
      onClick={handlePhoneRedirect}
      title="Call Now"
    >
      <FaPhone size={24} className="rotate-90" />
    </div>
  );
};

export default PhoneIcon;
