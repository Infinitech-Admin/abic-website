import React from "react";

import WhatsNewCard from "@/components/card/whatsnewcard";
import { useArticles } from "./data";
import NoData from "@/components/error/nodata";
import Loading from "@/components/loaders/loading";

const SeminarSection = () => {
  const { articles, isLoading, error } = useArticles();

  if (error) return <p className="text-red-500">An error has occurred.</p>;

  return (
    <section className="flex flex-col items-center gap-6 py-6 md:py-16 w-full">
      <div className="container mx-auto">
        <div className="text-start">
          <h1 className="font-bold text-4xl md:text-4xl text-violet-700 dark:text-white">
            Seminars
          </h1>
          <p className="md:text-md text-default-500 max-w-2xl dark:text-gray-300">
            Explore our engaging seminars designed to inspire, educate, and
            empower individuals in real estate and beyond.
          </p>
        </div>

        {isLoading ? (
          <Loading label="Loading Seminars" />
        ) : articles.records.Seminars?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 py-12 gap-4">
            <WhatsNewCard data={articles.records.Seminars} />
          </div>
        ) : (
          <div className="col-span-full">
            <NoData />
          </div>
        )}

      </div>
    </section>
  );
};

export default SeminarSection;
