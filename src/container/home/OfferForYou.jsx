"use client";

import { fetchProperty } from "@/redux/dataSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useSelector } from "react-redux";
import LoadingOfferForYou from "./LoadingOfferForYou";
import Image from "next/image";
import CardRecommended from "@/componets/home/CardRecommended";

export default function OfferForYou({ property, isLoading }) {
  console.log(property, "property property");

  return (
    <section className="w-full h-full py-10 md:min-h-screen px-5 lg:px-20  font-poppins">
      {isLoading ? (
        <LoadingOfferForYou />
      ) : (
        <>
          <h1 className="text-start text-xl lg:text-4xl font-semibold mb-5 lg:mb-10">
            Recommended for you
          </h1>

          <div className="overflow-x-auto lg:overflow-hidden">
            <div className="flex sm:flex-wrap md:grid-cols-3 lg:grid lg:grid-cols-3 gap-6 overflow-x-auto w-full">
              {property.slice(0, 6)?.map((item) => (
                <Link key={item.id} href={`/hotel/hotel-details/${item?.id}`}>
                  <div className=" shadow-md rounded-md ">
                    <CardRecommended item={item} />
                  </div>
                </Link>
              ))}
            </div>

            <div className="w-full h-full mt-8 lg:mt-10 flex items-center justify-center font-poppins">
              <Link href="/properties">
                <button className="text-black bg-transparent font-semibold border border-black rounded-sm px-8 py-1 font-poppins text-base lg:text-xl hover:bg-black hover:text-white hover:border-none">
                  View All
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
