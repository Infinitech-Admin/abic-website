"use client";
import { Button, Input, Spinner } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import {
  FaArrowDown,
  FaFacebook,
  FaTelegram,
  FaViber,
  FaWhatsapp,
} from "react-icons/fa6";
import { IoMdArrowDropright } from "react-icons/io";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    telegram: "",
    viber: "",
    whatsapp: "",
  });
  const pathname = usePathname(); // Get the current route

  // Only fetch social links if not on the "Room Planner" page
  useEffect(() => {
    if (pathname === "/room-planner") return;

    const fetchSocialLinks = async () => {
      try {
        const agent_id = process.env.NEXT_PUBLIC_USER_ID;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/all-users`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        const agents = data.record || [];

        const agent = agents.find((a: { id: string }) => a.id === agent_id);

        if (agent?.profile) {
          setSocialLinks({
            facebook: agent.profile.facebook,
            viber: `viber://chat?number=${agent.profile.viber}`,
            telegram: `https://t.me/+63${agent.profile.telegram}`,
            whatsapp: `https://wa.me/${agent.profile.whatsapp}`,
          });
        }
      } catch (error) {
        console.error("Error fetching agent's social links:", error);
      }
    };

    fetchSocialLinks();
  }, [pathname]); // Add pathname as a dependency

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://abicmanpowerservicecorp.com/api/main/subscribers",
        { email }
      );

      const emailAgentResponse = await axios.post(
        "/api/email/inquiry/newsletter",
        { email },
        { headers: { Accept: "application/json" } }
      );

      if (response?.data && emailAgentResponse?.data) {
        toast.success("Successfully subscribed!");
        setEmail("");
      }
    } catch (error) {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "What's New", href: "/whatsnew" },
    { label: "Properties", href: "/properties" },
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ];

  // If on the "Room Planner" page, return null
  if (pathname === "/room-planner") return null;

  return (
    <footer className="flex-grow md:ml-64 relative bg-violet-900 text-white overflow-hidden">
      <section className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row md:flex-wrap lg:justify-between gap-4">
          {/* About Section */}
          <div className="flex-col">
            <h1 className="font-bold py-2">About</h1>
            <p className="md:max-w-md text-base">
              With skill, passion, and unwavering dedication, we strive for
              engineering excellence in quality homebuilding and community
              development that will stand the test of time.
            </p>
            <div className="py-4">
              <Button
                as="a"
                href="/abic-realty.apk"
                download
                className="bg-violet-200 text-violet-900"
                endContent={<FaArrowDown />}
                size="lg"
              >
                Download Application
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex space-x-16">
            <div className="footer-col">
              <h1 className="font-bold py-2">Quick Links</h1>
              <ul className="text-base">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      className="flex items-center hover:text-violet-400"
                      href={`${link.href}`}
                    >
                      <IoMdArrowDropright size={18} /> {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Section - FIXED */}
            <div className="footer-col max-w-xs">
              <h1 className="font-bold py-2">Featured</h1>
              <ul className="links">
                {[
                  { name: "DMCI Documents", path: "/documents" },
                  { name: "Submit Property", path: "/submit-property" },
                  { name: "Loan Calculator", path: "/loancalculator" },
                  { name: "Room Planner", path: "room-planner" },
                ].map((feature, index) => (
                  <li key={index}>
                    <a
                      className="flex items-center hover:text-violet-400"
                      href={feature.path}
                    >
                      <IoMdArrowDropright size={18} /> {feature.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter & Social Media */}
          <div className="footer-col md:max-w-md">
            <h1 className="font-bold py-2">Newsletter</h1>
            <p>
              Subscribe to our newsletter for a weekly dose of news, updates,
              helpful tips, and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="py-4">
              <div className="flex items-center gap-4">
                <Input
                  label="Your Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  className="bg-violet-200 text-violet-900"
                  size="lg"
                >
                  {loading ? (
                    <Spinner size="sm" color="current" />
                  ) : (
                    "SUBSCRIBE"
                  )}
                </Button>
              </div>
            </form>

            {/* Social Media Links */}
            <h1 className="font-bold py-2">Follow Us</h1>
            <div className="flex gap-2">
              {[
                { icon: <FaFacebook size={18} />, url: socialLinks.facebook },
                {
                  icon: <FaTelegram size={18} />,
                  url: `https://t.me/+63${socialLinks.telegram}`,
                },
                {
                  icon: <FaViber size={18} />,
                  url: `viber://chat?number=${socialLinks.viber}`,
                },
                {
                  icon: <FaWhatsapp size={18} />,
                  url: `https://wa.me/${socialLinks.whatsapp}`,
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.url || "#"}
                  target={item.url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`px-2 py-2 rounded-lg ${
                    item.url
                      ? "bg-violet-300 text-violet-700"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <div className="bg-violet-800 text-center py-4 px-12">
        <div className="flex flex-col md:flex-row justify-center items-center text-center md:gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} ABIC Realty. All Rights Reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center md:gap-4 text-sm">
            <Link href="/termsandconditions" aria-label="Terms and Conditions">
              Terms and Conditions
            </Link>
            <Link href="/dataprivacy" aria-label="Data and Privacy">
              Data and Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}