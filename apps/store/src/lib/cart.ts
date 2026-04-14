import 'server-only'

import { cookies } from 'next/headers'
import { API_BASE } from './api'
import type { ApiResponse, Cart } from './types'

const CART_COOKIE = 'cart-token'

export async function getCartToken() {
  const cookieStore = await cookies()
  return cookieStore.get(CART_COOKIE)?.value
}

export async function setCartToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(CART_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86_400,
    path: '/',
  })
}

async function cartFetch<T>(
  path: string,
  options?: RequestInit & { token?: string }
): Promise<T> {
  const { token, ...fetchOptions } = options ?? {}

  const headers = new Headers(fetchOptions.headers)
  if (token) {
    headers.set('x-cart-token', token)
  }
  headers.set('Content-Type', 'application/json')

  const url = `${API_BASE}${path}`
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    throw new Error(
      `Cart API request failed: ${response.status} ${response.statusText} (${url})`
    )
  }

  const json: ApiResponse<T> = await response.json()

  if (!json.success) {
    throw new Error(`Cart API returned unsuccessful response for ${url}`)
  }

  return json.data
}

export async function createCart() {
  const cart = await cartFetch<Cart>('/cart/create', {
    method: 'POST',
  })
  return cart.token
}

export async function getCart(token: string) {
  return cartFetch<Cart>('/cart', { token })
}

export async function addCartItem(
  token: string,
  productId: string,
  quantity: number
) {
  return cartFetch<Cart>('/cart', {
    method: 'POST',
    token,
    body: JSON.stringify({ productId, quantity }),
  })
}

export async function updateCartItem(
  token: string,
  itemId: string,
  quantity: number
) {
  return cartFetch<Cart>(`/cart/${encodeURIComponent(itemId)}`, {
    method: 'PATCH',
    token,
    body: JSON.stringify({ quantity }),
  })
}

export async function removeCartItem(token: string, itemId: string) {
  return cartFetch<Cart>(`/cart/${encodeURIComponent(itemId)}`, {
    method: 'DELETE',
    token,
  })
}

export async function getOrCreateCartToken() {
  const existing = await getCartToken()
  if (existing) {
    return existing
  }

  const token = await createCart()
  await setCartToken(token)
  return token
}
