import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 sm:w-42.5" />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {[...Array(5).keys()].map((i) => (
          <Skeleton key={i} className="h-48 w-full rounded-[10px]" />
        ))}
      </div>
    </>
  );
};
export default Loading;
