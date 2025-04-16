import React from "react";
import ServiceDeetsComponent from "./service-deets-component";


const fetchData = async (service_id: string) => {
    const res = await fetch(`https://abicmanpowerservicecorp.com/api/main/services/${service_id}`);
    const data = await res.json();

    return data;
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ service_id: string }>;
}) {

    const { service_id } = await params;
    const service = await fetchData(service_id);

    return {
        title: `${service.record.name} - ${service.record.description} `,
        description: service.record.description,
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ service_id: string }>;
}) {
    const { service_id } = await params;
    const service = await fetchData(service_id);

    return <ServiceDeetsComponent service={service} />;
}
