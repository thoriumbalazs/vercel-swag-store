import { Button } from '@repo/ui/components/button'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="grid items-center gap-8 py-16 md:grid-cols-2 lg:py-24">
      <div className="md:col-span-1">
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
      </div>
      <div className="flex justify-center">
        <div className="max-w-72 md:max-w-none">
          <Image
            alt="Hero image"
            className="size-full object-cover"
            height={600}
            priority
            src="https://i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com/storefront/black-crewneck-t-shirt.png"
            width={600}
          />
        </div>
      </div>
    </section>
  )
}
