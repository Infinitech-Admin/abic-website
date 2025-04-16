import React from "react";

import { useArticles } from "./data";

import WhatsNewCard from "@/components/card/whatsnewcard";
import NoData from "@/components/error/nodata";


const TipsSection = () => {
  const { articles, isLoading, error } = useArticles();

  if (error) return <p className="text-red-500">An error has occurred.</p>;
  if (isLoading) return <p className="text-gray-500">Loading...</p>;

  return (
    <section className="flex flex-col items-center gap-6 py-6 md:py-16 w-full">
      <div className="container mx-auto">
        <div className="text-start">
          <h1 className="font-bold text-3xl md:text-4xl text-violet-700 dark:text-white">
            Real Estate Tips
          </h1>
          <p className="md:text-md text-default-500 max-w-2xl dark:text-gray-300">
            Get expert advice and valuable tips to navigate the real estate
            market, whether you’re buying, selling, or investing in properties.
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

export default TipsSection;
