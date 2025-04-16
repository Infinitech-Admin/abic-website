'use client'
import FAQ from '@/app/single/property/[id]/[name]/[description]/faq';
import Nearby from '@/app/single/property/[id]/[name]/[description]/nearby';
import { Tooltip } from '@nextui-org/react';
import React from 'react'
import toast from 'react-hot-toast';
import { BsCopy, BsHouseCheckFill } from 'react-icons/bs';
import { FaCalendarCheck } from 'react-icons/fa6';
import { LuBuilding2 } from 'react-icons/lu';
import { MdPayments } from 'react-icons/md';
import { TbRulerMeasure2 } from 'react-icons/tb';

interface Property {
    id: string;
    name: string;
    images: string;
    description: string;
    location: string;
    price: number;
    max_price: number;
    status: string;
    unit_type: string;
    unit_furnish: string;
    sale: string;
    user_id: string;
    sale_type: string;
    unit_status: string;
    payment: string;
    area: number;
    unit_number: number;
    terms: string;
    title: string;
    turnover: string;
    amenities: string;
}

interface PropertyProps {
    properties: Property;
}


function getOrdinalSuffix(n: number): string {
    if (n % 100 >= 11 && n % 100 <= 13) return "th";
    switch (n % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

const PropertyDetails: React.FC<PropertyProps> = ({ properties }) => {
    const handleShare = () => {
        const shareableLink = window.location.href;
        toast.success('Link copied to clipboard!');
        navigator.clipboard.writeText(shareableLink);
    };

    const amenities: string[] = JSON.parse(properties.amenities);

    return (
        <>
            {/* Property Status */}
            <div className="flex items-center gap-2 uppercase">
                <small className="px-1 py-0.5 text-tiny line-clamp-1 font-semibold rounded-md bg-green-200 text-green-700">
                    {properties.unit_status}
                </small>

                <span className="bg-blue-200 px-1 py-0.5 rounded-md font-medium text-blue-800 text-tiny">
                    {properties.status}
                </span>
            </div>

            {/* Property Name */}
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl md:text-3xl mt-2">
                    {properties.unit_type} | {properties.name}
                </h1>{" "}

                {/* Copy Link to Clipboard */}
                <Tooltip showArrow={true} content="Share link">
                    <div
                        onClick={handleShare}
                        className="relative cursor-pointer text-indigo-600 hover:text-indigo-400 hover:scale-125"
                    >
                        <BsCopy size={24} className="relative" />
                    </div>
                </Tooltip>
            </div>

            {/* Property Location */}
            <div>
                <p className="text-default-500 text-sm">
                    {properties.location}
                </p>{" "}
            </div>

            <div className="flex flex-col gap-6 mt-4">
                {/* Description */}
                <div>
                    <h1 className="font-bold uppercase">Description</h1>
                    <p className="text-default-500 text-md">
                        {properties.description}
                    </p>
                </div>

                <h1 className="font-bold uppercase">Details</h1>
                <div className="flex flex-wrap gap-2">

                    {properties.status === "For Sale" ? (
                        <>
                            <div className="flex items-center gap-2 bg-default-200 px-2 py-2 rounded-lg">
                                <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-full">
                                    <BsHouseCheckFill />
                                </div>
                                <p className="text-base text-violet-600">
                                    {properties.status}
                                </p>
                            </div>


                            {properties.sale_type === "RFO" ? (
                                <>

                                    <div className="flex items-center gap-2 bg-default-200 px-2 py-2 rounded-lg">
                                        <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-lg">
                                            <BsHouseCheckFill />
                                        </div>
                                        <p className="text-base text-violet-600">
                                            {properties.sale_type}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 bg-default-200 px-2 py-2 rounded-lg">
                                        <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-lg">
                                            <MdPayments />
                                        </div>
                                        <p className="text-base text-violet-600">
                                            {properties.payment}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 bg-default-200 px-2 py-2 rounded-lg">
                                        <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-lg">
                                            <BsHouseCheckFill />
                                        </div>
                                        <p className="text-base text-violet-600">
                                            {properties.title}
                                        </p>
                                    </div>

                                </>
                            ) : properties.sale_type === "Pre-Selling" ? (
                                <>

                                    <div className="flex items-center gap-2 bg-default-200 px-2 py-2 rounded-lg">
                                        <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-lg">
                                            <BsHouseCheckFill />
                                        </div>
                                        <p className="text-base text-violet-600">
                                            {properties.sale_type}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 bg-default-200 px-2 py-2 rounded-lg">
                                        <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-lg">
                                            <FaCalendarCheck />
                                        </div>
                                        <p className="text-base text-violet-600">
                                            {new Date(properties.turnover).toLocaleDateString("en-US", {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </>
                            ) : null}

                        </>
                    ) : properties.status === "For Rent" ? (
                        <>
                            <div className="flex items-center gap-2 bg-default-200 px-2 py-2 rounded-lg">
                                <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-full">
                                    <BsHouseCheckFill />
                                </div>
                                <p className="text-base text-violet-600">
                                    {properties.status}
                                </p>
                            </div>

                            <div className="text-base text-violet-600">
                                <div className="flex items-center gap-2 bg-default-200 px-2 py-2 rounded-lg">
                                    <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-lg">
                                        <MdPayments />
                                    </div>
                                    <p className="text-base text-violet-600">
                                        {properties.terms}
                                    </p>
                                </div>
                            </div>
                        </>

                    ) : null}

                    <div className="flex items-center gap-2 bg-default-200 px-2 py-2 rounded-lg">
                        <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-lg">
                            <TbRulerMeasure2 />
                        </div>
                        <p className="text-base text-violet-600">
                            {properties.area} sqm
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-default-200 px-2 py-2 rounded-lg">
                        <div className="bg-violet-200 text-violet-800 px-2 py-2 rounded-lg">
                            <LuBuilding2 />
                        </div>
                        <p className="text-base text-violet-600">
                            {properties.unit_number}
                            {getOrdinalSuffix(properties.unit_number)} Floor
                        </p>
                    </div>
                </div>


                {/* Amenities */}
                <div>
                    <h1 className="font-bold uppercase">General Features</h1>
                    <div className="inline-flex flex-wrap gap-2 mt-4">
                        {amenities.map((amenity, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 px-2 py-1 rounded-md text-sm hover:bg-gray-200 dark:bg-gray-900"
                            >
                                {amenity}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full py-12">
                    <h1 className="font-bold text-4xl text-violet-800">
                        Nearby Properties
                    </h1>
                    <p className="text-sm mb-4">
                        Discover your dream home from our curated collection of
                        luxurious properties.
                    </p>

                    <Nearby
                        currentPropertyId={properties.id}
                        properties={[properties]}
                    />
                </div>
                <FAQ />
            </div>




        </>
    )
}

export default PropertyDetails
