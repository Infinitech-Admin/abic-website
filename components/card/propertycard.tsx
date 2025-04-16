"use client";
import React, { useState } from "react";
import { Card, CardBody, Image, Spinner } from "@nextui-org/react";
import { Link } from "@nextui-org/link";

import { toSlug } from "@/utils/slug";

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

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  let imageUrl = "";

  const [loadingCard, setLoadingCard] = useState<string | null>(null);

  try {
    const images: string[] = JSON.parse(property.images || "[]");

    if (Array.isArray(images) && images.length > 0) {
      imageUrl = `https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/properties/images/${images[0]}`;
    }
  } catch (error) {
    throw new Error("Error parsing images: " + error);
  }

  const handleClick = (id: string) => {
    setLoadingCard(id);
    setTimeout(() => {
      setLoadingCard(null);
    }, 50000);
  };

  return (
    <Link
      key={property.id}
      href={`/single/property/${property.id}/${toSlug(property.name)}/${toSlug(property.description)}`}
      onPress={() => handleClick(property.id)}
    >
      <Card className="relative">
        <CardBody className="overflow-visible p-1">
          {loadingCard === property.id && (
            <div
              className="absolute z-50 inset-0 flex justify-center items-center bg-white/70"
              style={{ borderRadius: "0.75rem" }}
            >
              <Spinner size="lg" />
              <span className="sr-only">Loading...</span>
            </div>
          )}

          <div className="relative">
            <Image
              alt={property.name}
              className="object-cover rounded-xl h-[250px] md:h-52 object-center"
              fallbackSrc="https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-fallback1.png"
              src={imageUrl}
              width={450}
            />

            <small
              className={`absolute top-2 z-10 left-2 px-1 text-[10px] line-clamp-1 font-semibold rounded-md uppercase ${
                {
                  "For Sale": "bg-green-200 text-green-700",
                  "For Rent": "bg-blue-200 text-blue-700",
                  "For Lease": "bg-yellow-200 text-yellow-700",
                }[property.status] || "bg-gray-500"
              }`}
            >
              {property.status}
            </small>
          </div>

          <div className="ml-2 py-4">
            <div className="flex items-center gap-1 py-1">
              <small
                className={`px-2 text-[10px] line-clamp-1 font-semibold rounded-md uppercase ${
                  {
                    "Fully-Furnished": "bg-green-200 text-green-700",
                    "Semi-Furnished": "bg-blue-200 text-blue-700",
                    "For Lease": "bg-yellow-200 text-yellow-700",
                  }[property.unit_status] || "bg-gray-500"
                }`}
              >
                {property.unit_status}
              </small>
            </div>

            <h1 className="font-bold text-base line-clamp-1 text-violet-800 uppercase">
              {property.unit_type} | {property.name}
            </h1>

            <p className="text-default-500 text-tiny  leading-3 line-clamp-1">
              {property.location}
            </p>

            <p className="text-md text-violet-800 uppercase font-bold pt-3">
              {property.price !== undefined && property.price !== null
                ? Number(property.price)
                    .toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                    .replace("PHP", "")
                    .trim()
                : "0.00"}
            </p>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default PropertyCard;
