import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <Skeleton className="h-10 w-48" />
      </section>

      <section className="mt-10 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 sm:w-42.5" />
      </section>

      <div className="mt-10 flex w-full flex-col gap-6">
        {[...Array(5).keys()].map((i) => (
          <Skeleton key={i} className="h-48 w-full rounded-[10px]" />
        ))}
      </div>
    </>
  );
};
export default Loading;
