import React from "react";

import FAQAccordion from "@/components/accordion/faq";

const FAQ = () => {
  return (
    <section className="flex flex-col items-center gap-6 py-12 md:py-16 w-full">
      <div className="container mx-auto">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl md:text-4xl text-violet-700 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-lg text-default-500 max-w-2xl dark:text-gray-300 leading-4">
            Find answers to common questions about buying, selling, and renting
            properties. Get all the information you need to make informed
            decisions.
          </p>
        </div>
        <div className="py-12">
          <FAQAccordion />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
