import type { ComponentType, ReactNode } from "react"
import { Home, Menu, ShoppingCart, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { ProPlansModal } from "@/features/subscriptions"
import { cn } from "@/lib/utils"

type BottomNavItem = {
  label: string
  icon: ComponentType<{ className?: string }>
  active?: boolean
  to?: string
  onClick?: () => void
  badge?: ReactNode
}

export function MobileBottomNav({
  cartCount = 0,
  onMenu,
  onCart,
}: {
  cartCount?: number
  onMenu: () => void
  onCart: () => void
}) {
  const items: BottomNavItem[] = [
    { label: "Inicio", icon: Home, to: "/shop", active: true },
    { label: "Menu", icon: Menu, onClick: onMenu },
    {
      label: "Carrito",
      icon: ShoppingCart,
      onClick: onCart,
      badge: cartCount > 0 ? cartCount : null,
    },
  ]

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-xl border bg-background/95 p-1 shadow-lg backdrop-blur md:hidden">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => (
          <BottomNavButton key={item.label} item={item} />
        ))}
        <ProPlansModal
          trigger={
            <button
              type="button"
              className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              <Sparkles className="size-4" />
              Pro
            </button>
          }
        />
      </div>
    </nav>
  )
}

function BottomNavButton({ item }: { item: BottomNavItem }) {
  const content = (
    <>
      <span className="relative">
        <item.icon className="size-4" />
        {item.badge ? (
          <span className="absolute -top-2 -right-3 flex min-w-4 justify-center rounded-full bg-primary px-1 text-[10px] leading-4 text-primary-foreground">
            {item.badge}
          </span>
        ) : null}
      </span>
      <span>{item.label}</span>
    </>
  )
  const className = cn(
    "flex h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-medium transition-colors",
    item.active
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:bg-muted"
  )

  if (item.to) {
    return (
      <Button asChild variant="ghost" className={className}>
        <Link to={item.to}>{content}</Link>
      </Button>
    )
  }

  return (
    <button type="button" onClick={item.onClick} className={className}>
      {content}
    </button>
  )
}
