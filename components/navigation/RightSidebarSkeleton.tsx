import { Skeleton } from "@/components/ui/skeleton";

const RightSidebarSkeleton = () => (
  <section className="background-light900_dark200 light-border shadow-light-300 sticky top-0 right-0 flex h-screen w-87.5 flex-col gap-6 overflow-y-auto border-l p-6 pt-36 max-xl:hidden dark:shadow-none">
    <div>
      <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      <div className="mt-7 flex w-full flex-col gap-7.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-between gap-3">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="size-5 shrink-0" />
          </div>
        ))}
      </div>
    </div>

    <div className="mt-16">
      <h3 className="h3-bold text-dark300_light700">Popular Tags</h3>
      <div className="mt-7 flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-between gap-3">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-6" />
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default RightSidebarSkeleton;
