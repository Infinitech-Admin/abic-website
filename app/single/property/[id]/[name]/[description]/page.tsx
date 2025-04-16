import { Metadata } from 'next';
import PropertyImage from './propertyimage';
import PropertyDetails from './propertydetails';
import { Toaster } from 'react-hot-toast';
import ListingsInqiryCard from './propertyinquiry';
import AgentProfile from '@/app/single/property/[id]/[name]/[description]/profilecard';


// Capitalize function for the name
const capitalizeWords = (str: string) => {
    return str
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};


type paramsTypes = Promise<{ id: string; name: string; description: string}>;

export async function generateMetadata({ params }: { params: paramsTypes }) {

    const { id, name, description } =  await params;
    const formattedName = capitalizeWords(name);

    return {
        title: formattedName,
        description: description || "Default description",
        openGraph: {
            title: `${formattedName} | ABIC Realty and Consultancy Corporation`,
            description: description || "Default description",
            url: `https://www.abic-website.vercel.app/property/${id}`,
            siteName: "ABIC Realty",
            images: [
                {
                    url: "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-loan-calculator-banner.png",
                    width: 1200,
                    height: 630,
                    alt: "ABIC Realty Property",
                },
            ],
            type: "website",
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            site: "@AbicRealty",
            creator: "@AbicRealty",
            title: `Property: ${formattedName} | ABIC Realty`,
            description: description || "Default description",
            images: [
                "https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/media/abic-realty-loan-calculator-banner.png",
            ],
        },
        other: {
            "og:image:width": "1200",
            "og:image:height": "630",
        },
    };
}


type paramsType = Promise<{ id: string }>;
export default async function PropertyPage({
    params,
}: {
    params: paramsType;
}) {
    const { id } = await params;
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`)
    .then((res) => res.json()) 
    .then((data) => data.record); 


    const fetchAgent = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    .then((res) => res.json()) 
    .then((data) => data.records); 


    if (!data) {
        return (
            <section className="flex flex-col items-center gap-6 md:py-8 w-full">
                <div className="container mx-auto px-2">
                    <h1>Property Not Found</h1>
                    <p>Sorry, we couldn&apos;t find the details for this property.</p>
                </div>
            </section>
        );
    }

    return (
        <>
            <Toaster />
            <section className="flex flex-col items-center gap-6 md:py-8 w-full">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start w-full">
                        <div className="col-span-3 lg:col-span-2">
                            <PropertyImage properties={[data]} />
                            <PropertyDetails properties={data} />
                        </div>
                        <div className="col-span-3 flex flex-col gap-4 md:col-span-1 ">
                            <div className="w-full">
                                <ListingsInqiryCard data={data} />
                            </div>
                            <div>
                                <AgentProfile agent={fetchAgent} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
