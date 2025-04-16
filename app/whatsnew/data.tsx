import useSWR from 'swr'

import TestemonialSection from "./testemonial";
import SeminarSection from "./seminarsection";
import MeetingSection from "./meetingsection";
import EventSection from "./eventsection";
import CloseDeals from "./closedeals";
import NewsSection from "./news";
import TipsSection from "./tips";
import ConstructionSection from "./construction";


export const whatsnewData = [
    {
        key: 1,
        title: "Testimonial",
        content: <TestemonialSection />,
    },
    {
        key: 2,
        title: "Seminars",
        content: <SeminarSection />,
    },
    {
        key: 3,
        title: "Meetings",
        content: <MeetingSection />,
    },
    {
        key: 4,
        title: "Events",
        content: <EventSection />,
    },
    {
        key: 5,
        title: "Closed Deals",
        content: <CloseDeals />,
    },
    {
        key: 6,
        title: "Real Estate News",
        content: <NewsSection />,
    },
    {
        key: 7,
        title: "Real Estate Tips",
        content: <TipsSection />,
    },
    {
        key: 8,
        title: "On-Going Infastructure",
        content: <ConstructionSection />,
    },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useArticles = () => {
    const { data, error, isLoading } = useSWR(
        "https://abicmanpowerservicecorp.com/api/main/articles",
        fetcher
    );

    return {
        articles: data || [],
        isLoading,
        error,
    };
};

export const useTestimonials = () => {
    const { data, error, isLoading } = useSWR(
        "https://abicmanpowerservicecorp.com/api/main/testimonials",
        fetcher
    );

    return {
        testimonials: data || [],
        isLoading,
        error,
    };
};
