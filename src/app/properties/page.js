"use client";

import LoadingOfferForYou from "@/container/home/LoadingOfferForYou";
import { fetchImages, fetchProperty, setIsSearchOpen } from "@/redux/dataSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import CardProperty from "@/componets/home/CardProperty";
import SubNavbarMobile from "@/componets/hotel/SubNavbarMobile";
import InsideNavabr from "@/componets/common/InsideNavabr";
import MobileFooter from "@/componets/common/MobileFooter";

export default function Page() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { property, error, status, IsSearchOpen } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
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

    // Fetch data only if `property` is undefined or empty
    if (!property || property.length === 0) {
      fetchData();
    }
  }, [dispatch, property]);

  const image = ["/topimg.jpg", "/topimg.jpg", "/topimg.jpg", "/topimg.jpg"];

  return (
    <div className="w-full min-h-screen font-poppins lg:mt-20 lg:px-20 pb-20 lg:pb-10">
      <div className="w-full md:hidden">
        <InsideNavabr />
        {IsSearchOpen ? (
          <SubNavbarMobile
            IsSearchOpen={IsSearchOpen}
            onClose={() => dispatch(setIsSearchOpen(false))}
          />
        ) : (
          ""
        )}
      </div>
      <div className="w-full flex items-center justify-center pb-5 lg:py-10">
        <h1 className="font-semibold tracking-wide text-2xl lg:text-5xl">
          All Hotels
        </h1>
      </div>
      {isLoading ? (
        <LoadingOfferForYou />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 mt-5 ">
          {property?.map((item) => (
            <Link key={item.id} href={`/hotel/hotel-details/${item?.id}`}>
              <CardProperty image={image} item={item} />
            </Link>
          ))}
        </div>
      )}
      <div className="md:hidden">
        <MobileFooter />
      </div>
    </div>
  );
}
