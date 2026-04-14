import { apiFetch } from './api'
import type { ProductStock } from './types'

export async function getProductStock(productId: string) {
  return apiFetch<ProductStock>(
    `/products/${encodeURIComponent(productId)}/stock`
  )
}
