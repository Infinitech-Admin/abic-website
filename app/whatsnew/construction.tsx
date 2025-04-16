import React from "react";

import WhatsNewCard from "@/components/card/whatsnewcard";
import NoData from "@/components/error/nodata";
import { useArticles } from "./data";

const ConstructionSection = () => {
  const { articles, isLoading, error } = useArticles();
  return (
    <section className="flex flex-col items-center gap-6 py-6 md:py-16 w-full">
      <div className="container mx-auto">
        <div className="text-start">
          <h1 className="font-bold text-3xl md:text-4xl text-violet-700 dark:text-white">
            On-going Infrastructure
          </h1>
          <p className="md:text-md text-default-500 max-w-2xl dark:text-gray-300">
            Stay informed about the latest infrastructure projects that shape
            the future of real estate, driving growth and creating new
            opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 py-12 gap-4">
          {articles.records["Real Estate Tips"]?.length > 0 ? (
            <WhatsNewCard data={articles.records["Real Estate Tips"]} />
          ) : (
            <div className="col-span-full">
              <NoData />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConstructionSection;
