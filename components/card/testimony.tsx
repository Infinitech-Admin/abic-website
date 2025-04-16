"use client";
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  Card,
  CardBody,
  Link,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";

interface Testimony {
  id: number;
  first_name: string;
  last_name: string;
  message: string;
  created_at: string; // Added created_at
}

interface TestimonyProps {
  testimony: Testimony[];
}

const animation = { duration: 50000, easing: (t: number) => t };

const TestimonyCard: React.FC<TestimonyProps> = ({ testimony }) => {
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimony | null>(null);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    breakpoints: {
      "(max-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 720px) and (max-width: 999px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
  });

  const handlePrev = () => slider.current?.prev();
  const handleNext = () => slider.current?.next();
  const openModal = (testimony: Testimony) => setSelectedTestimonial(testimony);
  const closeModal = () => setSelectedTestimonial(null);

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {testimony.map((data) => (
          <Link
            key={data.id}
            className="keen-slider__slide"
            onClick={() => openModal(data)}
          >
            <Card className="shadow-none border-1">
              <CardBody>
                <figure className="max-w-screen-md mx-auto text-center py-8">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mx-auto mb-3 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 18 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                  </svg>
                  <blockquote>
                    <p className="text-md italic font-medium text-gray-900 line-clamp-2">
                      &quot;{data.message}&quot;
                    </p>
                  </blockquote>
                  <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
                    <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
                      <cite className="pe-3 font-medium text-gray-900">
                        {data.first_name} {data.last_name}
                      </cite>
                    </div>
                  </figcaption>
                </figure>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 flex space-x-2">
        <button
          className="bg-violet-600 opacity-50 text-white py-2 px-4 rounded-full hover:bg-violet-700 transition hover:opacity-100"
          onClick={handlePrev}
        >
          &#8249; {/* Left arrow */}
        </button>
        <button
          className="bg-violet-600 text-white opacity-50 py-2 px-4 rounded-full hover:bg-violet-700 transition hover:opacity-100"
          onClick={handleNext}
        >
          &#8250; {/* Right arrow */}
        </button>
      </div>

      {selectedTestimonial && (
        <Modal isOpen placement="center" onClose={closeModal}>
          <ModalContent>
            <ModalBody>
              <div className="py-4">
                <p className="text-default-500 italic">
                  &quot;{selectedTestimonial.message}&quot;
                </p>
                <h2 className="font-bold text-lg text-green-700 py-2">
                  {selectedTestimonial.first_name}{" "}
                  {selectedTestimonial.last_name}
                </h2>
                <p className="text-sm text-default-400">
                  Submitted on:{" "}
                  {new Date(selectedTestimonial.created_at).toLocaleString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    },
                  )}
                </p>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default TestimonyCard;
