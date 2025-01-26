import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Importing the WhatsApp icon

const WhatsAppIcon = () => {
  return (
    <a
      href="https://wa.me/message/RSHKGVQMKGS5E1"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 z-[99] right-5 bg-green-500 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-green-600 transition"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppIcon;
