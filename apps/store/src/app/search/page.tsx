import { Skeleton } from '@repo/ui/components/skeleton'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchPageContent } from '@/components/search-page-content'

export const metadata: Metadata = {
  title: 'Search',
  openGraph: {
    title: 'Search Products | Vercel Swag Store',
  },
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-bold text-3xl tracking-tight">
        Search Products
      </h1>
      <Suspense fallback={<SearchPageSkeleton />}>
        <SearchPageContent searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

function SearchPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton only
          <div className="overflow-hidden rounded-lg border" key={i}>
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
