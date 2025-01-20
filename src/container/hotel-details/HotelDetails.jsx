import PhotoGallery from "@/componets/hotel-details/PhotoGallery";
import RoomDetails from "@/componets/hotel-details/RoomDetails";
import SubNavbarMobile from "@/componets/hotel/SubNavbarMobile";
import React, { useEffect } from "react";
import { fetchImages } from "@/redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";

export default function HotelDetails({ property }) {
  const dispatch = useDispatch();
  const { allImages } = useSelector((state) => state.data);

  // Find images specific to the current property
  const propertyWiseImages = allImages?.filter(
    (image) => image.property_id === property?.id
  );

  useEffect(() => {
    // Only dispatch fetchImages if allImages is empty or if propertyWiseImages is not found
    if (!allImages?.length || !propertyWiseImages) {
      dispatch(fetchImages());
    }
    // }, [allImages, property, propertyWiseImages, dispatch]); // Add all relevant dependencies
  }, []); // Add all relevant dependencies

  return (
    <section className="min-h-screen w-full lg:px-20 lg:pt-5 pb-10">
      <div className="min-h-[20vh] lg:min-h-[30vh]">
        <PhotoGallery propertyWiseImages={propertyWiseImages} />
      </div>
      <div className="min-h-[70vh]">
        <RoomDetails property={property} />
      </div>
    </section>
  );
}
