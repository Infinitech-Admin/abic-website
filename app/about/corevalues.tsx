"use client";
import React from "react";

import CoreValuesCard from "@/components/card/corevaluescard";

const CoreValuesSection = () => {
  return (
    <section className="flex flex-col items-center gap-6 py-6 md:py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-bold text-2xl md:text-3xl text-violet-700 uppercase">
            Our Core Values
          </h1>
          <p className="text-sm md:text-lg text-default-500 max-w-2xl dark:text-gray-300 leading-4">
            Integrity, excellence, and personalized service define us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-8 gap-2">
          <CoreValuesCard />
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
