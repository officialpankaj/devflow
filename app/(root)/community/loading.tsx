import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark400_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 sm:w-42.5" />
      </div>

      <div className="mt-12 flex flex-wrap gap-5">
        {[...Array(10).keys()].map((i) => (
          <Skeleton key={i} className="xs:w-57.5 h-60 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
};
export default Loading;
