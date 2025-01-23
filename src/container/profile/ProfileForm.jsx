"use client";
import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

export default function ProfileForm({ setType }) {
  const { session } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    mobileNumber: session?.user?.phone || "",
  });
  return (
    <div className="w-full bg-white p-8 rounded-sm font-poppins ">
      <div className="flex items-center justify-between mb-8 ">
        <div className="lg:hidden" onClick={() => setType("")}>
          <IoMdArrowBack size={30} />
        </div>

        <h2 className="text-lg font-bold  text-gray-800">Edit Profile</h2>
      </div>
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 text-gray-800 border-gray-500 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2 text-gray-800 border-gray-500 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2 text-gray-800 border-gray-500 focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => setType("")}
            className="px-4 py-2 border rounded-sm  bg-transparent border-gray-700 text-gray-800 hover:bg-black hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(formData)}
            className="px-5 py-2 border rounded-sm bg-primaryGradient text-white hover:bg-blue-700 "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
