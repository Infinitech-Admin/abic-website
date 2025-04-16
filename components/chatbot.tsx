"use client";

import React, { useEffect, useState } from "react";
import ChatBot from "react-chatbotify";
import { Params } from "react-chatbotify";
import { getAuthHeaders } from "./headers";
import { usePathname } from "next/navigation";
const Chatbot = () => {
  const helpOptions = ["Vision & Mission", "Core Values", "Properties"];
  const propertiesOptions = ["For Sale", "RFO", "Under Construction"];
  const [properties, setProperties] = useState<any[]>([]);

  const fetchProperties = async () => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/properties`;
      const headers = getAuthHeaders();

      const response = await fetch(endpoint);
      const data = await response.json();
      setProperties(data.records || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const flow = {
    start: {
      message: "Welcome to Abic Realty! How can I assist you today?",
      transition: { duration: 1000 },
      path: "show_options",
    },
    show_options: {
      message: "What would you like to know about?",
      options: helpOptions,
      path: "process_options",
    },
    prompt_again: {
      message: "Do you need any other help?",
      options: helpOptions,
      path: "process_options",
    },
    unknown_input: {
      message: "Sorry, I did not understand your message!",
      options: helpOptions,
      path: "process_options",
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params: Params) => {
        let message = "";

        switch (params.userInput) {
          case "Vision & Mission":
            message =
              "**Vision & Mission**\n\n" +
              "We consistently strive to develop collaborative partnerships, based on transparency and mutual trust, which serve to build enduring client relationships.";
            break;

          case "Core Values":
            message =
              "**Our Core Values**\n\n" +
              "🔹 **Innovation** - Staying ahead in the market.\n\n" +
              "🔹 **Customer Focus** - Ensuring excellent service.\n\n" +
              "🔹 **Collaboration** - Success through teamwork.\n\n" +
              "🔹 **Respect** - Treating everyone with dignity.";
            break;

          case "Properties":
            if (properties.length > 0) {
              message =
                "🏡 **Here are some of our properties:**\n\n" +
                properties.map((property: any) => `🏢 ${property.name}`).join("\n\n");
            } else {
              message = "Sorry, I couldn't retrieve the properties at the moment.";
            }
            break;

          default:
            return "unknown_input";
        }

        await params.injectMessage(message);
        return "prompt_again";
      },
    },
  };
 const pathname = usePathname(); // Get the current route

  // Check if we are on the "Room Planner" page
  if (pathname === "/room-planner") return null;
  return (
    <ChatBot
      flow={flow}
      settings={{
        general: {
          primaryColor: "#ff5757",
          secondaryColor: "#8c52ff",
          showFooter: false,
        },
        header: {
          title: "ABIC REALTY",
          avatar:
            "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-logo.png",
        },
        botBubble: {
          showAvatar: true,
          avatar:
            "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-logo.png",
        },
        chatButton: {
          icon: "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-logo.png",
        },
        tooltip: {
          mode: "NEVER",
        },
      }}
    />
  );
};

export default Chatbot;
