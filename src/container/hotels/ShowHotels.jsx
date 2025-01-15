import SubNavbarMobile from "@/componets/hotel/SubNavbarMobile";
import FilterSideBar from "@/componets/hotel/FilterSideBar";
import RoomsCards from "@/componets/hotel/RoomsCards";
import RoomDetailsSkeleton from "@/componets/hotel/RoomDetailsSkeleton";
import FilterSideBarSkeleton from "@/componets/hotel/FilterSideBarSkeleton";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack, IoMdArrowBack } from "react-icons/io";
import { setIsSearchOpen } from "@/redux/dataSlice";

export default function ShowHotels({ data, status, error }) {
  const dispatch = useDispatch();
  const { bookingDate, roomAndGuest, IsSearchOpen } = useSelector(
    (state) => state.data
  );

  return (
    <div className="w-full h-screen  flex flex-col lg:flex-row">
      <div className="w-full md:hidden">
        <div className="bg-white py-4 border-b px-6 flex items-center justify-between shadow-sm rounded-sm">
          {/* Left Section */}
          <div className="flex flex-col gap-2">
            {/* Header with Back Arrow and Title */}
            <div className="flex items-center">
              <span className="cursor-pointer text-gray-600 -ml-5">
                <IoMdArrowBack size={20} className="text-black font-bold" />
              </span>
              <p className="ml-4 text-lg font-semibold font-poppins text-gray-800">
                Kahtu Shyam Mandir
              </p>
            </div>

            {/* Booking Info */}
            <div className="flex items-center text-sm font-semibold font-poppins text-gray-600 px-2">
              {/* Date Range */}
              <span className="mr-6">
                {bookingDate
                  ? `${new Date(bookingDate?.startDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )} - ${new Date(bookingDate?.endDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}`
                  : "Please select the date"}
              </span>

              {/* Room and Guest Info */}
              <span>
                {roomAndGuest
                  ? `${roomAndGuest?.room} room${
                      roomAndGuest.room > 1 ? "s" : ""
                    } · ${roomAndGuest?.guest} guest${
                      roomAndGuest.guest > 1 ? "s" : ""
                    }`
                  : ""}
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <div className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 cursor-pointer shadow-sm">
            <CiEdit
              onClick={() => dispatch(setIsSearchOpen(true))}
              size={24}
              className="text-gray-600"
            />
          </div>
        </div>
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
