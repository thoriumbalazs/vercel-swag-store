'use server'

import { updateTag } from 'next/cache'
import {
  addCartItem,
  getCartToken,
  getOrCreateCartToken,
  removeCartItem,
  updateCartItem,
} from '@/lib/cart'

type CartActionState = {
  success: boolean
  message: string
}

export async function addToCart(
  _prevState: CartActionState | null,
  formData: FormData
): Promise<CartActionState> {
  try {
    const productId = formData.get('productId') as string
    const quantity = Number(formData.get('quantity') ?? 1)

    if (!productId) {
      return { success: false, message: 'Product ID is required' }
    }

    const token = await getOrCreateCartToken()
    await addCartItem(token, productId, quantity)
    updateTag('cart')

    return { success: true, message: 'Added to cart!' }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to add to cart',
    }
  }
}

export async function updateCartItemQuantity(
  _prevState: CartActionState | null,
  formData: FormData
) {
  try {
    const itemId = formData.get('itemId') as string
    const quantity = Number(formData.get('quantity') ?? 0)
    const token = await getCartToken()

    if (!(token && itemId)) {
      return { success: false, message: 'Invalid request' }
    }

    if (quantity === 0) {
      await removeCartItem(token, itemId)
    } else {
      await updateCartItem(token, itemId, quantity)
    }

    updateTag('cart')
    return { success: true, message: 'Cart updated' }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update cart',
    }
  }
}

export async function removeFromCart(
  _prevState: CartActionState | null,
  formData: FormData
) {
  try {
    const itemId = formData.get('itemId') as string
    const token = await getCartToken()

    if (!(token && itemId)) {
      return { success: false, message: 'Invalid request' }
    }

    await removeCartItem(token, itemId)
    updateTag('cart')

    return { success: true, message: 'Item removed' }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to remove item',
    }
  }
}
