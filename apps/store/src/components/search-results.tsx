import { ProductGrid } from '@/components/product-grid'
import { getProducts } from '@/lib/products'
import { Skeleton } from '@repo/ui/components/skeleton'

export async function SearchResults({
  query,
  category,
}: {
  query?: string
  category?: string
}) {
  try {
    const hasFilters = query || category
    const response = await getProducts({
      search: query || undefined,
      category: category || undefined,
      limit: hasFilters ? 5 : 20,
    })

    if (response.data.length === 0) {
      return (
        <div className="py-12 text-center">
          <p className="text-lg text-zinc-500">
            {query
              ? `No products found for "${query}"`
              : 'No products found in this category'}
          </p>
        </div>
      )
    }

    return (
      <div>
        {hasFilters && (
          <p className="mb-4 text-sm text-zinc-500">
            Showing {response.data.length} result
            {response.data.length !== 1 ? 's' : ''}
            {query ? ` for "${query}"` : ''}
          </p>
        )}
        <ProductGrid products={response.data} />
      </div>
    )
  } catch {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-zinc-500">
          Something went wrong. Please try again.
        </p>
      </div>
    )
  }
}

export function SearchResultsSkeleton() {
  return (
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
  )
}
