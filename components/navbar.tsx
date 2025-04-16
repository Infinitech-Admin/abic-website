"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const pathname = usePathname(); // Get the current route

  // Check if we are on the "Room Planner" page
  const isRoomPlannerPage = pathname === "/room-planner";

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Close the sidebar when the route changes
  useEffect(() => {
    setSidebarOpen(false); // Close the sidebar on route change
  }, [pathname]);

  const handleRoomPlannerClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (e.currentTarget.getAttribute('href') === '/room-planner') {
      e.preventDefault();
      setModalOpen(true); // Open the modal when Room Planner is clicked
    }
  };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
  };

  const handleProceed = () => {
    // Logic for the "Proceed" button (opens the link in a new window)
    const roomPlannerUrl = '/room-planner'; // URL for the Room Planner page
    window.open(roomPlannerUrl, '_blank', 'noopener,noreferrer'); // Opens in a new tab
    setModalOpen(false); // Close the modal after proceeding
  };

  if (isRoomPlannerPage) return null; // Don't render Navbar on Room Planner page

  return (
    <>
      {/* Navbar for small screens */}
      <div className="md:hidden flex items-center justify-between p-4 bg-violet-700 shadow-md sticky top-0 left-0 w-full z-50">
        <button
          aria-controls="logo-sidebar"
          aria-expanded={isSidebarOpen ? "true" : "false"}
          className="text-white focus:outline-none"
          type="button"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                fillRule="evenodd"
              />
            </svg>
          )}
        </button>
        <Link className="flex items-center" href="/">
          <Image
            alt="ABIC Logo"
            height={80}
            src="https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-logo.png"
            width={80}
          />
        </Link>
      </div>

      {/* Sidebar */}
      <aside
        aria-label="Sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-cover bg-center bg-no-repeat dark:bg-gray-800 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        id="logo-sidebar"
      >
        <div
          className="h-full flex flex-col px-3 py-2 overflow-y-auto bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-sidebar.png')",
          }}
        >
          {/* Logo Section */}
          <Link
            className="hidden md:flex items-center mb-5 mt-24 py-8 md:mt-0"
            href="/"
          >
            <Image
              alt="ABIC Logo"
              height={200}
              src="https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-logo.png"
              width={200}
            />
          </Link>

          {/* Navigation Links */}
          <ul className="space-y-1 mt-24 md:mt-2 font-medium flex-1">
            {[ 
              { path: "/", label: "Home" },
              { path: "/about", label: "About Us" },
              { path: "/whatsnew", label: "What's New" },
              { path: "/properties", label: "Properties" },
              { path: "/services", label: "Services" },
              { path: "/careers", label: "Careers" },
              { path: "/contact", label: "Contact Us", external: true },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  className={`flex items-center p-2 text-white rounded-lg group ${
                    pathname === link.path
                      ? "bg-violet-800 font-bold"
                      : "hover:bg-violet-800"
                  }`}
                  href={link.path}
                >
                  <span className="ml-3">{link.label}</span>
                </Link>
              </li>
            ))}

            {/* Separator */}
            <div className="my-4 py-8" />

            {/* Additional Links */}
            {[ 
              { path: "/documents", label: "DMCI Documents" },
              { path: "/submit-property", label: "Submit Property" },
              { path: "/loancalculator", label: "Loan Calculator" },
              {
                path: "/room-planner", // Updated to open in a modal
                label: "Room Planner",
              },
            ].map((link) => (
              <li key={link.path}>
                <a
                  className={`flex items-center p-2 text-white rounded-lg dark:text-white group ${
                    pathname === link.path
                      ? "bg-violet-800 dark:bg-gray-700"
                      : "hover:bg-violet-800 dark:hover:bg-gray-700"
                  }`}
                  href={link.path}
                  onClick={handleRoomPlannerClick}
                >
                  <span className="ml-3">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Footer and Chatbot */}
          {!isRoomPlannerPage && (
            <div>{/* Footer Content (Social Media Links & Chatbot) */}</div>
          )}
        </div>
      </aside>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-red-100 p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-xs md:max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Room Planner</h2>
            <p className="text-red-800 text-sm sm:text-base">This feature is optimized for larger screens. For the best experience, please use a device with a larger display.</p>
            <div className="mt-4 text-right space-x-4">
              <button
                className="px-4 py-2 bg-violet-700 text-white rounded-lg text-sm sm:text-base"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-violet-700 text-white rounded-lg text-sm sm:text-base"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
