import SubNavbarMobile from "@/componets/hotel/SubNavbarMobile";
import FilterSideBar from "@/componets/hotel/FilterSideBar";
import RoomsCards from "@/componets/hotel/RoomsCards";

export default function ShowHotels({ data, status, error }) {
  return (
    <div className="w-full h-screen pt-5 flex flex-col lg:flex-row">
      <div className="w-full md:hidden">
        <SubNavbarMobile />
      </div>
      <div
        className="w-full lg:w-[20%] h-full overflow-y-auto hidden lg:block"
        style={{
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#2276E3",
        }}
      >
        <FilterSideBar />
      </div>
      <div
        className="w-full lg:w-[80%] h-full overflow-y-auto"
        style={{
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#2276E3",
        }}
      >
        {(status === "loading" || status === "idle") && (
          <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
          </div>
        )}

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
