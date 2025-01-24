import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Importing the WhatsApp icon

const WhatsAppIcon = () => {
  const handleWhatsAppRedirect = () => {
    let phoneNumber = 8130679338;
  };

  return (
    <div
      className="fixed bottom-20 z-[99] right-5 bg-green-500 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-green-600 transition"
      onClick={handleWhatsAppRedirect}
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={30} />
    </div>
  );
};

export default WhatsAppIcon;
