// "use client";

// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { PiBuildings, PiHandshake } from "react-icons/pi";
// import { IoCallOutline } from "react-icons/io5";
// import { BiSolidOffer } from "react-icons/bi";
// import { SlLogin } from "react-icons/sl";
// import SearchComponent from "../home/SearchComponent";
// import { useAppContext } from "@/context/AppContext";
// import LoginModal from "@/container/login/LoginModal";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FaUserCircle } from "react-icons/fa"; // Profile icon
// import { supabase } from "@/lib/supabase/supabaseClient";
// import { setLoginIsModalOpen } from "@/redux/authSlice";
// import { useDispatch, useSelector } from "react-redux";

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const { isLoginModalOpen } = useSelector((state) => state.auth);
//   const { routePathName, setRoutePathName } = useAppContext();
//   const [token, setToken] = useState("");
//   const [guestName, setGuestName] = useState(""); // To store guest name
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown visibility
//   const [isScrolled, setIsScrolled] = useState(
//     routePathName === "/" ? false : true
//   );
//   // const { isLoginModalOpen, setLoginIsModalOpen } = useAppContext();

//   useEffect(() => {
//     // Fetch the Supabase token from localStorage
//     const supabaseToken = localStorage.getItem(
//       "sb-qlryhlvrtlpfbxrlumwm-auth-token"
//     );
//     if (supabaseToken) {
//       const parsedToken = JSON.parse(supabaseToken);
//       console.log("what is the token", parsedToken);
//       console.log("user_metadata", parsedToken.user);
//       console.log("user_metadata", parsedToken.user.user_metadata.name);
//       console.log("user_metadata is_anonymous", parsedToken.user.is_anonymous);
//       if (parsedToken.user.is_anonymous) {
//         setToken("");
//       } else {
//         setToken(supabaseToken);
//         // const user = JSON.parse(localStorage.getItem("user") || "{}"); // Adjust as per your user storage logic
//         setGuestName(parsedToken.user.user_metadata.name || "Guest"); // Fallback to "Guest" if name is not available
//       }
//     }
//   }, []);

//   useEffect(() => {
//     console.log("what is the path name2", routePathName);
//     setIsScrolled(routePathName === "/" ? false : true);
//   }, [routePathName]);

//   const handleScroll = () => {
//     if (window.scrollY >= window.innerHeight / 2) {
//       setIsScrolled(true);
//     } else {
//       setIsScrolled(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const data = [
//     {
//       icon: <PiBuildings size={30} />,
//       heading: "List your property",
//       desc: "Start earning in 30 mins",
//       link: "",
//     },
//     {
//       icon: <IoCallOutline size={30} />,
//       heading: "0124-6201611",
//       desc: "Call us to Book now",
//       link: "",
//     },
//     {
//       icon: <BiSolidOffer size={30} />,
//       heading: "Offer for you",
//       desc: "Grab it now",
//       link: "",
//     },
//   ];

//   const handleLogout = async () => {
//     try {
//       // Log the user out from Supabase
//       const { error } = await supabase.auth.signOut();
//       if (error) {
//         console.error("Error during logout:", error);
//         return;
//       }

//       // Reset state variables
//       setToken("");
//       setGuestName("Guest");

//       console.log("Successfully logged out");
//     } catch (error) {
//       console.error("Unexpected error during logout:", error);
//     }
//   };

//   const handleProfileClick = () => {
//     // Navigate to the profile page or handle profile-related logic
//     window.location.href = "/profile"; // Example redirect
//   };

//   return (
//     <>
//       <div
//         className={`w-full min-h-[10vh] flex justify-around md:justify-between items-center border border-gray-400 md:px-2 lg:px-10 font-poppins bg-white fixed top-0 left-0 right-0 z-30 transition-shadow duration-300 ${
//           isScrolled ? "shadow-lg" : ""
//         }`}
//       >
//         <div className="relative py-2 px-2 lg:px-5 lg:w-[15%]">
//           <Link href="/">
//             <Image
//               src="/assets/logo.svg"
//               alt="logo"
//               height={100}
//               width={120}
//               className=""
//             />
//           </Link>
//         </div>
//         {!isScrolled ? (
//           <div className="hidden lg:block lg:w-[75%] px-2 xl:px-5 cursor-pointer">
//             <div className="w-full h-full flex items-center justify-center">
//               {data.map((item, index) => (
//                 <div
//                   key={index}
//                   className="border-r h-full px-2 xl:px-4 w-fit group hover:bg-gray-100"
//                 >
//                   <div className="flex items-center gap-2 xl:gap-5 xl:px-3 xl:py-5">
//                     <div className="group-hover:text-primary">{item.icon}</div>
//                     <div className="text-wrap">
//                       <p className="text-sm font-bold group-hover:text-primary text-nowrap">
//                         {item.heading}
//                       </p>
//                       <p className="text-xs text-gray-500 group-hover:text-primary text-nowrap">
//                         {item.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="hidden lg:block lg:w-[65%] cursor-pointer px-2 transition-all ease-in-out duration-300">
//             <SearchComponent isScrolled={isScrolled} />
//           </div>
//         )}

//         <div
//           className="lg:w-[20%] h-full flex items-center justify-center"
//           onMouseEnter={() => setIsDropdownOpen(true)}
//           //  onMouseLeave={() => setIsDropdownOpen(false)}
//         >
//           {token ? (
//             <div className="relative flex items-center gap-2 cursor-pointer">
//               <FaUserCircle size={24} className="text-primary" />
//               <p className="text-sm font-semibold text-gray-700">
//                 Welcome, {guestName}
//               </p>
//               {/* Dropdown Menu */}
//               {isDropdownOpen && (
//                 <div
//                   className="absolute top-10 right-0 bg-white border shadow-lg rounded-md w-48"
//                   onMouseEnter={() => setIsDropdownOpen(true)}
//                   onMouseLeave={() => setIsDropdownOpen(false)}
//                 >
//                   <ul className="py-2">
//                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                       <Link href="/profile">Profile</Link>
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                       <Link href="/profile">Bookings</Link>
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                       <span>Call Us: 0124-6201611</span>
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                       <Link href="/help">Help</Link>
//                     </li>
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <button
//               onClick={() => dispatch(setLoginIsModalOpen(true))}
//               className="flex items-center gap-3 bg-primaryGradient py-2 px-3 rounded-md"
//             >
//               <div>
//                 <SlLogin size={20} className="text-white" />
//               </div>
//               <p className="text-sm font-semibold text-nowrap text-white">
//                 Login / Signup
//               </p>
//             </button>
//           )}
//         </div>
//       </div>
//       <LoginModal
//         isOpen={isLoginModalOpen}
//         onClose={() => dispatch(setLoginIsModalOpen(false))}
//       />
//     </>
//   );
// }

"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { PiBuildings, PiHandshake } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { SlLogin } from "react-icons/sl";
import SearchComponent from "../home/SearchComponent";
import { useAppContext } from "@/context/AppContext";
import LoginModal from "@/container/login/LoginModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { supabase } from "@/lib/supabase/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  checkUserSession,
  logoutUser,
  setLoginIsModalOpen,
} from "@/redux/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter
  const [showLogin, setShowLogin] = useState(false);

  const { userData, isLoginModalOpen, session } = useSelector(
    (state) => state.auth
  );
  const { routePathName, setRoutePathName } = useAppContext();
  const [token, setToken] = useState("");
  const [guestName, setGuestName] = useState(""); // To store guest name
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown visibility
  const [isScrolled, setIsScrolled] = useState(
    routePathName === "/" ? false : true
  );

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  // useEffect(() => {
  //   if (session) {
  //     console.log("Session data:in Navbar", session);

  //     const user = session.user;
  //     if (user) {
  //       console.log("User metadata: in Navbar", user.user_metadata);
  //       console.log("Is user anonymous: in Navbar", user.is_anonymous);

  //       if (user.is_anonymous) {
  //         setToken("");
  //       } else {
  //         setToken(session.access_token || ""); // Use access_token if available
  //         setGuestName(user.user_metadata?.name || "Guest"); // Fallback to "Guest"
  //       }
  //     }
  //   }
  // }, [JSON.stringify(session)]);

  useEffect(() => {
    if (session) {
      const user = session.user;
      if (user && !user.is_anonymous) {
        setToken(session.access_token || "");
        setGuestName(user.user_metadata?.name || "Guest");
      } else {
        setToken("");
      }
    }
  }, [JSON.stringify(session)]); // Dependency should be session directly

  useEffect(() => {
    console.log("what is the path name2", routePathName);
    setIsScrolled(routePathName === "/" ? false : true);
  }, [routePathName]);

  const handleScroll = () => {
    if (window.scrollY >= window.innerHeight / 2) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const data = [
    {
      icon: <PiBuildings size={30} />,
      heading: "List your property",
      desc: "Start earning in 30 mins",
      link: "",
    },
    {
      icon: <IoCallOutline size={30} />,
      heading: "0124-6201611",
      desc: "Call us to Book now",
      link: "",
    },
    {
      icon: <BiSolidOffer size={30} />,
      heading: "Offer for you",
      desc: "Grab it now",
      link: "",
    },
  ];

  const handleLogoutBtn = async () => {
    try {
      // Dispatch logoutUser and handle the response
      await dispatch(logoutUser()).unwrap();
      toast.success("Logout successful");

      // Clear local token or any other necessary client-side data
      setToken("");

      // Redirect to the home page after successful logout
      window.location.href = "/";
    } catch (err) {
      // Catch and log any error from the thunk
      toast.error("Error during logout:", err);
    }
  };
  const handleProfileClick = () => {
    // Navigate to the profile page or handle profile-related logic
    window.location.href = "/profile"; // Example redirect
  };

  return (
    <>
      <div
        className={`w-full min-h-[10vh] flex justify-around md:justify-between items-center border border-gray-400 md:px-2 lg:px-10 font-poppins bg-white fixed top-0 left-0 right-0 z-30 transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="relative py-2 px-2 lg:px-5 lg:w-[15%]">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="logo"
              height={100}
              width={120}
              className=""
            />
          </Link>
        </div>
        {!isScrolled ? (
          <div className="hidden lg:block lg:w-[75%] px-2 xl:px-5 cursor-pointer">
            <div className="w-full h-full flex items-center justify-center">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="border-r h-full px-2 xl:px-4 w-fit group hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2 xl:gap-5 xl:px-3 xl:py-5">
                    <div className="group-hover:text-primary">{item.icon}</div>
                    <div className="text-wrap">
                      <p className="text-sm font-bold group-hover:text-primary text-nowrap">
                        {item.heading}
                      </p>
                      <p className="text-xs text-gray-500 group-hover:text-primary text-nowrap">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden lg:block lg:w-[65%] cursor-pointer px-2 transition-all ease-in-out duration-300">
            <SearchComponent isScrolled={isScrolled} />
          </div>
        )}

        <div
          className="lg:w-[20%] h-full flex items-center justify-center"
          onMouseEnter={() => setIsDropdownOpen(true)}
          //  onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {token ? (
            // <button
            //   onClick={handleProfileClick}
            //   className="flex items-center gap-3 bg-primaryGradient py-2 px-3 rounded-md"
            // >
            //   <div>
            //     <FaUserCircle size={20} className="text-white" />
            //   </div>
            //   <p className="text-sm font-semibold text-nowrap text-white">
            //   Welcome, {guestName}
            //   </p>
            // </button>
            <div className="relative flex items-center gap-2 cursor-pointer">
              <FaUserCircle size={24} className="text-primary" />
              <p className="text-sm font-semibold text-gray-700">
                Welcome, {guestName}
              </p>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute top-10 right-0 bg-white border shadow-lg rounded-md w-48"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link href="/bookings">My Bookings</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link href="/profile">My Profile</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <span>Call Us: 0124-6201611</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link href="/help">Help</Link>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                      onClick={handleLogoutBtn}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-3 bg-primaryGradient py-2 px-3 rounded-md"
            >
              <div>
                <SlLogin size={20} className="text-white" />
              </div>
              <p className="text-sm font-semibold text-nowrap text-white">
                Login / Signup
              </p>
            </button>
          )}
        </div>
      </div>
      {showLogin ? (
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      ) : (
        ""
      )}
    </>
  );
}
