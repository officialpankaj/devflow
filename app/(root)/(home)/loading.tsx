import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Skeleton className="min-h-11.5 w-full sm:w-40" />
      </section>

      <section className="mt-10 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 sm:w-42.5 md:hidden" />
      </section>

      <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
        {["w-24", "w-26", "w-34", "w-36"].map((w) => (
          <Skeleton key={w} className={`h-11 rounded-lg ${w}`} />
        ))}
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
