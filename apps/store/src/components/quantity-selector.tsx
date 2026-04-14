'use client'

import { Button } from '@repo/ui/components/button'
import { Minus, Plus } from 'lucide-react'

type QuantitySelectorProps = {
  max: number
  value: number
  onChange: (qty: number) => void
}

export function QuantitySelector({
  max,
  value,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        size="icon"
        type="button"
        variant="outline"
      >
        <Minus />
      </Button>
      <span className="w-8 text-center font-medium text-sm">{value}</span>
      <Button
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        size="icon"
        type="button"
        variant="outline"
      >
        <Plus />
      </Button>
    </div>
  )
}
