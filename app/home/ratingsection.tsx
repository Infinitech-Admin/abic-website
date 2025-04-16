"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { MdHomeRepairService, MdLoyalty } from "react-icons/md";
import { RiUserHeartFill } from "react-icons/ri";
import { TbUserQuestion } from "react-icons/tb";
import FeedbackForm from "./feedbackform";

const RatingSection = () => {
  return (
    <section className="flex flex-col items-center gap-6 py-8 md:py-2 w-full justify-center">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="text-center">
          <h1 className="font-bold text-2xl md:text-3xl text-violet-700 dark:text-white">
            Share Your Experience
          </h1>
          <p className="text-sm md:text-lg text-default-500 dark:text-gray-300 leading-6">
            We&apos;d love to hear your feedback! Share your rating and help us improve our services.
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Feedback Benefits Card */}
            <div className="col-span-2">
              <div className="w-full md:py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    {
                      icon: <MdHomeRepairService className="text-violet-700" size={24} />,
                      title: "Improves Products/Services:",
                      description: "Helps identify areas for improvement.",
                    },
                    {
                      icon: <RiUserHeartFill className="text-violet-700" size={24} />,
                      title: "Enhances Customer Experience:",
                      description: "Shows what customers value and what needs adjustment.",
                    },
                    {
                      icon: <MdLoyalty className="text-violet-700" size={24} />,
                      title: "Builds Customer Loyalty:",
                      description: "Demonstrates that the business values customer opinions.",
                    },
                    {
                      icon: <TbUserQuestion className="text-violet-700" size={24} />,
                      title: "Guides Business Decisions:",
                      description: "Provides data-driven insights for strategic planning.",
                    },
                  ].map((item, index) => (
                    <Card key={index} className="md:py-4">
                      <CardBody>
                        <div className="flex md:flex-col md:justify-center items-center gap-4">
                          <div className="bg-violet-300 p-2 rounded-lg">{item.icon}</div>
                          <div className="md:text-center">
                            <h2 className="font-bold md:text-lg">{item.title}</h2>
                            <p className="text-default-500 text-sm">{item.description}</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback Form with Background Image */}
            <div
              className="col-span-2 relative flex items-center justify-center p-8 rounded-xl"
              style={{
                backgroundImage: "url('https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/ABIC+Realty+Banner.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay to Improve Readability */}
              <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

              {/* Feedback Form */}
              <div className="relative z-10 w-full max-w-xs">
                <Card className="bg-white/20 backdrop-blur-md shadow-lg">
                  <CardBody>
                    <FeedbackForm />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RatingSection;
