import { Card, CardBody } from "@nextui-org/react";
import React from "react";

interface Testimonial {
  id: string;
  first_name: string;
  last_name: string;
  message: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 py-4 gap-2">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="shadow-none border">
          <CardBody>
            <figure className="mx-auto text-center">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                fill="currentColor"
                viewBox="0 0 18 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
              <blockquote>
                <p className="text-md italic font-medium text-gray-900 dark:text-white">
                  &quot;{testimonial.message}&quot;
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
                <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                  <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                    {testimonial.first_name} {testimonial.last_name}
                  </cite>
                </div>
              </figcaption>
            </figure>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Testimonials;
