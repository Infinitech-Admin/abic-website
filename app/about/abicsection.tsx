"use client";
import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import { FaHandsHelping, FaHome } from "react-icons/fa";
import { FaCheck, FaChartBar, FaClock } from "react-icons/fa6";

const services = [
  { text: "Expert guidance in buying and selling properties", icon: <FaHome className="text-violet-800" size={18} /> },
  { text: "Comprehensive market analysis and insights", icon: <FaChartBar className="text-violet-800" size={18} /> },
  { text: "Commitment to exceptional customer service", icon: <FaHandsHelping className="text-violet-800" size={18} /> },
  { text: "Over 5 years of trusted experience in real estate", icon: <FaClock className="text-violet-800" size={18} /> },
];

const AbicSection = () => {
  return (
    <section className="flex flex-col items-center gap-6  md:py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <Image
              isBlurred
              isZoomed
              alt="NextUI hero Image"
              className="w-full"
              src="https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-about.jpg"
            />
          </div>
          <div className="md:px-4">
            <h1 className="font-bold text-lg md:text-2xl text-violet-800 py-2 uppercase">
              Who is ABIC Realty & Consultancy Corporation
            </h1>
            <p>
              At <strong>ABIC Realty & Consultancy Corporation</strong>, we
              pride ourselves on being a leader in the real estate market. With
              over three decades of experience, our team is dedicated to helping
              you find the perfect home or investment property. We understand
              that real estate is not just about transactions; it’s about
              building relationships and ensuring satisfaction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 py-8 gap-2">
              {services.map((service, index) => (
                <Card key={index} className="py-2">
                  <CardBody className="px-4">
                  <div className="flex flex-col items-start text-left gap-2">
                      <div className="bg-violet-300 p-2 rounded-lg flex items-center justify-start">
                        {service.icon}
                      </div>
                      <p className="text-default-500">{service.text}</p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AbicSection;
