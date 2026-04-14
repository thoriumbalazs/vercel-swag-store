export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  currency: string
  category: string
  images: string[]
  tags: string[]
  featured: boolean
  createdAt: string
}

export interface ProductStock {
  productId: string
  stock: number
  inStock: boolean
  lowStock: boolean
}

export interface Promotion {
  id: string
  title: string
  description: string
  discountPercent: number
  code: string
  validFrom: string
  validUntil: string
  active: boolean
}

export interface Category {
  slug: string
  name: string
  productCount: number
}

export interface CartItem {
  productId: string
  quantity: number
  addedAt: string
  product: Product
  lineTotal: number
}

export interface Cart {
  token: string
  items: CartItem[]
  totalItems: number
  subtotal: number
}

export interface StoreConfig {
  storeName: string
  currency: string
  features: Record<string, unknown>
  socialLinks: Record<string, string>
  seo: {
    defaultTitle: string
    titleTemplate: string
    defaultDescription: string
  }
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  meta?: {
    pagination?: Pagination
  }
}

export interface ProductSearchParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  featured?: boolean
}
