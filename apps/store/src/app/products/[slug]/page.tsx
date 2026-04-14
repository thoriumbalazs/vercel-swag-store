import { Separator } from '@repo/ui/components/separator'
import { Skeleton } from '@repo/ui/components/skeleton'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { StockIndicator } from '@/components/stock-indicator'
import { formatPrice } from '@/lib/format'
import { getProduct, getProducts } from '@/lib/products'
import { getProductStock } from '@/lib/stock'
import type { Product } from '@/lib/types'

export async function generateStaticParams() {
  const response = await getProducts({ limit: 100 })
  return response.data.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await getProduct(slug)
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.images[0] ? [{ url: product.images[0] }] : [],
      },
    }
  } catch {
    return { title: 'Product Not Found' }
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let product: Product
  try {
    product = await getProduct(slug)
  } catch {
    notFound()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-zinc-100">
          <Image
            alt={product.name}
            className="size-full object-cover"
            height={800}
            priority
            src={product.images[0] ?? ''}
            width={800}
          />
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl">{product.name}</h1>
          <p className="mt-2 font-semibold text-2xl">
            {formatPrice(product.price)}
          </p>
          <Separator className="my-6" />
          <p className="text-zinc-600 leading-relaxed">{product.description}</p>
          <Separator className="my-6" />

          {/* Dynamic stock + add to cart */}
          <Suspense fallback={<StockAndCartSkeleton />}>
            <StockAndCart productId={product.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

async function StockAndCart({ productId }: { productId: string }) {
  const stock = await getProductStock(productId)
  return (
    <div className="space-y-4">
      <StockIndicator stock={stock} />
      <AddToCartButton
        inStock={stock.inStock}
        productId={productId}
        stock={stock.stock}
      />
    </div>
  )
}

function StockAndCartSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-36" />
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
