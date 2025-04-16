"use client";

import React from 'react'
import { Image, Tooltip } from "@nextui-org/react";
import { BsCheckCircle, BsCopy } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';

interface ServiceDeetsComponentProps {
    service: {
        record: {
            id: string;
            name: string;
            description: string;
            image: string;
        };
    };
}



export default function ServiceDeetsComponent({ service }: ServiceDeetsComponentProps) {
    if (!service) { return <p>Something went wrong</p>; }
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{service.record.name}</h2>
                        </div>
                        <p className="mt-4 text-lg text-gray-500">
                            {service.record.description
                                .split(/(?<=[.?!])\s+/)
                                .map((sentence, index) => (
                                    <span key={index}>
                                        {sentence}
                                        {/* <br /> */}
                                        <br/>
                                    </span>
                                ))}
                        </p>

                        <div className="mt-8">
                            <div className="flex items-center">
                                <h3 className="flex-shrink-0 pr-4 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                    Key Benefits
                                </h3>
                                <div className="flex-1 border-t-2 border-gray-200"></div>
                            </div>
                            <ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                                {["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4"].map((benefit, index) => (
                                    <li key={index} className="flex items-start lg:col-span-1">
                                        <div className="flex-shrink-0">
                                            <BsCheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                                        </div>
                                        <p className="ml-3 text-sm text-gray-700">{benefit}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
                        <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                            <Image
                                isBlurred
                                isZoomed
                                src={`https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/services/${service.record.image}`}
                                alt={service.record.name}
                                width={1000}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}