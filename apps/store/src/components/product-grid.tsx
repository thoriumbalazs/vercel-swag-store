import { ProductCard } from '@/components/product-card'

type ProductGridProps = {
  products: Array<{
    slug: string
    name: string
    price: number
    images: string[]
  }>
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  )
}
