import {
  Banknote,
  CheckCircle2,
  CreditCard,
  LayoutGrid,
  Minus,
  Plus,
  ReceiptText,
  ShoppingCart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import type { SaleCartItem, SaleProduct } from "../types/sale-product"
import type { PaymentMethod } from "../types/sale"

export function SaleCheckoutPanel({
  cart,
  customer,
  paymentMethod,
  productHint,
  total,
  itemCount,
  onCustomerChange,
  onPaymentMethodChange,
  onAdd,
  onRemoveOne,
  onRegister,
  onFindProducts,
}: {
  cart: SaleCartItem[]
  customer: string
  paymentMethod: PaymentMethod
  productHint: string
  total: number
  itemCount: number
  onCustomerChange: (value: string) => void
  onPaymentMethodChange: (value: PaymentMethod) => void
  onAdd: (product: SaleProduct) => void
  onRemoveOne: (id: number) => void
  onRegister: () => void
  onFindProducts: () => void
}) {
  return (
    <Card className="xl:sticky xl:top-20 xl:max-h-[calc(100svh-6rem)]">
      <CardHeader>
        <CardTitle>Proceso de cobro</CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-col gap-4">
        <Input
          aria-label="Cliente o referencia de la venta"
          value={customer}
          onChange={(event) => onCustomerChange(event.target.value)}
          placeholder="Cliente o referencia"
        />

        <div className="flex-1 space-y-3 overflow-auto">
          {cart.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-center">
              <ShoppingCart className="mx-auto mb-2 size-8 text-muted-foreground" />
              <p className="text-sm font-medium">Carrito vacío</p>
              <p className="text-xs text-muted-foreground">
                Selecciona productos para registrar una venta.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 xl:hidden"
                onClick={onFindProducts}
              >
                <LayoutGrid />
                Buscar productos
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border bg-background p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      RD$ {item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold">
                    RD$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-end gap-2">
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
                    onClick={() => onAdd(item)}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "Efectivo", icon: Banknote },
            { value: "Tarjeta", icon: CreditCard },
            { value: "Transferencia", icon: CheckCircle2 },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={paymentMethod === item.value}
              onClick={() => onPaymentMethodChange(item.value as PaymentMethod)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-xs transition-colors",
                paymentMethod === item.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              )}
            >
              <item.icon className="size-4" />
              {item.value}
            </button>
          ))}
        </div>

        <div className="space-y-2 rounded-lg bg-muted p-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Producto clave</span>
            <span className="max-w-40 truncate">{productHint}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Artículos</span>
            <span>{itemCount}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>RD$ {total.toFixed(2)}</span>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={cart.length === 0}
          onClick={onRegister}
        >
          <ReceiptText />
          Registrar venta
        </Button>
      </CardContent>
    </Card>
  )
}
