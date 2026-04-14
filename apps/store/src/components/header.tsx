import { Skeleton } from '@repo/ui/components/skeleton'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'
import { CartIconWrapper } from '@/components/cart-icon-wrapper'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-zinc-200 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link className="flex items-center gap-2" href="/">
            <svg
              aria-label="Vercel logomark"
              height="22"
              role="img"
              viewBox="0 0 74 64"
            >
              <path
                d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-semibold text-lg text-zinc-900 tracking-tight">
              Swag Store
            </span>
          </Link>

          <nav className="flex items-start gap-6">
            <Link
              className="font-medium text-sm text-zinc-600 transition-colors hover:text-zinc-900"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-medium text-sm text-zinc-600 transition-colors hover:text-zinc-900"
              href="/search"
            >
              Search
            </Link>
          </nav>
        </div>

        <Suspense fallback={<CartIconSkeleton />}>
          <CartIcon />
        </Suspense>
      </div>
    </header>
  )
}

async function CartIcon() {
  const cookieStore = await cookies()
  const cartToken = cookieStore.get('cart-token')?.value ?? null
  return <CartIconWrapper cartToken={cartToken} />
}

function CartIconSkeleton() {
  return <Skeleton className="size-5 rounded-full" />
}
