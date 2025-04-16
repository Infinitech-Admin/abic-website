"use client";
import { Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";
import Testimonials from "./testimonial";
import Gallery from "./gallery";
import Certificates from "./certificate"; // Ensure this import is correct
import { agents } from "@/components/card/submitpropertycard";
import NoData from "@/components/error/nodata";

interface Testimonial {
    id: string;
    first_name: string;
    last_name: string;
    message: string;
}

interface CertificateData {
    id: string;
    name: string;
    image: string;
    date: string;
}

interface VideosData {
    name: string;
    video: string;
  }

interface Profile {
    testimonials: Testimonial[];
    certificates: CertificateData[];
    videos: VideosData[];
}

interface ProfileProps {
    profile: Profile;
}

const DetailSection: React.FC<ProfileProps> = ({ profile }) => {
    const [activeTab, setActiveTab] = useState<string>("certificates");

    return (
        <div className="py-4">
            <Tabs
                aria-label="Agent Details Tabs"
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
            >
                <Tab key="certificates" title="Certificates">
                    {Array.isArray(profile?.certificates) && profile?.certificates.length > 0 ? (
                        <Certificates cert={profile.certificates} />
                    ) : (
                        <NoData />
                    )}
                </Tab>


                <Tab key="gallery" title="Photos">
                    {Array.isArray(profile?.certificates) &&
                        profile?.certificates.length > 0 ? (
                        <Gallery videos={profile.videos} />
                    ) : (
                        <NoData />
                    )}
                </Tab>

                <Tab key="testimonials" title="Testimonials">
                    {Array.isArray(profile?.testimonials) && profile?.testimonials.length > 0 ? (
                        <Testimonials testimonials={profile.testimonials} />
                    ) : (
                        <NoData />
                    )}
                </Tab>
            </Tabs>
        </div>
    );
};

export default DetailSection;
