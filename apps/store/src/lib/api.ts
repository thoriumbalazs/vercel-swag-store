import type { ApiResponse } from './types'

export const API_BASE = 'https://vercel-swag-store-api.vercel.app/api'

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${path}`

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} (${url})`
    )
  }

  const json: ApiResponse<T> = await response.json()

  if (!json.success) {
    throw new Error(`API returned unsuccesful response for ${url}`)
  }

  return json.data
}

export async function apiFetchWithMeta<T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${path}`

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} (${url})`
    )
  }

  const json: ApiResponse<T> = await response.json()

  if (!json.success) {
    throw new Error(`API returned unsuccesful response for ${url}`)
  }

  return json
}
