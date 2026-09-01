import type { ReactNode } from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import {
  CheckCircle2,
  Crown,
  Mail,
  Package,
  ShieldCheck,
  Sparkles,
  Users,
  XIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { APP_CONFIG } from "@/config/app"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "$ 0",
    description: "Para comprar productos sin pagar mensualidad.",
    label: "Actual",
    icon: Package,
    action: "Seguir gratis",
    highlighted: false,
    benefits: [
      "Comprar productos disponibles",
      "Diferentes métodos de pago",
      "Seguimiento básico del pedido",
      "Soporte",
    ],
  },
  {
    name: "Pro",
    price: "$ 4.99",
    description:
      "Para clientes frecuentes que quieren ahorrar y recibir más rápido.",
    label: "Más elegido",
    icon: Crown,
    action: "Activar Pro",
    highlighted: true,
    benefits: [
      "Delivery prioritario",
      "Ofertas exclusivas para miembros",
      "Lista de compras favorita",
      "Cupón mensual para compras grandes",
      "Soporte preferencial",
    ],
  },
  {
    name: "Enterprise",
    price: "Por correo",
    description:
      "Para oficinas, familias grandes o negocios que compran por volumen.",
    label: "A medida",
    icon: Users,
    action: "Contactar",
    highlighted: false,
    benefits: [
      "Pedidos recurrentes programados",
      "Precios por volumen",
      "Dirección y contacto dedicado",
      "Facturación mensual",
      "Atención directa",
    ],
  },
]

export function ProPlansModal({ trigger }: { trigger: ReactNode }) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content className="fixed inset-x-3 top-1/2 z-50 max-h-[92svh] -translate-y-1/2 overflow-auto rounded-lg border bg-popover p-4 text-popover-foreground shadow-xl outline-none sm:inset-x-auto sm:left-1/2 sm:w-[min(980px,calc(100vw-2rem))] sm:-translate-x-1/2 sm:p-5 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
          <div className="mb-4 pr-10">
            <Badge variant="secondary" className="mb-3">
              <Sparkles />
              Membresías para clientes
            </Badge>
            <DialogPrimitive.Title className="text-2xl font-bold tracking-tight">
              Elige cómo quieres comprar en {APP_CONFIG.name}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-2 text-sm text-muted-foreground">
              Activa beneficios sin salir de la tienda: ofertas, delivery
              prioritario y soporte preferencial para compras frecuentes.
            </DialogPrimitive.Description>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "p-0",
                  plan.highlighted
                    ? "order-first ring-2 ring-primary lg:order-none"
                    : ""
                )}
              >
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <plan.icon className="size-5" />
                    </div>
                    <Badge variant={plan.highlighted ? "default" : "secondary"}>
                      {plan.label}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.name === "Pro" ? (
                        <span className="pb-1 text-sm text-muted-foreground">
                          / mes
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-4 pt-0">
                  <div className="space-y-2">
                    {plan.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                    asChild={plan.name === "Enterprise"}
                  >
                    {plan.name === "Enterprise" ? (
                      <a
                        href={`mailto:${APP_CONFIG.supportEmail}?subject=Plan%20Enterprise%20Syntar`}
                      >
                        <Mail />
                        {plan.action}
                      </a>
                    ) : (
                      <>
                        <ShieldCheck />
                        {plan.action}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <DialogPrimitive.Close asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-3 right-3"
            >
              <XIcon />
              <span className="sr-only">Cerrar planes</span>
            </Button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
