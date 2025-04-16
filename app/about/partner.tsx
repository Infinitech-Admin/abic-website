import React from "react";
import Image from "next/image"; // Import Image from next/image

// Define the expected structure of a partner
interface Partner {
  id: number;
  name?: string;
  image?: string;
}

// Fetch function with an explicit return type
const fetchCareers = async (): Promise<Partner[]> => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/partners`;
    const res = await fetch(endpoint, { cache: "no-store" });

    if (!res.ok) {
      console.error("Failed to fetch careers:", res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    return data.records || [];
  } catch (error) {
    console.error(
      "Failed to fetch careers:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
};

export default async function OurPartnerSection() {
  const data: Partner[] = await fetchCareers();

  return (
    <section className="flex flex-col items-center gap-6 py-6 md:py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-bold text-violet-700 uppercase text-3xl">
            Our Partner
          </h1>
          <p className="text-default-500 max-w-xl text-sm md:text-lg">
            Partnering with trusted names to deliver exceptional real estate
            services and opportunities.
          </p>
        </div>

        {/* Adjusted grid for centering and removing spacing */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 max-w-2xl mx-auto py-12">
          {data.map((partner: Partner, index: number) => (
            <div key={partner.id || index} className="flex justify-center items-center">
              {partner.image ? (
                <Image
                  alt={partner.name || `Partner ${index + 1}`}
                  className="object-cover text-center"
                  src={`https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/partners/${partner.image}`}
                  width={200} // Adjust the width as needed
                  height={200} // Adjust the height as needed
                  layout="intrinsic" // You can adjust the layout type as well
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
