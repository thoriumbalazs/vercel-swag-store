import { Button } from '@repo/ui/components/button'
import { Separator } from '@repo/ui/components/separator'
import { Skeleton } from '@repo/ui/components/skeleton'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'
import { CartItemRow } from '@/components/cart-item-row'
import { getCart } from '@/lib/cart'
import { formatPrice } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Cart',
}

export default function CartPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 font-bold text-3xl tracking-tight">Your Cart</h1>
      <Suspense fallback={<CartSkeleton />}>
        <CartContents />
      </Suspense>
    </div>
  )
}

async function CartContents() {
  const cookieStore = await cookies()
  const cartToken = cookieStore.get('cart-token')?.value

  if (!cartToken) {
    return <EmptyCartMessage />
  }

  let cart: Awaited<ReturnType<typeof getCart>>
  try {
    cart = await getCart(cartToken)
  } catch {
    return <EmptyCartMessage />
  }

  if (cart.items.length === 0) {
    return <EmptyCartMessage />
  }

  return (
    <>
      <div className="space-y-0">
        {cart.items.map((item, index) => (
          <div key={item.productId}>
            <CartItemRow item={item} />
            {index < cart.items.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </div>
      <Separator className="my-6" />
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg">Subtotal</span>
        <span className="font-semibold text-lg">
          {formatPrice(cart.subtotal)}
        </span>
      </div>
      <div className="mt-8 flex gap-4">
        <Button asChild className="flex-1" variant="outline">
          <Link href="/search">Continue Shopping</Link>
        </Button>
      </div>
    </>
  )
}

function EmptyCartMessage() {
  return (
    <div className="py-8 text-center">
      <p className="mb-8 text-zinc-500">Your cart is empty.</p>
      <Button asChild>
        <Link href="/search">Start Shopping</Link>
      </Button>
    </div>
  )
}

function CartSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton only
        <div className="flex gap-4 py-4" key={i}>
          <Skeleton className="size-20 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
      ))}
    </div>
  )
}
