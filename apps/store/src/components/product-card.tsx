import { Card, CardContent } from '@repo/ui/components/card'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/format'

type ProductCardProps = {
  product: {
    slug: string
    name: string
    price: number
    images: string[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden">
            <Image
              alt={product.name}
              className="object-cover"
              height={400}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              src={product.images[0] ?? ''}
              width={400}
            />
          </div>
          <div className="p-4">
            <h3 className="truncate font-medium text-zinc-900">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              {formatPrice(product.price)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
