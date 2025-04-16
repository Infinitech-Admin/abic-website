"use client";

import { Card, CardBody } from "@nextui-org/react";
import React from "react";

const MissionVisionSection = () => {
  return (
    <section className="flex flex-col items-center gap-6 py-6 md:py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          {/* Vision Card */}
          <Card className="w-full md:w-1/2">
            <CardBody>
              <div className="text-center py-4">
                <h1 className="font-bold text-violet-700 uppercase text-2xl md:text-3xl py-4">
                  Vision
                </h1>
                <p className="text-default-500 text-base md:text-lg">
                  We strive to develop collaborative partnerships based on transparency and mutual trust, fostering enduring client relationships. As we grow, we remain committed to these principles, which have guided our company and clients through the years.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Mission Card */}
          <Card className="w-full md:w-1/2">
            <CardBody>
              <div className="text-center py-4">
                <h1 className="font-bold text-violet-700 uppercase text-2xl md:text-3xl py-4">
                  Mission
                </h1>
                <p className="text-default-500 text-base md:text-lg">
                  Our ethics are built on a commitment to superior customer service, blending an entrepreneurial mindset with the personalized service of a dynamic organization. We measure success by the results we deliver to clients.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
