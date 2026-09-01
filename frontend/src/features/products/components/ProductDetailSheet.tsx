import { Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

import type { Product } from "../types/product.interface"

export function ProductDetailSheet({
  product,
  open,
  onOpenChange,
  onAddToCart,
}: {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddToCart: (product: Product, quantity: number) => void
}) {
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const price = product.discountPrice ?? product.price
  const hasDiscount = product.discountPrice !== undefined
  const isOutOfStock = product.stock <= 0

  const add = () => {
    onAddToCart(product, quantity)
    onOpenChange(false)
    setQuantity(1)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[92svh] overflow-auto p-0">
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          className="aspect-[4/3] w-full object-cover sm:aspect-[5/2]"
        />
        <SheetHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <SheetTitle className="text-xl">{product.name}</SheetTitle>
              <SheetDescription>{product.description}</SheetDescription>
            </div>
            <Badge variant={hasDiscount ? "default" : "secondary"}>
              RD$ {price.toFixed(2)}
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-4 px-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground">Marca</p>
              <p className="truncate text-sm font-medium">{product.brand}</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="flex items-center justify-center gap-1 text-sm font-medium">
                <Star className="size-3 fill-current" />
                {product.rating}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground">Stock</p>
              <p className="text-sm font-medium">{product.stock}</p>
            </div>
          </div>

          {hasDiscount ? (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
              Oferta activa: antes RD$ {product.price.toFixed(2)}, ahora RD${" "}
              {price.toFixed(2)}.
            </div>
          ) : null}

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Cantidad</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Reducir cantidad"
                disabled={quantity <= 1}
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                <Minus />
              </Button>
              <span className="w-8 text-center text-sm font-semibold">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Aumentar cantidad"
                disabled={quantity >= product.stock}
                onClick={() =>
                  setQuantity((value) => Math.min(product.stock, value + 1))
                }
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>

        <SheetFooter className="sticky bottom-0 border-t bg-popover">
          <Button
            size="lg"
            disabled={isOutOfStock}
            onClick={add}
            className="w-full"
          >
            <ShoppingCart />
            {isOutOfStock
              ? "No disponible"
              : `Agregar RD$ ${(price * quantity).toFixed(2)}`}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
