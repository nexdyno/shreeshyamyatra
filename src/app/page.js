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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { setRoutePathName } = useAppContext();
  const pathName = usePathname();

  const dispatch = useDispatch();

  const { property, error, status } = useSelector((state) => state.data);
  const { userData } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  console.log(userData, "userData");

  useEffect(() => {
    dispatch(anonymouslySignin());
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchProperty()).unwrap();
        await dispatch(fetchImages()).unwrap();
      } catch (err) {
        setIsLoading(false);
        console.error("Error in fetching data:", err);
      } finally {
        setIsLoading(false);
        console.log("Data fetching completed");
      }
    };

    fetchData();
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
