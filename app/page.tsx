// app/view/property/page.tsx
import React from "react";

import HeroSection from "./home/herosection";
import FAQSection from "./home/faqsection";
import RatingSection from "./home/ratingsection";
import ContactSection from "./home/contactsection";




export default async function SinglePropertyPage() {

  return (
    <section>
      <HeroSection />
      <FAQSection />
      <RatingSection />
      <ContactSection />
    </section>
  );
}
