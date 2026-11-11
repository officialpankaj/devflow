import { Skeleton } from "@/components/ui/skeleton";

const VotesSkeleton = () => (
  <div className="flex-center gap-2.5">
    <Skeleton className="h-6 w-14" />
    <Skeleton className="h-6 w-14" />
  </div>
);
export default VotesSkeleton;
