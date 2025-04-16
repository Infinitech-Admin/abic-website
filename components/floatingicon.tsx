"use client";

import { Image } from "@nextui-org/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import { LuGlobe, LuX } from "react-icons/lu";
import { usePathname } from "next/navigation";
// Social Media Icons Configuration
const socialMediaConfig = [
  { id: 1, field: "facebook", image: "https://dmci-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/facebook.png" },
  { id: 2, field: "phone", image: "https://dmci-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/phone-call.png" },
  { id: 3, field: "email", image: "https://dmci-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/mail.png" },
  { id: 4, field: "viber", image: "https://dmci-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/viber+(1).png" },
  { id: 5, field: "telegram", image: "https://dmci-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/telegram+(2).png" },
];

const FloatingIcons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const agent_id = process.env.NEXT_PUBLIC_USER_ID;
        // const agent_id = "01JJ8BV4GJXPF64PB20H0AAEH7"

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-users`);
        if (!response.ok) throw new Error("Failed to fetch social links");

        const data = await response.json();
        console.log("Fetched Data:", data);

        // Find the agent matching the `agent_id`
        const agent = data.record.find((a: { id: string }) => a.id === agent_id);

        if (agent && agent.profile) {
          setSocialLinks({
            facebook: agent.profile.facebook,
            phone: `tel:${agent.profile.phone}`,
            email: `mailto:${agent.email}`,
            viber: `viber://chat?number=${agent.profile.viber}`,
            telegram: `https://t.me/+63${agent.profile.telegram}`,
            whatsapp: `https://wa.me/${agent.profile.whatsapp}`,
          });

        } else {
          console.warn("Agent not found or missing profile data.");
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialLinks();
  }, []);

  const pathname = usePathname(); // Get the current route

  // Check if we are on the "Room Planner" page
  if (pathname === "/room-planner") return null;
  return (
    <>
      {/* Floating icons for large screens (fixed position) */}
      <div className="fixed top-1/2 right-9 transform -translate-y-1/2 z-50 hidden lg:flex">
        <div className="flex flex-col gap-4">
          {socialMediaConfig.map((icon) => (
            <Link
              key={icon.id}
              href={socialLinks[icon.field] || "#"}
              rel="noopener noreferrer"
              target={socialLinks[icon.field] ? "_blank" : "_self"}
              className={`bg-blue-700 p-2 rounded-full shadow-lg hover:bg-blue-800 transition ${!socialLinks[icon.field] && "opacity-50 cursor-not-allowed"
                }`}
            >
              <Image alt={icon.field} height={32} src={icon.image} width={32} />
            </Link>
          ))}
        </div>
      </div>

      {/* Floating icons for small screens (toggleable) */}
      <div className="fixed bottom-24 right-4 transform -translate-y-1/2 z-50">
        <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 lg:hidden">
          <div
            className={`flex flex-col gap-2 transition-all ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none"
              } lg:opacity-100 lg:translate-y-0 sm:pointer-events-auto`}
          >
            {socialMediaConfig.map((icon) => (
              <a
                key={icon.id}
                href={socialLinks[icon.field] || "#"}
                rel="noopener noreferrer"
                target={socialLinks[icon.field] ? "_blank" : "_self"}
                className={`bg-blue-700 p-2 rounded-full shadow-lg hover:bg-blue-800 transition ${!socialLinks[icon.field] && "opacity-50 cursor-not-allowed"
                  }`}
              >
                <Image alt={icon.field} height={32} src={icon.image} width={32} />
              </a>
            ))}
          </div>

          {/* Toggle Button (for small screens) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-700 p-3 rounded-full shadow-lg"
          >
            {isOpen ? <LuX className="text-white w-6 h-6" /> : <LuGlobe className="text-white w-6 h-6" />}
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingIcons;
