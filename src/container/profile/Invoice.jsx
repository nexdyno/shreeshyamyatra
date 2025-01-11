"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Invoice() {
  const invoiceRef = useRef();

  // Hotel Booking Data
  const bookingData = {
    hotelName: "Luxe Ocean Resort",
    hotelAddress: "123 Ocean Drive, Beach City, FL",
    contact: "+1 234-567-890",
    invoiceNumber: "#HOTEL-2025-01",
    invoiceDate: "10 Jan, 2025",
    dueDate: "15 Jan, 2025",
    customer: {
      name: "John Doe",
      address: "789 Maple Avenue, Cityscape, FL",
      phone: "+1 987-654-3210",
    },
    roomDetails: {
      roomType: "Deluxe Suite",
      roomPrice: 350.75,
      numRooms: 2,
      extraGuests: 2,
      extraGuestFee: 50.0,
      numDays: 3,
      convenienceFee: 20.0,
    },
    taxRate: 10,
  };

  const {
    hotelName,
    hotelAddress,
    contact,
    invoiceNumber,
    invoiceDate,
    dueDate,
    customer,
    roomDetails,
    taxRate,
  } = bookingData;

  const subtotal =
    roomDetails.roomPrice * roomDetails.numRooms * roomDetails.numDays +
    roomDetails.extraGuestFee * roomDetails.extraGuests +
    roomDetails.convenienceFee;
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "px", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("hotel_booking_invoice.pdf");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-full pb-20 lg:pb-0 flex flex-col items-center lg:px-5 font-inter">
      <div className="flex flex-wrap items-center justify-end w-full pb-3 px-4 gap-3 lg:gap-10">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2 bg-primary text-white rounded-full px-4 py-2 lg:px-5 lg:py-3"
        >
          <MdOutlineFileDownload size={20} />
          <span className="text-sm lg:text-base font-medium">Download</span>
        </button>
      </div>

      {/* Invoice */}
      <div
        ref={invoiceRef}
        className="w-full max-w-3xl h-fit bg-white border rounded-md px-4 py-5 lg:px-6 lg:py-10"
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full py-3 lg:py-5 px-2 lg:px-4 border-b-2">
          <div className="text-start mb-3 lg:mb-0">
            <h1 className="text-base lg:text-lg font-bold">{hotelName}</h1>
            <p className="text-xs lg:text-sm text-gray-600">{hotelAddress}</p>
            <p className="text-xs lg:text-sm text-gray-600">{contact}</p>
          </div>
          <div className="text-end space-y-1 text-xs lg:text-sm text-[#5E6470] font-normal">
            <p>Invoice #: {invoiceNumber}</p>
            <p>Date: {invoiceDate}</p>
            <p>Due Date: {dueDate}</p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="flex flex-col lg:flex-row justify-between h-fit w-full mb-4 lg:mb-6 mt-4">
          <div className="text-start">
            <h1 className="text-xs lg:text-sm text-gray-600">Billed to</h1>
            <p className="text-sm lg:text-base font-semibold text-black">
              {customer.name}
            </p>
            <p className="text-xs lg:text-sm text-gray-600">
              {customer.address}
            </p>
            <p className="text-xs lg:text-sm text-gray-600">{customer.phone}</p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-y border-gray-300 mb-4 lg:mb-6">
            <thead>
              <tr className="border-b text-xs lg:text-sm text-black font-semibold">
                <th className="py-2">Description</th>
                <th className="py-2 text-center">Quantity</th>
                <th className="py-2 text-center">Rate</th>
                <th className="py-2 text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 text-xs lg:text-sm">
                  Room Charges ({roomDetails.roomType})
                </td>
                <td className="py-2 text-center text-xs lg:text-sm">
                  {roomDetails.numRooms}
                </td>
                <td className="py-2 text-right text-xs lg:text-sm">
                  ${roomDetails.roomPrice.toFixed(2)}
                </td>
                <td className="py-2 text-right text-xs lg:text-sm">
                  $
                  {(
                    roomDetails.roomPrice *
                    roomDetails.numRooms *
                    roomDetails.numDays
                  ).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="py-4 text-xs lg:text-sm">Extra Guests</td>
                <td className="py-2 text-center text-xs lg:text-sm">
                  {roomDetails.extraGuests}
                </td>
                <td className="py-2 text-right text-xs lg:text-sm">
                  ${roomDetails.extraGuestFee.toFixed(2)}
                </td>
                <td className="py-2 text-right text-xs lg:text-sm">
                  $
                  {(
                    roomDetails.extraGuests * roomDetails.extraGuestFee
                  ).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="py-4 text-xs lg:text-sm">Convenience Fee</td>
                <td className="py-2 text-center text-xs lg:text-sm">1</td>
                <td className="py-2 text-right text-xs lg:text-sm">
                  ${roomDetails.convenienceFee.toFixed(2)}
                </td>
                <td className="py-2 text-right text-xs lg:text-sm">
                  ${roomDetails.convenienceFee.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pricing Summary */}
        <div className="w-full flex flex-col items-end space-y-3 lg:space-y-4">
          <div className="flex justify-between items-center w-full lg:w-[55%]">
            <span className="text-xs lg:text-sm text-gray-600">Subtotal</span>
            <span className="font-medium text-xs lg:text-base text-black">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center w-full lg:w-[55%]">
            <span className="text-xs lg:text-sm text-gray-600">
              Tax ({taxRate}%)
            </span>
            <span className="font-medium text-xs lg:text-base text-black">
              ${tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center w-full lg:w-[55%]">
            <span className="text-xs lg:text-sm font-bold text-gray-600">
              Total
            </span>
            <span className="text-xs lg:text-base font-bold text-black">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
