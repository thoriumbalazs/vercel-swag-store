'use cache'

import { cacheLife, cacheTag } from 'next/cache'
import { apiFetch, apiFetchWithMeta } from './api'
import type { Product, ProductSearchParams } from './types'

export async function getProducts(params?: ProductSearchParams) {
  cacheLife('products')
  cacheTag('products')

  const searchParams = new URLSearchParams()

  if (params?.page !== undefined) {
    searchParams.set('page', String(params.page))
  }
  if (params?.limit !== undefined) {
    searchParams.set('limit', String(params.limit))
  }
  if (params?.category !== undefined) {
    searchParams.set('category', params.category)
  }
  if (params?.search !== undefined) {
    searchParams.set('search', params.search)
  }
  if (params?.featured !== undefined) {
    searchParams.set('featured', String(params.featured))
  }

  const query = searchParams.toString()
  const path = `/products${query ? `?${query}` : ''}`

  return apiFetchWithMeta<Product[]>(path)
}

export async function getFeaturedProducts() {
  cacheTag('products', 'featured-products')

  const response = await getProducts({ featured: true, limit: 6 })
  return response.data
}

export async function getProduct(slugOrId: string) {
  cacheLife('products')
  cacheTag('products', `product-${slugOrId}`)

  return apiFetch<Product>(`/products/${encodeURIComponent(slugOrId)}`)
}
