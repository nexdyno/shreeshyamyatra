"use client";
import { fetchUserData } from "@/redux/dataSlice";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProfileForm({ setType }) {
  const dispatch = useDispatch();
  const { session } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.data);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    mobileNumber: session?.user?.phone || "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchUserData({ id: session?.user?.id })).unwrap();
        setIsLoading(false);
      } catch (error) {
        console.error("Error while fetcing info", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(userData, "UserData");
  return (
    // <div className="w-full bg-white p-8 rounded-sm font-poppins ">
    //   <div className="flex items-center justify-between mb-8 ">
    //     <div className="lg:hidden" onClick={() => setType("")}>
    //       <IoMdArrowBack size={30} />
    //     </div>

    //     <h2 className="text-lg font-bold  text-gray-800">Edit Profile</h2>
    //   </div>
    //   <form className="space-y-5">
    //     <div>
    //       <label className="block text-sm font-medium mb-2 text-gray-700">
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         value={formData.name}
    //         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    //         className="w-full border rounded-lg px-4 py-2 text-gray-800 border-gray-500 focus:outline-none focus:border-primary"
    //       />
    //     </div>
    //     <div>
    //       <label className="block text-sm font-medium mb-2 text-gray-700">
    //         Email Address
    //       </label>
    //       <input
    //         type="email"
    //         value={formData.email}
    //         onChange={(e) =>
    //           setFormData({ ...formData, email: e.target.value })
    //         }
    //         className="w-full border rounded-lg px-4 py-2 text-gray-800 border-gray-500 focus:outline-none focus:border-primary"
    //       />
    //     </div>
    //     <div>
    //       <label className="block text-sm font-medium mb-2 text-gray-700">
    //         Mobile Number
    //       </label>
    //       <input
    //         type="tel"
    //         value={formData.mobileNumber}
    //         onChange={(e) =>
    //           setFormData({ ...formData, mobileNumber: e.target.value })
    //         }
    //         className="w-full border rounded-lg px-4 py-2 text-gray-800 border-gray-500 focus:outline-none focus:border-primary"
    //       />
    //     </div>
    //     <div className="flex justify-end gap-4 mt-6">
    //       <button
    //         type="button"
    //         onClick={() => setType("")}
    //         className="px-4 py-2 border rounded-sm  bg-transparent border-gray-700 text-gray-800 hover:bg-black hover:text-white"
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         type="button"
    //         onClick={() => onSave(formData)}
    //         className="px-5 py-2 border rounded-sm bg-primaryGradient text-white hover:bg-blue-700 "
    //       >
    //         Save
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <>
      {isLoading ? (
        <div className="w-full bg-white p-8 rounded-sm font-poppins">
          <div className="flex items-center justify-between mb-8">
            <div className="lg:hidden">
              <Skeleton width={30} height={30} circle />
            </div>
            <h2 className="text-lg font-bold text-gray-800">
              <Skeleton width={150} height={24} />
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <Skeleton width={80} height={16} />
              </label>
              <p className="text-gray-800 font-medium">
                <Skeleton width={200} height={20} />
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <Skeleton width={120} height={16} />
              </label>
              <p className="text-gray-800 font-medium">
                <Skeleton width={250} height={20} />
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <Skeleton width={120} height={16} />
              </label>
              <p className="text-gray-800 font-medium">
                <Skeleton width={150} height={20} />
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-4 py-2 border rounded-sm bg-transparent border-gray-700 text-gray-800 hover:bg-black hover:text-white"
            >
              <Skeleton width={50} height={24} />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white p-8 rounded-sm font-poppins">
          <div className="flex items-center justify-between mb-8">
            <div className="lg:hidden" onClick={() => setType("")}>
              <IoMdArrowBack size={30} />
            </div>

            <h2 className="text-lg font-bold text-gray-800">Profile Details</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 ">
                Name
              </label>
              <p className="text-gray-800 font-medium">
                {userData?.[0]?.name || "---"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Email Address
              </label>
              <p className="text-gray-800 font-medium">
                {userData?.[0]?.email || session?.user?.email || "---"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Mobile Number
              </label>
              <p className="text-gray-800 font-medium">
                {userData?.[0]?.phone || session?.user?.phone || "---"}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 lg:hidden">
            <button
              type="button"
              onClick={() => setType("")}
              className="px-4 py-2 border rounded-sm bg-transparent border-gray-700 text-gray-800 hover:bg-black hover:text-white"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}
