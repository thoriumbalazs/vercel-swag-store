'use client'

import { Button } from '@repo/ui/components/button'
import { Input } from '@repo/ui/components/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select'
import { Loader2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import type { Category } from '@/lib/types'

type SearchFormProps = {
  initialQuery: string
  initialCategory: string
  categories: Category[]
}

export function SearchForm({
  initialQuery,
  initialCategory,
  categories,
}: SearchFormProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)
  const [isPending, startTransition] = useTransition()

  const updateSearch = useCallback(
    (q: string, cat: string) => {
      const params = new URLSearchParams()
      if (q) {
        params.set('q', q)
      }
      if (cat) {
        params.set('category', cat)
      }
      const queryString = params.toString()
      startTransition(() => {
        router.replace(`/search${queryString ? `?${queryString}` : ''}`)
      })
    },
    [router]
  )

  // Debounced auto-search when query reaches 3+ characters
  useEffect(() => {
    if (query.length >= 3) {
      const timer = setTimeout(() => updateSearch(query, category), 300)
      return () => clearTimeout(timer)
    }
    // If query is cleared, search with empty query
    if (query.length === 0 && initialQuery) {
      updateSearch('', category)
    }
  }, [query, category, updateSearch, initialQuery])

  // Category change triggers immediate search
  const handleCategoryChange = (value: string) => {
    const newCategory = value === 'all' ? '' : value
    setCategory(newCategory)
    updateSearch(query, newCategory)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSearch(query, category)
  }

  return (
    <div className="relative">
      <form className="flex flex-col gap-4 sm:flex-row" onSubmit={handleSubmit}>
        <div className="relative flex-1">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 size-4 text-zinc-400" />
          <Input
            className="pl-10"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            type="text"
            value={query}
          />
        </div>
        <Select onValueChange={handleCategoryChange} value={category ?? 'all'}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Search</Button>
      </form>
      {isPending && (
        <div className="absolute inset-x-0 top-full flex justify-center pt-4">
          <Loader2 className="size-6 animate-spin text-zinc-400" />
        </div>
      )}
    </div>
  )
}
