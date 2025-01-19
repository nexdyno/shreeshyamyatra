import SubNavbarMobile from "@/componets/hotel/SubNavbarMobile";
import FilterSideBar from "@/componets/hotel/FilterSideBar";
import RoomsCards from "@/componets/hotel/RoomsCards";
import RoomDetailsSkeleton from "@/componets/hotel/RoomDetailsSkeleton";
import FilterSideBarSkeleton from "@/componets/hotel/FilterSideBarSkeleton";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack, IoMdArrowBack } from "react-icons/io";
import { setIsSearchOpen } from "@/redux/dataSlice";
import InsideNavabr from "@/componets/common/InsideNavabr";

export default function ShowHotels({ data, status, error }) {
  const dispatch = useDispatch();
  const { bookingDate, roomAndGuest, IsSearchOpen } = useSelector(
    (state) => state.data
  );

  return (
    <div className=" w-full h-screen  flex flex-col lg:flex-row">
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
      <div
        className="w-full lg:w-[20%] h-full overflow-y-auto hidden lg:block"
        style={{
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#2276E3",
        }}
      >
        {(status === "loading" || status === "idle") && (
          <FilterSideBarSkeleton />
        )}
        {status === "succeeded" && <FilterSideBar />}
      </div>
      <div
        className="w-full lg:w-[80%] h-full overflow-y-auto"
        style={{
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#2276E3",
        }}
      >
        {(status === "loading" || status === "idle") && <RoomDetailsSkeleton />}

        {status === "failed" && (
          <div className="flex justify-center items-center h-screen">
            <p className="text-red-600">
              {error || "An unexpected error occurred. Please try again later."}
            </p>
          </div>
        )}

        {status === "succeeded" && <RoomsCards data={data} />}
      </div>
    </div>
  );
}
