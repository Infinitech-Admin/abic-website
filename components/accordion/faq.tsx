"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const faqData = [
  {
    key: 1,
    questions: "What is the process of buying a home?",
    answeer:
      "The process typically involves getting pre-approved for a mortgage, finding a property, making an offer, completing inspections, securing financing, and finally closing the deal. It’s important to work with a real estate agent to guide you through each step.",
  },
  {
    key: 2,
    questions: "How much should I save for a down payment?",
    answeer:
      "The standard down payment is usually 20% of the home’s purchase price, but many lenders offer options with lower down payments, sometimes as low as 3-5%. However, a larger down payment can help you secure better loan terms and avoid mortgage insurance.",
  },
  {
    key: 3,
    questions: "What are closing costs, and how much should I expect?",
    answeer:
      "Closing costs are fees related to the home purchase, including loan origination fees, title insurance, appraisal fees, and more. They usually range between 2% and 5% of the purchase price.",
  },
  {
    key: 4,
    questions: "What is a real estate agent’s commission?",
    answeer:
      "Real estate agents typically charge a commission of around 5% to 6% of the home’s sale price. This fee is usually paid by the seller and is split between the buyer’s and seller’s agents.",
  },
  {
    key: 5,
    questions: "What should I look for during a home inspection?",
    answeer:
      "A home inspection should check the condition of the roof, foundation, electrical systems, plumbing, and HVAC. Also, look for signs of water damage, mold, pest infestations, and any structural issues.",
  },
  {
    key: 6,
    questions: "How can I determine the right asking price for my property?",
    answeer:
      "The right asking price can be determined by conducting a comparative market analysis (CMA), which looks at recent sales of similar properties in your area, current market conditions, and the condition of your home.",
  },
  {
    key: 7,
    questions: "What is escrow in real estate?",
    answeer:
      "Escrow is a neutral third party that holds funds or property during a transaction until certain conditions are met, such as completing a home inspection or securing financing. It ensures both buyer and seller fulfill their obligations before the sale is finalized.",
  },
  {
    key: 8,
    questions: "Should I sell my home before buying a new one?",
    answeer:
      "It depends on your financial situation. Selling first ensures you have the funds for your next home, but buying first gives you more time to find a new property. If you’re worried about timing, consider bridge loans, which allow you to buy a new home before selling your old one.",
  },
  {
    key: 9,
    questions: "What are property taxes, and how are they calculated?",
    answeer:
      "Property taxes are taxes paid on real estate, typically based on the assessed value of the property. Local governments calculate them using a tax rate (also known as a mill rate) applied to your home’s assessed value.",
  },
];

const FAQAccordion = () => {
  return (
    <>
      <Accordion>
        {faqData.map((data, index) => (
          <AccordionItem
            key={index}
            aria-label={data.questions}
            title={data.questions}
          >
            {data.answeer}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default FAQAccordion;
