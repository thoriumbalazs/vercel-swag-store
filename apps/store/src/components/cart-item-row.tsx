'use client'

import { Button } from '@repo/ui/components/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'
import { removeFromCart, updateCartItemQuantity } from '@/actions/cart'
import { formatPrice } from '@/lib/format'
import type { CartItem } from '@/lib/types'

export function CartItemRow({ item }: { item: CartItem }) {
  const [, updateAction, isUpdating] = useActionState(
    updateCartItemQuantity,
    null
  )
  const [, removeAction, isRemoving] = useActionState(removeFromCart, null)
  const isPending = isUpdating || isRemoving

  return (
    <div className={`flex gap-4 py-4 ${isPending ? 'opacity-50' : ''}`}>
      {/* Product image */}
      <div className="size-20 shrink-0 overflow-hidden rounded-md bg-zinc-100">
        <Image
          alt={item.product.name}
          className="size-full object-cover"
          height={80}
          src={item.product.images[0] ?? ''}
          width={80}
        />
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            className="font-medium hover:underline"
            href={`/products/${item.product.slug}`}
          >
            {item.product.name}
          </Link>
          <p className="text-sm text-zinc-500">
            {formatPrice(item.product.price)} each
          </p>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-2">
          <form action={updateAction}>
            <input name="itemId" type="hidden" value={item.productId} />
            <input name="quantity" type="hidden" value={item.quantity - 1} />
            <Button
              className="size-8"
              disabled={isPending || item.quantity <= 1}
              size="icon"
              type="submit"
              variant="outline"
            >
              <Minus className="size-3" />
            </Button>
          </form>

          <span className="w-8 text-center font-medium text-sm">
            {item.quantity}
          </span>

          <form action={updateAction}>
            <input name="itemId" type="hidden" value={item.productId} />
            <input name="quantity" type="hidden" value={item.quantity + 1} />
            <Button
              className="size-8"
              disabled={isPending}
              size="icon"
              type="submit"
              variant="outline"
            >
              <Plus className="size-3" />
            </Button>
          </form>

          <form action={removeAction} className="ml-2">
            <input name="itemId" type="hidden" value={item.productId} />
            <Button
              className="size-8 text-zinc-400 hover:text-red-500"
              disabled={isPending}
              size="icon"
              type="submit"
              variant="ghost"
            >
              <Trash2 className="size-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Line total */}
      <div className="text-right">
        <span className="font-medium">{formatPrice(item.lineTotal)}</span>
      </div>
    </div>
  )
}
