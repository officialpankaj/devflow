import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="flex w-full flex-col gap-9">
      <Skeleton className="h-10 w-48" />
      {[...Array(5).keys()].map((i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-14 w-full" />
        </div>
      ))}
      <Skeleton className="ml-auto h-12 w-40" />
    </main>
  );
};
export default Loading;
