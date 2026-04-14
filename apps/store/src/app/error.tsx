'use client'

export default function ErrorPage({
  error,
  reset,
}: {
  error: globalThis.Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-2xl">Something went wrong</h1>
      <p className="text-muted-foreground">{error.message}</p>
      <button
        className="font-medium text-sm underline underline-offset-4"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </div>
  )
}
