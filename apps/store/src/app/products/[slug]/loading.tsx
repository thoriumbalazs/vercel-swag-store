import { Separator } from '@repo/ui/components/separator'
import { Skeleton } from '@repo/ui/components/skeleton'

export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Image skeleton */}
        <Skeleton className="aspect-square w-full rounded-lg" />

        {/* Right: Details skeleton */}
        <div className="flex flex-col">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="mt-2 h-8 w-24" />
          <Separator className="my-6" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
