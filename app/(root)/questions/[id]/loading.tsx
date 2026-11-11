import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse gap-3">
          <div className="flex-start gap-2">
            <Skeleton className="size-5.5 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex items-center justify-end gap-4">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="size-6" />
          </div>
        </div>
        <Skeleton className="mt-3.5 h-8 w-full max-w-2xl" />
      </div>

      <div className="mt-5 mb-8 flex flex-wrap gap-4">
        {[...Array(3).keys()].map((i) => (
          <Skeleton key={i} className="h-4 w-24" />
        ))}
      </div>

      <Skeleton className="h-64 w-full" />

      <div className="mt-8 flex flex-wrap gap-2">
        {[...Array(3).keys()].map((i) => (
          <Skeleton key={i} className="h-7 w-20" />
        ))}
      </div>

      <section className="my-5 flex flex-col gap-10">
        <Skeleton className="h-6 w-32" />
        {[...Array(2).keys()].map((i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </section>

      <Skeleton className="my-5 h-72 w-full" />
    </>
  );
};
export default Loading;
