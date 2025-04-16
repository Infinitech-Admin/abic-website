"use client";
import {
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useState } from "react";
import ContactSection from "../home/contactsection";
import { whatsnewData } from "./data";

export default function WhatsNewPage() {
  const [selectedTab, setSelectedTab] = useState<number>(whatsnewData[0].key);

  return (
    <section className="flex flex-col items-center w-full">
      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col">
          {/* Tabs for larger screens */}
          <div className="hidden md:block">
            <Tabs
              aria-label="Options"
              selectedKey={selectedTab.toString()}
              onSelectionChange={(key) => setSelectedTab(Number(key))}
            >
              {whatsnewData.map((data) => (
                <Tab key={data.key} title={data.title}>
                  {data.content}
                </Tab>
              ))}
            </Tabs>
          </div>

          {/* Dropdown for smaller screens */}
          <div className="md:hidden w-full">
            <Dropdown>
              <DropdownTrigger>
                <Button className="w-full" variant="bordered">
                  Choose a Section
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Tabs Dropdown"
                onAction={(key) => setSelectedTab(Number(key))}
              >
                {whatsnewData.map((data) => (
                  <DropdownItem key={data.key}>{data.title}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <div className="mt-4 w-full">
              {whatsnewData.find((data) => data.key === selectedTab)?.content}
            </div>
          </div>
        </div>
      </div>
      <ContactSection />
    </section>
  );
}
