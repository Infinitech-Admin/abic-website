import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { IoBulb } from "react-icons/io5";
import { FaHandshake, FaPeopleCarryBox, FaUserLock } from "react-icons/fa6";
const coreValues = [
  {
    title: "Innovation",
    description:
      "Innovation is essential for real estate agents to stay ahead of current market trends and remain competitive.",
    icon: <IoBulb className="text-violet-700" size={24} />,
  },
  {
    title: "Customer Focus",
    description:
      "Customer focus ensures that agents are attentive to clients’ needs and provide them with the best service possible.",
      icon: <FaUserLock className="text-violet-700" size={24} />,
  },
  {
    title: "Collaboration",
    description:
      "Collaboration between agents and other real estate professionals is necessary for the success of any real estate company.",
      icon: <FaPeopleCarryBox className="text-violet-700" size={24} />,
  },
  {
    title: "Respect",
    description:
      "Highly valued by all clients: it is important to treat everyone with respect regardless of their background or status.",
      icon: <FaHandshake className="text-violet-700" size={24} />,
  },
];

const CoreValuesCard = () => {
  return (
    <>
      {coreValues.map((value) => (
        <Card key={value.title} className="w-full">
          <CardBody className="px-6 py-8 flex flex-col gap-4">
            <div className="bg-violet-300 p-3 rounded-lg flex items-center justify-center w-12 h-12">
              {value.icon}
            </div>
            <h1 className="font-bold text-lg text-violet-700 uppercase">
              {value.title}
            </h1>
            <p className="text-default-500">
              {value.description}
            </p>
          </CardBody>
        </Card>
      ))}

    </>
  );
};

export default CoreValuesCard;
