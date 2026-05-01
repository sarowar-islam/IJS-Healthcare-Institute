import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const DoctorCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  </Card>
);
