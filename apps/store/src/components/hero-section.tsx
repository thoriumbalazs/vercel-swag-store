import { Button } from '@repo/ui/components/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="font-bold text-4xl tracking-tight sm:text-5xl">
        Wear the framework you ship with.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Premium swag for developers who build with Vercel. From tees to tech
        gear, represent the tools you love.
      </p>
      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/search">Shop Now</Link>
        </Button>
      </div>
    </section>
  )
}
