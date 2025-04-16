import React from "react";

import { useTestimonials } from "./data";

import TestimonyCard from "@/components/card/testimony";
import Loading from "@/components/loaders/loading";

const TestemonialSection: React.FC = () => {
  const { testimonials, isLoading, error } = useTestimonials();

  if (error) return <p className="text-red-500">An error has occurred.</p>;

  return (
    <section className="flex flex-col items-center gap-6 py-8 md:py-16 w-full">
      <div className="container mx-auto">
        <div className="text-start">
          <h1 className="font-bold text-3xl md:text-4xl text-violet-700">
            Testimonials
          </h1>

          <p className="md:text-md text-default-500 max-w-2xl">
            Explore the stories and experiences of our delighted clients who
            found their dream homes with our dedicated support.
          </p>
        </div>

        <div className="py-12 ">
          {isLoading ? (
            <Loading label="Loading Testimonials" />
          ) : (
            <TestimonyCard testimony={testimonials.records} />
          )}
        </div>
      </div>
    </section>
  );
};

export default TestemonialSection;
