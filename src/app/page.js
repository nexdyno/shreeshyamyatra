"use client";

import Navbar from "@/componets/common/Navbar";
import BannerOffer from "@/componets/home/BannerOffer";
import Footer from "@/container/home/Footer";
import OfferForYou from "@/container/home/OfferForYou";
import RecommendedRooms from "@/container/home/RecommendedRooms";
import TopBanner from "@/container/home/TopBanner";
import { useAppContext } from "@/context/AppContext";
import { anonymouslySignin } from "@/redux/authSlice";
import {
  fetchImages,
  fetchProfiles,
  fetchProperty,
  fetchRooms,
} from "@/redux/dataSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { setRoutePathName } = useAppContext();
  const pathName = usePathname();
  // const authUser = localStorage.getItem("sb-qlryhlvrtlpfbxrlumwm-auth-token");

  const dispatch = useDispatch();
  const { profiles, property, rooms } = useSelector((state) => state.data);
  const { userData } = useSelector((state) => state.auth);
  console.log(userData, "userData");

  useEffect(() => {
    // console.log("Initializing App");

    // const initializeAuth = async () => {
    //   const storedUserData = JSON.parse(localStorage.getItem("userData"));

    //   if (authUser && authUser.user) {
    //     console.log("User already signed in:", storedUserData);
    //     dispatch(setUserData(storedUserData)); // Rehydrate Redux
    //   } else {
    //     console.log("Signing in anonymously...");
    //     await dispatch(anonymouslySignin());
    //   }
    // };
    // initializeAuth();
    // dispatch(fetchRooms());
    dispatch(anonymouslySignin());
    dispatch(fetchProperty());
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <div>
      <div className="lg:hidden">
        <Navbar />
      </div>
      <TopBanner />
      {/* <RecommendedRooms /> */}
      <BannerOffer />
      <OfferForYou property={property} />

      {/* Uncomment these sections as needed */}
      {/* <HotelBannerOffer /> */}
      {/* <OurCollection /> */}
      {/* <MapSection /> */}
    </div>
  );
}
