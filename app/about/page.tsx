import { Metadata } from "next";

import ContactSection from "../home/contactsection";

import AbicSection from "./abicsection";
import CoreValuesSection from "./corevalues";
import MissionVissionSection from "./vm";
import StorySection from "./storysection";
import OurPartnerSection from "./partner";
import OurTeam from "./ourteam";

export const metadata: Metadata = {
  title: "About",
  description:
    "This page provides detailed information about ABIC Realty, showcasing the services and values we offer. Learn more about our commitment to providing exceptional real estate solutions.",

  openGraph: {
    title: "About | ABIC Realty",
    description:
      "This page provides detailed information about ABIC Realty, showcasing the services and values we offer. Learn more about our commitment to providing exceptional real estate solutions.",
    url: "https://www.abic-website.vercel.app/about",
    siteName: "ABIC Realty",
    images: [
      {
        url: "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-banner.png",
        width: 1200,
        height: 630,
        alt: "ABIC Realty team providing real estate solutions",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@AbicRealty",
    creator: "@AbicRealty",
    title: "About | ABIC Realty",
    description:
      "Learn more about ABIC Realty, our services, and values in providing top-tier real estate solutions.",
    images: [
      "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-banner.png",
    ],
  },

  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
  },
};


export default function AboutPage() {
  return (
    <section className="flex flex-col items-center w-full">
      <AbicSection />
      <StorySection />
      <MissionVissionSection />
      <CoreValuesSection />
      <OurTeam/>
      <OurPartnerSection />
      <ContactSection />
    </section>
  );
}
