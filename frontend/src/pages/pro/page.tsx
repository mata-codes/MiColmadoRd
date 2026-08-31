import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { APP_CONFIG } from "@/config/app"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  CheckCircle2,
  CreditCard,
  Crown,
  Mail,
  Package,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

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
      "Diferentes metodos de pago",
      "Seguimiento basico del pedido",
      "Soporte",
    ],
  },
  {
    name: "Pro",
    price: "$ 4.99",
    description:
      "Para clientes frecuentes que quieren ahorrar y recibir mas rapido.",
    label: "Mas elegido",
    icon: Crown,
    action: "Activar Pro",
    highlighted: true,
    benefits: [
      "Delivery prioritario",
      "Ofertas exclusivas para miembros",
      "Lista de compras favorita",
      "Cupon mensual para compras grandes",
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
      "Direccion y contacto dedicado",
      "Facturacion mensual",
      "Atencion directa",
    ],
  },
]

export default function ProPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex min-h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Actualizar a Pro</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <section className="space-y-4">
            <div className="rounded-xl border bg-card p-6">
              <Badge variant="secondary" className="mb-4">
                <Sparkles />
                Membresias para clientes
              </Badge>
              <div className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                  Elige como quieres comprar en {APP_CONFIG.name}
                </h1>
                <p className="mt-3 text-muted-foreground">
                  Planes disenados para que comprar sea mas facil, conveniente y
                  rentable. Disfruta mayor comodidad, mejores ofertas, delivery
                  prioritario y beneficios especiales para compras grandes.
                </p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={plan.highlighted ? "ring-2 ring-primary" : ""}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
                        <plan.icon className="size-5" />
                      </div>
                      <Badge
                        variant={plan.highlighted ? "default" : "secondary"}
                      >
                        {plan.label}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <CardTitle>{plan.name}</CardTitle>
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
                  <CardContent className="space-y-4">
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
                          {plan.name === "Pro" ? (
                            <CreditCard />
                          ) : (
                            <ShieldCheck />
                          )}
                          {plan.action}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
