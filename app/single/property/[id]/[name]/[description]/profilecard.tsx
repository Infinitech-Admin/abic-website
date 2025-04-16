"use client";
import { toSlug } from "@/utils/slug";
import { Card, CardBody, Image, Spinner } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebook, FaTelegram, FaViber, FaWhatsapp } from "react-icons/fa6";

interface Profile {
  id: string;
  name: string;
  email: string;
  profile?: {
    position?: string;
    about?: string;
    image?: string;
    phone?: string;
    telegram?: string;
    facebook?: string;
    instagram?: string;
  } | null;
}

interface ProfileProps {
  agent: Profile[];
}

const AgentProfile: React.FC<ProfileProps> = ({ agent }) => {
  const [loadingCard, setLoadingCard] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setLoadingCard(id);
    setTimeout(() => {
      setLoadingCard(null);
    }, 1000);
  };

  const openLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault(); // Prevents the default anchor behavior
    e.stopPropagation(); // Stops event from reaching the parent Link
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-4">
      {agent.map((data) => {
        const profile = data.profile ?? {};
        const profileImage = profile.image
          ? `https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/profiles/${profile.image}`
          : "/default-avatar.png";

        return (
          <Link
            key={data.id}
            href={`/agent/${data.id}/${toSlug(data.name)}/${toSlug(profile.position || "agent")}`}
            onClick={() => handleClick(data.id)}
          >
            <Card
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] relative" 
              shadow="sm"
            >
              <CardBody>
                {loadingCard === data.id && ( 
                  <div
                    className="absolute inset-0 flex justify-center items-center bg-white/70 dark:bg-gray-800/70 z-10"
                    style={{ borderRadius: '0.75rem' }}
                  >
                    <Spinner size="lg"/>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}

                <div className="grid grid-cols-12 gap-6 md:gap-4 items-center">
                  {/* Image Section */}
                  <div className="relative col-span-4 w-full">
                    <Image
                      className="object-cover object-top overflow-hidden rounded-xl w-full mb-4"
                      src={profileImage}
                      alt={`${data.name}'s profile`}
                    />
                  </div>

                  {/* Profile Info */}
                  <div className="flex flex-col col-span-8">
                    <h1 className="text-large font-bold text-violet-800 mt-2">
                      {data.name}
                    </h1>
                    <p className="text-small font-semibold text-foreground/80">
                      {profile.position || "Unknown Position"}
                    </p>

                    <div className="mt-2">
                      {data.email && (
                        <p className="text-xs text-foreground/80">
                          Email: {data.email}
                        </p>
                      )}
                      {profile.phone && (
                        <p className="text-xs text-foreground/80">
                          Phone: {profile.phone}
                        </p>
                      )}
                    </div>

                    {/* Social Media Links */}
                    <div className="flex gap-2 py-4">
                      {profile.facebook && (
                        <button
                          className="bg-violet-200 px-2 py-2 rounded-xl"
                          onClick={(e) => openLink(e, `${profile.facebook}`)}
                        >
                          <FaFacebook className="text-violet-600" size={20} />
                        </button>
                      )}
                      {profile.telegram && (
                        <button
                          className="bg-violet-200 px-2 py-2 rounded-xl"
                          onClick={(e) => openLink(e, `https://t.me/+63${profile.telegram}`)}
                        >
                          <FaTelegram className="text-violet-600" size={20} />
                        </button>
                      )}
                      {profile.phone && (
                        <>
                          <button
                            className="bg-violet-200 px-2 py-2 rounded-xl"
                            onClick={(e) => openLink(e, `viber://chat?number=${profile.phone}`)}
                          >
                            <FaViber className="text-violet-600" size={20} />
                          </button>
                          <button
                            className="bg-violet-200 px-2 py-2 rounded-xl"
                            onClick={(e) => openLink(e, `https://wa.me/${profile.phone}`)}
                          >
                            <FaWhatsapp className="text-violet-600" size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default AgentProfile;
