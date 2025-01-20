"use client";

import InsideNavabr from "@/componets/common/InsideNavabr";
import PropertryRooms from "@/componets/hotel-details/PropertryRooms";
import SubNavbarMobile from "@/componets/hotel/SubNavbarMobile";
import {
  fetchImages,
  fetchProperty,
  fetchRooms,
  setIsSearchOpen,
  setMatchedProperty as setMatchedPropertyAction,
} from "@/redux/dataSlice";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const [localMatchedProperty, setLocalMatchedProperty] = useState("");
  const { rooms, property, error, IsSearchOpen, allImages } = useSelector(
    (state) => state.data
  );

  const stableProperty = useMemo(() => property || [], [property]);

  useEffect(() => {
    // Get the matched property ID from local storage
    const match = JSON.parse(localStorage.getItem("matchedProperty"));
    if (match && match.id) {
      setLocalMatchedProperty(match.id);
    }

    // Fetch data if necessary
    if (!rooms || rooms.length === 0 || !property || property.length === 0) {
      dispatch(fetchRooms());
      dispatch(fetchProperty());
      dispatch(fetchImages());
    }
  }, [rooms, property, localMatchedProperty, dispatch]);

  const propertyWiseImages = allImages?.filter(
    (image) => image.property_id === localMatchedProperty
  );
  useEffect(() => {
    if (stableProperty.length > 0) {
      const foundProperty = stableProperty.find(
        (item) => item.id === localMatchedProperty
      );
      dispatch(setMatchedPropertyAction(foundProperty || null));
    }
  }, [stableProperty, localMatchedProperty, dispatch]);

  const matchRooms = useMemo(
    () => rooms.filter((room) => room?.property_id === localMatchedProperty),
    [rooms, localMatchedProperty, propertyWiseImages]
  );

  console.log(matchRooms, "matchRooms");
  console.log(localMatchedProperty, "localMatchedProperty");
  return (
    <div className="w-full mt-32 lg:mt-0">
      <div
        className={`fixed md:hidden top-0 pt-3 left-0 w-full z-50 bg-white transition-transform duration-500 ease-in-out`}
      >
        <InsideNavabr />
        {IsSearchOpen ? (
          <SubNavbarMobile
            IsSearchOpen={IsSearchOpen}
            onClose={() => dispatch(setIsSearchOpen(false))}
          />
        ) : null}
      </div>
      <PropertryRooms
        matchRooms={matchRooms}
        propertyWiseImages={propertyWiseImages}
      />
    </div>
  );
}
