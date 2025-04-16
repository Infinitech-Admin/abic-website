"use client";

import React, { useState } from "react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { FaRegCalendarAlt, FaRegQuestionCircle } from "react-icons/fa";

import PropertyInquiry from "./inquiry";
import PropertyAppointment from "./appointment";

interface Property {
  name: string;
  user_id: string;
  unit_type: string;
}

interface PropertyProps {
  data: Property;
}
const ListingsInqiryCard: React.FC<PropertyProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string>("calendar");

  return (
    <Card className="sticky">
      <CardBody>
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
        >
          <Tab key="calendar" title="Inquiry">
            <div className="flex items-center gap-2">
              <div>
                <FaRegQuestionCircle size={32} />
              </div>
              <div>
                <h1 className="font-bold">Send Inquiry</h1>
                <p className="text-sm text-default-500 leading-3">
                  Need Clarifications about the unit?
                </p>
              </div>
            </div>
            <PropertyInquiry data={data} />
          </Tab>

          <Tab key="details" title="Appointment">
            <div className="flex items-center gap-2">
              <div>
                <FaRegCalendarAlt size={32} />
              </div>
              <div>
                <h1 className="font-bold">Book an On-Site viewing</h1>
                <p className="text-sm text-default-500 leading-3">
                  Select your prefered date and time.
                </p>
              </div>
            </div>
            <PropertyAppointment data={data} />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default ListingsInqiryCard;
