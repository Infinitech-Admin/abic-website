import React from "react";
import { GrMapLocation } from "react-icons/gr";

const NearbyFallback = () => {
  return (
    <div className="w-full py-6">
      <div className="text-center">
        <div className="flex justify-center mb-4 text-6xl text-gray-600">
          <GrMapLocation />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          No Nearby Properties
        </h2>
        <p className="text-sm text-gray-500">
          It seems there are no properties nearby. Please check back later or
          explore other areas.
        </p>
      </div>
    </div>
  );
};

export default NearbyFallback;
