"use client";
import React from "react";
import { Card, CardBody, Image, Link } from "@nextui-org/react";

import NearbyFallback from "@/components/fallback/nearby";

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
  amenities: string;
  sale_type: string;
  unit_status: string;
}

interface PropertyProps {
  properties: Property[];
  currentPropertyId: string;
}

const Nearby: React.FC<PropertyProps> = ({ properties, currentPropertyId }) => {
  const currentProperty = properties.find(
    (property) => property.id === currentPropertyId,
  );

  if (!currentProperty) {
    return <div>No property found for the given ID.</div>;
  }

  const isNearby = (location1: string, location2: string) => {
    const matchWords = ["pasig", "makati", "manila", "quezon", "taguig"];

    const lowerLocation1 = location1.toLowerCase();
    const lowerLocation2 = location2.toLowerCase();

    // Check if any match word is found in both locations
    return matchWords.some(
      (word) => lowerLocation1.includes(word) && lowerLocation2.includes(word),
    );
  };

  const nearbyProperties = properties.filter(
    (property) =>
      property.id !== currentPropertyId &&
      isNearby(property.location, currentProperty.location),
  );

  const defaultImage =
    "https://www.dmcihomes.com/uploads/media/executives-1563253639282.jpg";

  return (
    <>
      {nearbyProperties.length === 0 ? (
        <NearbyFallback />
      ) : (
        nearbyProperties.map((property, index) => {
          let parsedImages: string[] = [];

          try {
            parsedImages = JSON.parse(property.images || "[]");
          } catch {
            parsedImages = [];
          }

          return (
            <section key={index} className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 py-12 md:py-16 w-full">
              <Link  href={`/view/property?id=${property.id}`}>
                <Card>
                  <CardBody className="overflow-visible">
                    <div className="relative">
                      <Image
                        isBlurred
                        isZoomed
                        alt={property.name}
                        className="object-cover rounded-xl h-32 md:h-52"
                        fallbackSrc={defaultImage}
                        src={
                          parsedImages.length > 0
                            ? `https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/properties/images/${parsedImages[0]}`
                            : defaultImage
                        }
                        width={450}
                      />

                      <small
                        className={`absolute top-2 z-10 left-2 px-2 text-tiny line-clamp-1 py-0.5 font-semibold rounded-md ${{
                            "For Sale": "bg-green-200 text-green-700",
                            "For Rent": "bg-blue-200 text-blue-700",
                            "For Lease": "bg-yellow-200 text-yellow-700",
                          }[property.status] || "bg-gray-500"
                          }`}
                      >
                        {property.status}
                      </small>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center gap-1">
                        <small
                          className={`px-2 text-tiny line-clamp-1 font-semibold rounded-md ${{
                              "Fully-Furnished": "bg-green-200 text-green-700",
                              "Semi Furnished": "bg-yellow-200 text-yellow-700",
                              Bare: "bg-blue-200 text-blue-700",
                              Unfurnished: "bg-gray-200 text-gray-700",
                            }[property.unit_status] || "bg-gray-500"
                            }`}
                        >
                          {property.unit_status}
                        </small>
                      </div>

                      <h4 className="font-bold text-base line-clamp-1 text-violet-800">
                        {property.name} | {property.unit_type}
                      </h4>

                      <p className="text-default-500 text-tiny leading-3 line-clamp-1">
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
            </section>

          );
        })
      )}
    </>
  );
};

export default Nearby;
