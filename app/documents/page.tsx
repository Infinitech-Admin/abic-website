import React from "react";
import { Metadata } from "next";

import DocumentTable from "@/components/table/documenttable";

export const metadata: Metadata = {
  title: "DMCI Documents",
  description:
    "Access important documents related to DMCI properties, including agreements, floor plans, and other essential information.",

  openGraph: {
    title: "DMCI Documents | ABIC Realty",
    description:
      "Access important documents related to DMCI properties, including agreements, floor plans, and other essential information.",
    url: "https://www.abic-website.vercel.app/documents",
    siteName: "ABIC Realty",
    images: [
      {
        url: "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-documents-banner.png", // Replace with an actual relevant image
        width: 1200,
        height: 630,
        alt: "Important DMCI Property Documents",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@AbicRealty",
    creator: "@AbicRealty",
    title: "DMCI Documents | ABIC Realty",
    description:
      "Browse and download important documents related to DMCI properties, including agreements, floor plans, and legal files.",
    images: [
      "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-documents-banner.png", // Ensure this is a valid image
    ],
  },

  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
  },
};


const DocumentsPage = () => {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-start">
          <h1 className="font-bold text-4xl md:text-4xl text-violet-700 dark:text-white">
            DMCI Documents
          </h1>
          <p className="md:text-md text-default-500 max-w-2xl dark:text-gray-300">
            Access and manage important DMCI documents with ease, ensuring
            seamless transactions and peace of mind.
          </p>
        </div>

        <div className="py-8">
          <DocumentTable />
        </div>
      </div>
    </section>
  );
};

export default DocumentsPage;
