import React from "react";
import { Metadata } from "next";

import PropertyCard from "@/components/card/propertycard";
import NoData from "@/components/error/nodata";
import { getAuthHeaders } from "@/components/headers";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse a diverse selection of properties for sale and rent. Find your dream home or next investment with ABIC Realty's expert listings.",

  openGraph: {
    title: "Properties | ABIC Realty",
    description:
      "Discover premium properties for sale and rent. Explore condos, houses, and commercial spaces available with ABIC Realty.",
    url: "https://www.abic-website.vercel.app/properties",
    siteName: "ABIC Realty",
    images: [
      {
        url: "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-properties-banner.png", // Replace with an actual relevant image
        width: 1200,
        height: 630,
        alt: "ABIC Realty Property Listings",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@AbicRealty",
    creator: "@AbicRealty",
    title: "Properties | ABIC Realty",
    description:
      "Explore ABIC Realty's curated selection of properties for sale and rent. Find your perfect home or investment today.",
    images: [
      "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-properties-banner.png", // Ensure this is a valid image
    ],
  },

  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
  },
};


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
  unit_status: string;
  sale: string;
  sale_type: string;
}

// Fetch properties with ISR
const fetchProperties = async (): Promise<Property[]> => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/properties`;
    if (!endpoint) {
      throw new Error("API URL is not defined in the environment variables");
    }
    const res = await fetch(endpoint, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch properties: ${res.status} - ${res.statusText}`,
      );
    }

    const data = await res.json();

    return data.records || [];
  } catch (error) {
    throw new Error(
      `Failed to fetch properties: ${error instanceof Error ? error.message : error}`,
    );
  }
};

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const properties = await fetchProperties();

  return (
    <section className="flex flex-col items-center w-full">
      <div className="container mx-auto px-4">
        <div className="">
          <h1 className="font-bold text-4xl md:text-5xl text-violet-700 dark:text-white uppercase">
            Properties
          </h1>
          <p className="text-sm md:text-lg text-default-500 dark:text-gray-300">
            Discover the perfect property with unmatched quality, dedication,
            and personalized guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-12">
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
}
