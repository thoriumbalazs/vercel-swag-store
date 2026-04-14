import { Suspense } from 'react'
import { SearchForm } from '@/components/search-form'
import {
  SearchResults,
  SearchResultsSkeleton,
} from '@/components/search-results'
import { getCategories } from '@/lib/categories'

export async function SearchPageContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const { q, category } = await searchParams
  const categories = await getCategories()

  return (
    <>
      <SearchForm
        categories={categories}
        initialCategory={category ?? ''}
        initialQuery={q ?? ''}
      />
      <div className="mt-8">
        <Suspense
          fallback={<SearchResultsSkeleton />}
          key={`${q ?? ''}-${category ?? ''}`}
        >
          <SearchResults category={category} query={q} />
        </Suspense>
      </div>
    </>
  )
}
