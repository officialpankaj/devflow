import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 text-3xl">Tags</h1>

      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 sm:w-42.5" />
      </section>

      <div className="mt-10 flex w-full flex-wrap gap-4">
        {[...Array(10).keys()].map((i) => (
          <Skeleton key={i} className="h-57 w-full rounded-2xl sm:w-65" />
        ))}
      </div>
    </>
  );
};
export default Loading;
