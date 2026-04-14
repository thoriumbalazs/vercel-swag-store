import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-4xl">404</h1>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        className="font-medium text-sm underline underline-offset-4"
        href="/"
      >
        Go back home
      </Link>
    </div>
  )
}
