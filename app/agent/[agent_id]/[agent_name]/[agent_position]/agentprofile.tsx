"use client";
import { formatPhoneNumber } from "@/utils/phoneformat";
import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaTelegram, FaViber, FaWhatsapp } from "react-icons/fa6";
import { MdFacebook, MdMail, MdOutlineWork, MdPhone } from "react-icons/md";

interface Profile {
  name: string;
  email: string;
  profile: {
    position: string;
    about: string;
    image: string;
    phone: string;
    telegram: string;
    facebook: string;
    instagram: string;
    viber: string;
    whatsapp: string;
  };
}

interface ProfileProps {
  profile: Profile;
}

const AgentProfile: React.FC<ProfileProps> = ({ profile }) => {
  // Function to open links in a new tab without triggering parent link
  const openLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation(); // Prevents event from affecting parent
    window.open(url, "_blank");
  };

  return (
    <Card isBlurred className="border-none bg-background/60" shadow="sm">
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          {/* Profile Image */}
          <div className="relative col-span-6 md:col-span-3">
            <Image
              alt={profile.name}
              className="object-cover object-top w-full h-full"
              src={`https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/profiles/${profile.profile.image}`}
            />
          </div>

          {/* Profile Info */}
          <div className="flex flex-col col-span-6 md:col-span-9">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h1 className="text-3xl font-bold mt-2 uppercase">
                  {profile.name}
                </h1>
                <h2 className="text-md uppercase text-foreground/80">
                  {profile.profile.position}
                </h2>

                <hr className="my-4" />

                {/* Contact Information */}
                <div className="py-2">
                  <h1 className="text-sm text-foreground/70">
                    Contact Information
                  </h1>
                  <div className="flex flex-col py-4 gap-2">
                    {/* Address */}
                    <div className="flex items-center gap-2">
                      <div className="bg-violet-200 px-2 py-2 rounded-lg">
                        <MdOutlineWork className="text-violet-700" size={18} />
                      </div>
                      <span>
                        Unit 202, Campos Rueda Building, 101 Urban Ave, Makati,
                        1206 Metro Manila
                      </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2">
                      <div className="bg-violet-200 px-2 py-2 rounded-lg">
                        <MdMail className="text-violet-700" size={18} />
                      </div>
                      <Link
                        className="text-blue-600 hover:underline"
                        href={`mailto:${profile.email}`}
                      >
                        {profile.email}
                      </Link>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2">
                      <div className="bg-violet-200 px-2 py-2 rounded-lg">
                        <MdPhone className="text-violet-700" size={18} />
                      </div>
                      <Link
                        className="text-blue-600 hover:underline"
                        href={`tel:${profile.profile.phone}`}
                      >
                        <span className="text-blue-600">+63 {`${formatPhoneNumber(profile.profile.phone)}`}</span>
                      </Link>
                    </div>


                    {/* Telegram */}
                    {profile.profile.telegram && (
                      <div className="flex items-center gap-2">
                        <div className="bg-violet-200 px-2 py-2 rounded-lg">
                          <FaTelegram className="text-violet-700" size={18} />
                        </div>
                        <Link
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          href={`https://t.me/+63${profile.profile.telegram}`}
                        >
                          <span className="text-blue-600">+63 {`${formatPhoneNumber(profile.profile.telegram)}`}</span>
                        </Link>
                      </div>
                    )}

                    {profile.profile.viber && (
                      <div className="flex items-center gap-2">
                        <div className="bg-violet-200 px-2 py-2 rounded-lg">
                          <FaViber className="text-violet-700" size={18} />
                        </div>
                        <Link
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          href={`viber://chat?number=${profile.profile.viber}`}
                        >
                          <span className="text-blue-600">+63 {`${formatPhoneNumber(profile.profile.viber)}`}</span>
                        </Link>
                      </div>
                    )}

                    {profile.profile.whatsapp && (
                      <div className="flex items-center gap-2">
                        <div className="bg-violet-200 px-2 py-2 rounded-lg">
                          <FaWhatsapp className="text-violet-700" size={18} />
                        </div>
                        <Link
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          href={`viber://chat?number=${profile.profile.whatsapp}`}
                        >
                          <span className="text-blue-600">+63 {`${formatPhoneNumber(profile.profile.whatsapp)}`}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Media */}
                <div className="py-2 z-50">
                  <h1 className="text-sm text-foreground/70">Social Media</h1>
                  <div className="flex flex-col py-4 gap-2">
                    {/* Facebook */}
                    {profile.profile.facebook && (
                      <div className="flex items-center gap-2">
                        <div className="bg-violet-200 px-2 py-2 rounded-lg">
                          <MdFacebook className="text-violet-700" size={18} />
                        </div>
                        <Link
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          href={`viber://chat?number=${profile.profile.facebook}`}
                        >
                          <span className="text-blue-600">{`${profile.name}`}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AgentProfile;
