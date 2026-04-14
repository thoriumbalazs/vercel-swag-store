'use cache'

import { cacheLife, cacheTag } from 'next/cache'
import { apiFetch } from './api'
import type { Promotion } from './types'

export async function getActivePromotion(): Promise<Promotion> {
  cacheLife('promotions')
  cacheTag('promotions')

  return apiFetch<Promotion>('/promotions')
}
