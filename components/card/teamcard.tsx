'use client';
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { toSlug } from "@/utils/slug";
import { useRouter } from "next/navigation";
import Image from 'next/image';  // Importing Image from next/image

interface TeamMember {
  id: string;
  name: string;
  image: string; // This property is not used in the current code
  position: string;
  email: string;
  phone: string;
  facebook: string;
  profile: {
    image: string;
    position: string;
  };
}

interface TeamCardProps {
  team: TeamMember[];
}

// Custom order for sorting positions
const positionOrder: { [key: string]: number } = {
  "sales manager": 1,
  "senior property specialist": 2,
  "property specialist": 3,
};

// Sort function to prioritize specific positions
const sortByPosition = (a: TeamMember, b: TeamMember) => {
  const positionA = positionOrder[a.profile.position.toLowerCase()] || 999;
  const positionB = positionOrder[b.profile.position.toLowerCase()] || 999;
  return positionA - positionB;
};

export default function TeamCard({ team }: TeamCardProps) {
  const router = useRouter();

  // Sort team members by position
  const sortedTeam = [...team].sort(sortByPosition);

  // Handle card click to navigate
  const handleCardClick = (member: TeamMember) => {
    router.push(
      `/agent/${member.id}/${toSlug(member.name)}/${toSlug(member.position || "agent")}`
    );
  };

  return (
    <>
      {sortedTeam.map((member) => (
        <Card
          key={member.id}
          isPressable
          shadow="sm"
          className="w-full cursor-pointer"
          onPress={() => handleCardClick(member)}
        >
          <CardBody className="overflow-hidden p-0">
            <Image
              alt={member.name}
              className="w-full h-72 object-cover object-top"
              src={`https://abic-agent-bakit.s3.ap-southeast-1.amazonaws.com/profiles/${member.profile.image}`}
              width={500}  // Specify width for optimization
              height={300} // Specify height for optimization
              loading="lazy" // Lazy loading for performance
            />
          </CardBody>
          <CardFooter className="flex flex-col text-center">
            <h1 className="text-base font-bold uppercase">{member.name}</h1>
            <p className="text-default-500 text-sm capitalize">{member.profile.position}</p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}