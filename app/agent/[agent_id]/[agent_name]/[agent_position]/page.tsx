import AgentProfile from "./agentprofile";
import DetailSection from "./detailsection";
import "react-photo-view/dist/react-photo-view.css";

type ParamsType = Promise<{ agent_id: string }>;

export default async function PropertyPage({
    params,
}: {
    params: ParamsType;
}) {
    const { agent_id } = await params;

    const fetchAgent = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        .then((res) => res.json())
        .then((data) => data.records);

    // Find the specific agent by agent_id
    const agent = fetchAgent?.find((a: { id: string }) => a.id === agent_id);


    if (!agent) {
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
        <section className="flex flex-col items-center gap-6 md:py-8 w-full">
            <div className="container mx-auto px-2">
                <AgentProfile profile={agent} />
                <DetailSection profile={agent} />
            </div>
        </section>
    );
}
