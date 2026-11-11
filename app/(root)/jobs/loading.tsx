import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="flex w-full flex-col gap-5">
      <h1 className="h1-bold text-dark100_light900">All Jobs</h1>

      <div className="mt-11 flex justify-center gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>

      <div className="mt-12 flex w-full flex-col gap-5">
        {[...Array(5).keys()].map((_, index) => (
          <Skeleton key={index} className="h-40 w-full rounded-2xl" />
        ))}
      </div>
    </section>
  );
};
export default Loading;
