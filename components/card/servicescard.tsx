"use client";
import React from "react";
import { Card, CardBody, Image, Link } from "@nextui-org/react";
import useSWR from 'swr';
import Loading from "../loaders/loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ServicesCard = () => {
  const { data, error, isLoading } = useSWR("https://abicmanpowerservicecorp.com/api/main/services", fetcher);

  const services: any[] = data?.records || [];

  if (isLoading) { return <div className="py-12"><Loading label="Loading Services"/></div>; }

  if (error) { return <p>Error loading services.</p>; }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 py-12 gap-2">
      {services.map((service: any, index: number) => (
        <Link key={index} href={`/services/${service.id}`}>
          <Card>
            <CardBody className="overflow-visible py-2">
              <Image
                isBlurred
                isZoomed
                alt="Card background"
                className="rounded-xl"
                fallbackSrc="https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-fallback1.png"
                height={250}
                width={500}
                src={`https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/services/${service.image}`}
              />
              <div className="py-4">
                <h4 className="font-bold text-large">{service.name}</h4>
                <small className="text-default-500 line-clamp-2">
                  {service.description}
                </small>

                <p className="text-tiny uppercase font-bold pt-4">
                  If you have any concerns, please contact: 09455493651
                </p>
              </div>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ServicesCard;
