import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const PropertySkeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="w-full space-y-5 p-4 gap-4" radius="lg">
          {/* Skeleton placeholders */}
          <Skeleton className="h-48 rounded-lg bg-default-300" />
          <div className="space-y-3">
            <Skeleton className="h-3 w-3/5 rounded-lg bg-default-200" />
            <Skeleton className="h-3 w-4/5 rounded-lg bg-default-200" />
            <Skeleton className="h-3 w-2/5 rounded-lg bg-default-300" />
          </div>
        </Card>
      ))}
    </>
  );
};

export default PropertySkeleton;
