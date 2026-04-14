'use client'

import { Button } from '@repo/ui/components/button'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { addToCart } from '@/actions/cart'
import { QuantitySelector } from './quantity-selector'

type AddToCartButtonProps = {
  productId: string
  stock: number
  inStock: boolean
}

function buttonLabel(inStock: boolean) {
  return inStock ? 'Add to Cart' : 'Out of Stock'
}

export function AddToCartButton({
  productId,
  stock,
  inStock,
}: AddToCartButtonProps) {
  const [state, action, isPending] = useActionState(addToCart, null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || 'Added to cart!')
      setQuantity(1)
    }
  }, [state])

  return (
    <form action={action} className="space-y-4">
      <input name="productId" type="hidden" value={productId} />
      <input name="quantity" type="hidden" value={quantity} />
      {inStock && (
        <QuantitySelector max={stock} onChange={setQuantity} value={quantity} />
      )}
      <Button
        className="w-full"
        disabled={!inStock || isPending}
        size="lg"
        type="submit"
      >
        {isPending ? 'Adding...' : buttonLabel(inStock)}
      </Button>
    </form>
  )
}
