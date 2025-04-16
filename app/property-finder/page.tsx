import React from "react";

import PropertyFinderClient from "./propertyfinderdata";

import { getAuthHeaders } from "@/components/headers";

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

// Fetch properties function (you can keep it the same)
const fetchProperties = async (): Promise<Property[]> => {
  let properties: Property[] = [];

  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/properties`;
    const headers = getAuthHeaders();

    if (!endpoint) {
      throw new Error("API URL is not defined in the environment variables");
    }
    const res = await fetch(endpoint, {
      cache: "no-store",
      headers: headers,
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch properties: ${res.status} - ${res.statusText}`,
      );
    }

    const data = await res.json();

    properties = data.records || [];
  } catch (error) {
    throw new Error(
      `Failed to fetch properties: ${error instanceof Error ? error.message : error}`,
    );
  }

  return properties;
};

export const dynamic = "force-dynamic";

export default async function PropertyFinderPage() {
  const properties = await fetchProperties();

  return <PropertyFinderClient properties={properties} />;
}
