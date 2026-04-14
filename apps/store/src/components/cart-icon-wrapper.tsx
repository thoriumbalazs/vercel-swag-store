'use cache'

import { Badge } from '@repo/ui/components/badge'
import { ShoppingCart } from 'lucide-react'
import { cacheTag } from 'next/cache'
import Link from 'next/link'
import { getCart } from '@/lib/cart'

export async function CartIconWrapper({
  cartToken,
}: {
  cartToken: string | null
}) {
  cacheTag('cart')

  let totalItems = 0

  if (cartToken) {
    try {
      const cart = await getCart(cartToken)
      totalItems = cart.totalItems
    } catch {
      // If cart fetch fails, show icon without badge
    }
  }

  return (
    <Link className="relative flex items-center" href="/cart">
      <ShoppingCart className="size-5" />
      {totalItems > 0 && (
        <Badge
          className="-right-2 -top-2 absolute flex size-5 items-center justify-center rounded-full p-0 text-xs"
          variant="destructive"
        >
          {totalItems}
        </Badge>
      )}
    </Link>
  )
}
