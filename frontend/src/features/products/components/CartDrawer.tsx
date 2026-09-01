import {
  CheckCircle2,
  CreditCard,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

import type { CartItem } from "../hooks/useCart"
import type { Product } from "../types/product.interface"

export function CartSummary({
  cart,
  paid,
  paymentMethod,
  onPaymentMethodChange,
  onAdd,
  onRemoveOne,
  onRemove,
  onCheckout,
}: {
  cart: CartItem[]
  paid: boolean
  paymentMethod: string
  onPaymentMethodChange: (value: string) => void
  onAdd: (product: Product) => void
  onRemoveOne: (id: number) => void
  onRemove: (id: number) => void
  onCheckout: () => void
}) {
  const subtotal = cart.reduce((sum, item) => {
    const price = item.discountPrice ?? item.price
    return sum + price * item.quantity
  }, 0)
  const delivery = subtotal > 0 ? 75 : 0
  const total = subtotal + delivery
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <h2 className="font-semibold">Carrito</h2>
          <p aria-live="polite" className="text-xs text-muted-foreground">
            {count} producto{count === 1 ? "" : "s"} seleccionado
            {count === 1 ? "" : "s"}
          </p>
        </div>
        <Badge variant="secondary">RD$ {total.toFixed(2)}</Badge>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {paid ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <CheckCircle2 className="size-10 text-primary" />
            <p className="font-medium">Pago registrado</p>
            <p className="text-sm text-muted-foreground">
              La orden fue procesada.
            </p>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <ShoppingCart className="size-10 text-muted-foreground" />
            <p className="font-medium">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground">
              Agrega productos para preparar la compra.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {cart.map((item) => {
              const price = item.discountPrice ?? item.price

              return (
                <div
                  key={item.id}
                  className="rounded-lg border bg-background p-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      className="size-14 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        RD$ {price.toFixed(2)} x {item.quantity}
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        RD$ {(price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Eliminar ${item.name} del carrito`}
                      onClick={() => onRemove(item.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Stock: {item.stock}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Quitar una unidad de ${item.name}`}
                        onClick={() => onRemoveOne(item.id)}
                      >
                        <Minus />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Agregar una unidad de ${item.name}`}
                        disabled={item.quantity >= item.stock}
                        onClick={() => onAdd(item)}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="mb-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>RD$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span>RD$ {delivery.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>RD$ {total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-2">
          {["Tarjeta", "Efectivo", "Transferencia"].map((method) => (
            <button
              key={method}
              type="button"
              aria-pressed={paymentMethod === method}
              onClick={() => onPaymentMethodChange(method)}
              className={cn(
                "rounded-lg border px-2 py-2 text-xs transition-colors",
                paymentMethod === method
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              )}
            >
              {method}
            </button>
          ))}
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={cart.length === 0}
          onClick={onCheckout}
        >
          <CreditCard />
          Pagar con {paymentMethod}
        </Button>
      </div>
    </div>
  )
}

export function CartDrawer({
  count,
  children,
  open,
  onOpenChange,
}: {
  count: number
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          aria-label={`Abrir carrito con ${count} productos`}
        >
          <ShoppingCart />
          <span className="tabular-nums">{count}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[88svh] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Carrito</SheetTitle>
        </SheetHeader>
        {children}
        <SheetFooter className="sr-only" />
      </SheetContent>
    </Sheet>
  )
}
