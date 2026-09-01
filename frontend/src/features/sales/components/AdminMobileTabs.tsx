import type { ComponentType } from "react"
import { BarChart3, LayoutGrid, ReceiptText, ShoppingCart } from "lucide-react"

import { cn } from "@/lib/utils"

import type { AdminView } from "../types/sale"

const views: {
  value: AdminView
  label: string
  icon: ComponentType<{ className?: string }>
}[] = [
  { value: "dashboard", label: "Panel", icon: BarChart3 },
  { value: "cobro", label: "Cobro", icon: ShoppingCart },
  { value: "productos", label: "Productos", icon: LayoutGrid },
  { value: "ventas", label: "Ventas", icon: ReceiptText },
]

export function AdminMobileTabs({
  value,
  onChange,
}: {
  value: AdminView
  onChange: (value: AdminView) => void
}) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 gap-1 rounded-xl border bg-background/95 p-1 shadow-lg backdrop-blur xl:hidden">
      {views.map((view) => (
        <button
          key={view.value}
          type="button"
          aria-pressed={value === view.value}
          onClick={() => onChange(view.value)}
          className={cn(
            "flex h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-medium transition-colors",
            value === view.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          <view.icon className="size-4" />
          {view.label}
        </button>
      ))}
    </div>
  )
}
