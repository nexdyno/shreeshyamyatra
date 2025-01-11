"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

export default function FormComponent({ onContinue, formData, setFormData }) {
  const { roomAndGuest } = useSelector((state) => state.data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    alert(formData, "fromData");
    e.preventDefault();
    onContinue(formData);
  };

  return (
    <div className="flex items-center justify-center lg:items-start lg:justify-start h-full w-fit font-poppins">
      <div className="bg-white  w-full p-6 rounded-md  font-poppins overflow-y-auto">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          Enter Your Details
        </h3>
        <h3 className="text-base text-gray-500 leading-7 pb-7">
          Please review the details and ensure all required information is
          filled in for your booking.
        </h3>
        <form className="space-y-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary text-sm"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Mobile No
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Adults
              </label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                min="1"
                // max={roomAndGuest?.guest - formData.children}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Children
              </label>
              <input
                type="number"
                name="children"
                value={formData.children}
                onChange={handleChange}
                min="0"
                // max={roomAndGuest?.guest - formData.adults}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="lg:hidden w-full bg-primaryGradient font-semibold text-base text-white py-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
