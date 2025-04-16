"use client";
import { Button, Image } from "@nextui-org/react";
import React from "react";
import { FaArrowRightLong, FaPhone } from "react-icons/fa6";
import Link from "next/link";

import SearchBar from "@/components/form/searchbar";

const HeroSection = () => {
  return (
    <section className="relative w-full h-auto overflow-vissible">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-hero-bg.mp4"
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-start bg-black bg-opacity-50">
        {/* Image */}
        <Image
          alt="NextUI hero Image"
          className="w-auto h-96 md:h-auto md:max-w-screen-lg relative mt-0 pt-0"
          src="https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-hero-overlay.png"
        />

        <div className="absolute top-1/2 px-4 sm:ml-16 transform -translate-y-1/2 z-20 text-white">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 capitalize max-w-md">
            Find your dream home today
          </h1>
          <p className="text-sm md:text-xl max-w-lg">
            Discover the perfect property that fits your lifestyle. Whether you
            are buying, selling, or renting, our dedicated team is here to guide
            you through every step of the process.
          </p>

          <div className="flex gap-4 py-8">
            <Button
              className="bg-violet-700 text-white"
              endContent={<FaArrowRightLong />}
              variant="solid"
            >
              <Link href={"/about"}>Discover More</Link>
            </Button>

            <Button
              as="a"
              className="border-2 border-violet-700 text-white"
              startContent={<FaPhone />}
              variant="ghost"
              href="tel:09651983796"
            >
              Call Us Now
            </Button>

          </div>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar />
    </section>
  );
};

export default HeroSection;
