import { Metadata } from "next";

import ServicesCard from "@/components/card/servicescard";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore ABIC Realty's professional real estate services, including property buying, selling, leasing, and investment advisory. Let us help you find the perfect property.",

  openGraph: {
    title: "Our Services | ABIC Realty",
    description:
      "ABIC Realty offers expert real estate services, including buying, selling, leasing, and investment advisory. Find your ideal property with us.",
    url: "https://www.abic-website.vercel.app/services",
    siteName: "ABIC Realty",
    images: [
      {
        url: "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-services-banner.png",
        width: 1200,
        height: 630,
        alt: "ABIC Realty Services",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@AbicRealty",
    creator: "@AbicRealty",
    title: "Our Services | ABIC Realty",
    description:
      "Discover ABIC Realty’s expert real estate services. We assist with property buying, selling, leasing, and investment advisory.",
    images: [
      "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-services-banner.png",
    ],
  },

  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
  },
};

export default function ServicesPage() {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl md:text-4xl text-violet-700 dark:text-white">
            Our Services
          </h1>
          <p className="md:text-md text-default-500 max-w-2xl dark:text-gray-300 ">
            Experience exceptional real estate services, tailored to meet your
            needs and exceed expectations.
          </p>
        </div>
      
          <ServicesCard />
      
      </div>
    </section>
  );
}
