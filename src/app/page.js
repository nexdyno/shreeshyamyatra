"use client";

import Navbar from "@/componets/common/Navbar";
import BannerOffer from "@/componets/home/BannerOffer";
import Footer from "@/container/home/Footer";
import OfferForYou from "@/container/home/OfferForYou";
import RecommendedRooms from "@/container/home/RecommendedRooms";
import TopBanner from "@/container/home/TopBanner";
import { useAppContext } from "@/context/AppContext";
import { initializeSession } from "@/lib/helperFunctions/sessionChecker";
import {
  anonymouslySignin,
  checkUserSession,
  setUserSession,
} from "@/redux/authSlice";
import {
  fetchImages,
  fetchProfiles,
  fetchProperty,
  fetchRooms,
} from "@/redux/dataSlice";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { setRoutePathName } = useAppContext();
  const pathName = usePathname();

  const dispatch = useDispatch();

  const { property, error, status } = useSelector((state) => state.data);
  const { userData, sessionFromLocal } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const initializeSession = async () => {
    //   // Retrieve and set the session token
    //   const token = localStorage.getItem("sb-qlryhlvrtlpfbxrlumwm-auth-token");
    //   if (token) {
    //     dispatch(setUserSession(token));
    //   } else {
    //     await dispatch(anonymouslySignin());
    //   }
    // };
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchProperty()).unwrap();
        await dispatch(fetchImages()).unwrap();
      } catch (err) {
        console.error("Error in fetching data:", err);
      } finally {
        setIsLoading(false);
        console.log("Data fetching completed");
      }
    };

    const initialize = async () => {
      if (!sessionFromLocal) {
        await initializeSession(dispatch);
      }
      fetchData();
    };

    initialize();
  }, [dispatch]);

  return (
    <div>
      <div className="lg:hidden">
        <Navbar />
      </div>
      <TopBanner />
      {/* <RecommendedRooms /> */}
      <BannerOffer />
      <OfferForYou property={property} isLoading={isLoading} />
    </div>
  );
}
