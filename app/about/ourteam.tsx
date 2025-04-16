import TeamCard from '@/components/card/teamcard';
import React from 'react';

export default async function OurTeam() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        cache: 'no-store', 
    });

    if (!response.ok) {
        throw new Error('Failed to fetch team members');
    }

    const { records } = await response.json(); 

    return (
        <section className="flex flex-col items-center gap-6 py-6 md:py-16 w-full">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="font-bold text-violet-700 uppercase text-2xl md:text-3xl">
                        Meet Our Team
                    </h1>
                    <p className="text-default-500 max-w-xl text-sm md:text-lg">
                        Meet the passionate professionals dedicated to guiding you through every step of your real estate journey.
                    </p>
                </div>

                {/* Team Members */}
                <div className="gap-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-8">
                    <TeamCard team={records} />
                </div>
            </div>
        </section>
    );
}
