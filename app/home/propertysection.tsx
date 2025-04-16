import React from "react";

import PropertyCard from "@/components/card/propertycard";
import NoData from "@/components/error/nodata";

interface Property {
  id: string;
  name: string;
  images: string;
  description: string;
  location: string;
  price: number;
  max_price: number;
  status: string;
  unit_type: string;
  unit_furnish: string;
  sale: string;
  unit_status: string;
  sale_type: string;
}

interface PropertySectionProps {
  properties: Property[];
}

const PropertySection = ({ properties = [] }: PropertySectionProps) => {
  return (
    <section className="flex flex-col justify-center items-center gap-6 py-12 md:py-12 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="font-bold text-2xl md:text-3xl text-violet-800 dark:text-white">
            Featured Properties
          </h1>
          <p className="text-sm md:text-lg text-default-500 dark:text-gray-300 leading-4">
            Discover your dream home from our curated collection of luxurious
            properties.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-1 md:gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 py-8">
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full">
              <NoData />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertySection;
