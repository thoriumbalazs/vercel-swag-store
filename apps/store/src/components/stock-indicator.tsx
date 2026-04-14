import { Badge } from '@repo/ui/components/badge'
import type { ProductStock } from '@/lib/types'

export function StockIndicator({ stock }: { stock: ProductStock }) {
  if (!stock.inStock) {
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
        Out of Stock
      </Badge>
    )
  }

  if (stock.lowStock) {
    return (
      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
        Low Stock ({stock.stock} left)
      </Badge>
    )
  }

  return (
    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
      In Stock ({stock.stock} available)
    </Badge>
  )
}
