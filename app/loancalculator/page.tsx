import React from "react";
import { Metadata } from "next";

import LoanCalculator from "@/components/card/calculator";

export const metadata: Metadata = {
  title: "Loan Calculator",
  description:
    "Use our loan calculator to estimate monthly payments for your real estate purchase. Plan your finances with accurate and reliable calculations.",

  openGraph: {
    title: "Loan Calculator | ABIC Realty",
    description:
      "Calculate your real estate loan payments easily with our loan calculator. Get accurate monthly estimates to make informed financial decisions.",
    url: "https://www.abic-website.vercel.app/loancalculator",
    siteName: "ABIC Realty",
    images: [
      {
        url: "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-loan-calculator-banner.png", // Replace with an actual relevant image
        width: 1200,
        height: 630,
        alt: "ABIC Realty Loan Calculator",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@AbicRealty",
    creator: "@AbicRealty",
    title: "Loan Calculator | ABIC Realty",
    description:
      "Easily estimate your monthly mortgage or real estate loan payments using our accurate loan calculator. Plan your budget with confidence.",
    images: [
      "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-loan-calculator-banner.png", // Ensure this is a valid image
    ],
  },

  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
  },
};


const CalculatorPage = () => {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-start">
          <h1 className="font-bold text-4xl md:text-4xl text-violet-700 dark:text-white">
            Loan Calculator
          </h1>
          <p className="md:text-md text-default-500 max-w-2xl dark:text-gray-300">
            Calculate your loan payments effortlessly and plan your finances
            with confidence.
          </p>
        </div>

        <div className="py-12">
          <LoanCalculator />
        </div>
      </div>
    </section>
  );
};

export default CalculatorPage;
