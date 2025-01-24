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
  const { property, error, status, IsSearchOpen, allImages } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchProperty()).unwrap();
        await dispatch(fetchImages()).unwrap();
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch data only if `property` is undefined or empty
    if (!property || property.length === 0) {
      fetchData();
    }
  }, [dispatch, property]);

  const getValidImages = (propertyId) =>
    (Array.isArray(allImages) ? allImages : [])
      .filter((image) => image.property_id === propertyId && !image.is_rejected)
      .sort((a, b) => (b.is_cover_photo ? 1 : 0) - (a.is_cover_photo ? 1 : 0));
  const image = ["/topimg.jpg", "/topimg.jpg", "/topimg.jpg", "/topimg.jpg"];

  return (
    <div className="w-full min-h-screen font-poppins lg:mt-28 lg:px-20 pb-20 lg:pb-10">
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
      {isLoading ? (
        <LoadingOfferForYou />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-2 mt-5 ">
          {property?.map((item) => (
            // <Link key={item.id} href={`/hotel/hotel-details/${item?.id}`}>
            <div className="shadow-md border border-gray-400 p-5 rounded-md">
              <CardProperty image={getValidImages(item?.id)} item={item} />
            </div>
            // </Link>
          ))}
        </div>
      )}
      <div className="md:hidden">
        <MobileFooter />
      </div>
    </div>
  );
}
