"use client";

import MobileFooter from "@/componets/common/MobileFooter";
import Navbar from "@/componets/common/Navbar";
import PhoneIcon from "@/componets/common/PhoneIcon";
import WhatsAppIcon from "@/componets/common/WhatsAppIcon";
import BannerOffer from "@/componets/home/BannerOffer";
import OfferForYou from "@/container/home/OfferForYou";
import TopBanner from "@/container/home/TopBanner";
import { useAppContext } from "@/context/AppContext";
import { initializeSession } from "@/lib/helperFunctions/sessionChecker";

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
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchProperty()).unwrap();
        await dispatch(fetchImages()).unwrap();
        await dispatch(fetchRooms()).unwrap();
      } catch (err) {
        console.error("Error in fetching data:", err);
      } finally {
        setIsLoading(false);
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
    <div className="mb-16 lg:mb-0">
      <div className="lg:hidden">
        <Navbar />
      </div>
      <TopBanner />
      {/* <RecommendedRooms /> */}
      <BannerOffer />
      <OfferForYou property={property} isLoading={isLoading} />
      <div className="md:hidden">
        <MobileFooter />
      </div>
      <PhoneIcon />
      <WhatsAppIcon />
    </div>
  );
}
