'use cache'

import { cacheLife, cacheTag } from 'next/cache'
import { apiFetch } from './api'
import type { StoreConfig } from './types'

export async function getStoreConfig() {
  cacheLife('storeConfig')
  cacheTag('store-config')

  return apiFetch<StoreConfig>('/store/config')
}
