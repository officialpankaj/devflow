import { Skeleton } from "@/components/ui/skeleton";

export const NavbarSkeleton = () => (
  <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full gap-5 p-6 px-12 dark:shadow-none">
    <Skeleton className="h-8 w-8 sm:w-44" />
    <Skeleton className="h-12 max-w-150 flex-1 max-lg:hidden" />
    <div className="flex-between gap-5">
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="size-9 rounded-full" />
    </div>
  </nav>
);

export const LeftSidebarSkeleton = () => (
  <section className="background-light900_dark200 light-border shadow-light-300 sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-28 max-sm:hidden lg:w-66.5">
    <div className="flex flex-1 flex-col gap-4">
      {[...Array(6).keys()].map((i) => (
        <Skeleton key={i} className="h-12 w-full rounded-lg" />
      ))}
    </div>
    <div className="flex flex-col gap-3">
      <Skeleton className="min-h-10.25 w-full rounded-lg" />
      <Skeleton className="min-h-10.25 w-full rounded-lg" />
    </div>
  </section>
);
