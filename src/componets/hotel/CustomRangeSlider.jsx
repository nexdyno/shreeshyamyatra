"use client";

import { useState } from "react";

const CustomRangeSlider = () => {
  const [minValue, setMinValue] = useState(100);
  const [maxValue, setMaxValue] = useState(1000);

  const handleMinChange = (e) => setMinValue(Number(e.target.value));
  const handleMaxChange = (e) => setMaxValue(Number(e.target.value));

  const minPosition = ((minValue - 100) / (2000 - 100)) * 100; // Calculate % position for the min thumb
  const maxPosition = ((maxValue - 100) / (2000 - 100)) * 100; // Calculate % position for the max thumb

  return (
    <div className="flex flex-col items-start gap-1 w-full h-full justify-between px-3 font-poppins">
      <div className="relative w-full">
        {/* Track */}
        <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded transform -translate-y-1/2"></div>
        {/* Active Track */}
        <div
          className="absolute top-1/2 h-1 bg-primary rounded transform -translate-y-1/2"
          style={{
            left: `${minPosition}%`,
            width: `${maxPosition - minPosition}%`,
          }}
        ></div>
        {/* Thumb 1 */}
        <div
          className="absolute w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${minPosition}%` }}
        >
          {/* Price Label for Thumb 1 */}
          <div
            className="absolute top-5 text-sm font-medium text-black"
            style={{ transform: "translateX(-50%)" }}
          >
            ₹{minValue}
          </div>
        </div>
        {/* Thumb 2 */}
        <div
          className="absolute w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${maxPosition}%` }}
        >
          {/* Price Label for Thumb 2 */}
          <div
            className="absolute top-5 text-sm font-medium text-black"
            style={{ transform: "translateX(-50%)" }}
          >
            ₹{maxValue}
          </div>
        </div>
        {/* Range Inputs */}
        <input
          type="range"
          min={100}
          max={2000}
          value={minValue}
          onChange={handleMinChange}
          className="absolute top-1/2 transform -translate-y-1/2 w-full appearance-none bg-transparent pointer-events-auto hidden"
          style={{ zIndex: 2 }}
        />
        <input
          type="range"
          min={100}
          max={2000}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute top-1/2 transform -translate-y-1/2 w-full appearance-none bg-transparent pointer-events-auto"
          style={{ zIndex: 1 }}
        />
      </div>
    </div>
  );
};

export default CustomRangeSlider;
