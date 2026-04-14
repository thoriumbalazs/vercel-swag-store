import { Badge } from '@repo/ui/components/badge'
import { getActivePromotion } from '@/lib/promotions'

export async function PromotionalBanner() {
  try {
    const promotion = await getActivePromotion()

    if (!promotion?.active) {
      return null
    }

    return (
      <section className="rounded-lg border bg-muted/50 px-6 py-5">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold">{promotion.title}</h3>
            <p className="mt-1 text-muted-foreground text-sm">
              {promotion.description}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-muted-foreground text-sm">Use code:</span>
            <Badge variant="secondary">{promotion.code}</Badge>
          </div>
        </div>
      </section>
    )
  } catch {
    return null
  }
}
