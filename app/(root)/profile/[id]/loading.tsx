import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <section className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Skeleton className="size-35 rounded-full" />

          <div className="mt-3 flex flex-col gap-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-32" />
            <div className="mt-2 flex flex-wrap gap-5">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-36" />
            </div>
            <Skeleton className="mt-5 h-5 w-72 max-w-full" />
          </div>
        </div>

        <Skeleton className="min-h-12 min-w-44 max-sm:mb-5 max-sm:w-full sm:mt-3" />
      </section>

      <div className="mt-10 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        {[...Array(4).keys()].map((i) => (
          <Skeleton key={i} className="h-24 rounded-md" />
        ))}
      </div>

      <section className="mt-10 flex gap-10">
        <div className="flex-2">
          <Skeleton className="h-10.5 w-60" />
          <div className="mt-5 flex w-full flex-col gap-6">
            {[...Array(4).keys()].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-[10px]" />
            ))}
          </div>
        </div>

        <div className="flex w-full min-w-62.5 flex-1 flex-col max-lg:hidden">
          <Skeleton className="h-7 w-24" />
          <div className="mt-7 flex flex-col gap-4">
            {[...Array(5).keys()].map((i) => (
              <div key={i} className="flex-between gap-3">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-6" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default Loading;
