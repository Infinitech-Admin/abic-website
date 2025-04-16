"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";

import ContactCard from "@/components/card/contactcard";
import ContactInfoCard from "@/components/card/contactinfo";

const ContactSection = () => {
  return (
    <section className="flex flex-col items-center gap-6 py-6 md:py-12 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center">
          <div className="col-span-3 lg:col-span-2">
            <h1 className="font-bold max-w-lg text-4xl  text-violet-700">
              Connect with us
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl dark:text-gray-300 leading-6 py-2">
              Our top-rated agents are here to provide unmatched guidance and
              personalized service to help you find the perfect home or
              property. Let us make your journey seamless and rewarding!
            </p>

            <ContactInfoCard />
          </div>

          <div className="col-span-3 lg:col-span-1">
            <Card className="lg:max-w-lg">
              <CardBody className="py-8 px-4">
                <ContactCard />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
