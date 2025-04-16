"use client";

import React, { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"; // Import useRouter hook

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

interface Props {
  properties: Property[];
}

export default function PropertyFinderClient({ properties }: Props) {
  const router = useRouter(); // Initialize useRouter

  return (
    <section className="px-4 flex flex-col items-center w-full">
      <div className="container mx-auto">
        <div className="flex flex-col">
          <h1 className="font-bold text-4xl md:text-4xl text-violet-700 dark:text-white">
            Property Finder
          </h1>
          <p className="text-lg md:text-md text-default-500 max-w-xl dark:text-gray-300 leading-relaxed">
            Discover the perfect property with unmatched quality, dedication,
            and personalized guidance.
          </p>

          {/* Back to Home button positioned top-left */}
          <button
            onClick={() => router.push("/")}
            className="bg-violet-700 text-white rounded-md mt-4 text-sm px-4 py-2 inline-block w-[100px] mb-6"
          >
            Back
          </button>

          <Suspense fallback={<div>Loading sections...</div>}>
            <FilteredPropertiesSection properties={properties} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function FilteredPropertiesSection({ properties }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // Remove commas from the query to support both formats
  const queryWithoutCommas = query.replace(/,/g, "");
  const queryAsNumber = parseFloat(queryWithoutCommas);

  const filteredProperties = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();

    return properties.filter((property) => {
      const isPriceSearch = !isNaN(queryAsNumber);
      const isUnitTypeSearch = property.unit_type.toLowerCase() === lowerCaseQuery;
      const isUnitStatusSearch = property.unit_status.toLowerCase() === lowerCaseQuery;
      // Prioritize unit type search
      if (isUnitTypeSearch) {
        return true;
      }

      if (isPriceSearch) {
        // Compare price after removing commas from the property price
        return Number(property.price) === queryAsNumber;
      }

      // Otherwise, search by name or location
      return (
        property.name.toLowerCase().includes(lowerCaseQuery) ||
        property.location.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }, [properties, query, queryAsNumber]); // Add queryAsNumber to the dependency array

  return (
    <>
      <p className="py-12">
        Search Results: {query || "No search term provided"}
      </p>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-12 md:gap-4">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="col-span-full">
            <NoData />
          </div>
        )}
      </div>
    </>
  );
}
