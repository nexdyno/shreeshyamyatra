import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FilterSideBarSkeleton() {
  return (
    <section className="w-full h-full py-5">
      <div className="w-full px-5">
        {/* Filters Header */}
        <div className="w-full h-full border-b border-gray-300 pb-5">
          <div className="w-full flex items-center justify-between">
            <Skeleton width="30%" height={24} />
            <Skeleton width="20%" height={20} />
          </div>

          {/* Price Range */}
          <div className="py-3">
            <Skeleton width="25%" height={20} />
            <div className="py-2">
              <Skeleton height={12} />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="py-4 border-b border-gray-300">
          <Skeleton width="25%" height={20} className="mb-2" />
          <div className="flex flex-col gap-4 pt-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Skeleton width={16} height={16} circle />
                  <Skeleton width="70%" height={16} />
                </div>
              ))}
            <Skeleton width="30%" height={20} className="mt-2" />
          </div>
        </div>

        {/* Filters */}
        {Array(3)
          .fill(0)
          .map((_, filterIndex) => (
            <div key={filterIndex} className="py-4 border-b border-gray-300">
              <Skeleton width="30%" height={20} className="mb-2" />
              <div className="flex flex-col gap-4 pt-4">
                {Array(3)
                  .fill(0)
                  .map((_, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-4">
                      <Skeleton width={16} height={16} circle />
                      <Skeleton width="70%" height={16} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
