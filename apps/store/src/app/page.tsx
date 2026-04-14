import { Skeleton } from '@repo/ui/components/skeleton'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { HeroSection } from '@/components/hero-section'
import { ProductGrid } from '@/components/product-grid'
import { PromotionalBanner } from '@/components/promotional-banner'
import { getFeaturedProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Home',
  openGraph: {
    title: 'Vercel Swag Store',
    description:
      'Official Vercel merchandise. Premium developer apparel, accessories, and gear.',
  },
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <HeroSection />
      <Suspense fallback={<PromoBannerSkeleton />}>
        <PromotionalBanner />
      </Suspense>
      <section className="py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-bold text-2xl tracking-tight">
            Featured Products
          </h2>
          <Link
            className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/search"
          >
            View All
          </Link>
        </div>
        <Suspense fallback={<ProductGridSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </section>
    </div>
  )
}

async function FeaturedProducts() {
  // NOTE: we could add error handling here, but if featured products can't show,
  // it's probably better have the Error boundary handle it
  const products = await getFeaturedProducts()
  return <ProductGrid products={products} />
}

function PromoBannerSkeleton() {
  return (
    <div className="rounded-lg border bg-muted/50 px-6 py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-6 w-32" />
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton only
        <div className="space-y-3" key={i}>
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  )
}
