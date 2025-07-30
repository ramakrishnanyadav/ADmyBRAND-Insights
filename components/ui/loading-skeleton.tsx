import { Skeleton } from '@/components/ui/skeleton';

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 border rounded-lg">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </div>
        <div className="p-6 border rounded-lg">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-28 mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    </div>
  );
}