'use cache'

import { cacheLife, cacheTag } from 'next/cache'
import { apiFetch } from './api'
import type { Category } from './types'

export async function getCategories(): Promise<Category[]> {
  cacheLife('products')
  cacheTag('categories')

  return apiFetch<Category[]>('/categories')
}
