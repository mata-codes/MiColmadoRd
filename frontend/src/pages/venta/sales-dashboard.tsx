import { useMemo, useState } from "react"
import {
  CalendarDays,
  Clock,
  ReceiptText,
  Search,
  ShoppingCart,
  TrendingUp,
  WalletCards,
} from "lucide-react"

import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  AdminMobileTabs,
  SALE_PRODUCTS,
  SaleCheckoutPanel,
  SaleDetailSheet,
  SaleProductsPanel,
  SalesHistoryPanel,
  SalesMetricCard,
  type AdminView,
  type PaymentMethod,
  type Sale,
  type SaleCartItem,
  type SaleProduct,
} from "@/features/sales"
import { getCategoryOptions, normalizeCatalogText } from "@/lib/catalog"
import { cn } from "@/lib/utils"

const ALL_SALE_CATEGORIES_LABEL = "Todas"

const INITIAL_SALES: Sale[] = [
  {
    id: "V-1004",
    cliente: "Mostrador",
    estado: "Pagada",
    metodo: "Efectivo",
    total: 485,
    articulos: 8,
    hora: "09:15 AM",
  },
  {
    id: "V-1003",
    cliente: "Delivery",
    estado: "Preparando",
    metodo: "Transferencia",
    total: 760,
    articulos: 11,
    hora: "08:48 AM",
  },
  {
    id: "V-1002",
    cliente: "Maria P.",
    estado: "Entregada",
    metodo: "Tarjeta",
    total: 325,
    articulos: 5,
    hora: "08:21 AM",
  },
  {
    id: "V-1001",
    cliente: "Jose R.",
    estado: "Pendiente",
    metodo: "Efectivo",
    total: 210,
    articulos: 3,
    hora: "07:56 AM",
  },
]

export default function SalesDashboard() {
  const [activeCategory, setActiveCategory] = useState(
    ALL_SALE_CATEGORIES_LABEL
  )
  const [search, setSearch] = useState("")
  const [cart, setCart] = useState<SaleCartItem[]>([])
  const [sales, setSales] = useState<Sale[]>(INITIAL_SALES)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Efectivo")
  const [customer, setCustomer] = useState("Mostrador")
  const [adminView, setAdminView] = useState<AdminView>("dashboard")
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)

  const categories = useMemo(
    () => [
      ALL_SALE_CATEGORIES_LABEL,
      ...getCategoryOptions(SALE_PRODUCTS).slice(1),
    ],
    []
  )

  const filteredProducts = useMemo(() => {
    return SALE_PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === ALL_SALE_CATEGORIES_LABEL ||
        normalizeCatalogText(product.category) ===
          normalizeCatalogText(activeCategory)
      const matchesSearch = normalizeCatalogText(product.name).includes(
        normalizeCatalogText(search)
      )

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const completedSales = sales.filter(
    (sale) => sale.estado === "Pagada" || sale.estado === "Entregada"
  )
  const revenue = completedSales.reduce((sum, sale) => sum + sale.total, 0)
  const inProgress = sales.filter(
    (sale) => sale.estado === "Pendiente" || sale.estado === "Preparando"
  ).length
  const averageTicket = sales.length ? revenue / sales.length : 0

  const productHint = useMemo(() => {
    const count = cart.reduce<Record<string, number>>((acc, item) => {
      acc[item.name] = (acc[item.name] ?? 0) + item.quantity
      return acc
    }, {})

    const product = Object.entries(count).sort((a, b) => b[1] - a[1])[0]
    return product?.[0] ?? "Sin productos"
  }, [cart])

  const addToCart = (product: SaleProduct) => {
    setAdminView("cobro")
    setCart((prev) => {
      const current = prev.find((item) => item.id === product.id)

      if (current) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeOne = (id: number) => {
    setCart((prev) => {
      const current = prev.find((item) => item.id === id)

      if (current && current.quantity > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      }

      return prev.filter((item) => item.id !== id)
    })
  }

  const registerSale = () => {
    if (cart.length === 0) return

    const newSale: Sale = {
      id: `V-${1001 + sales.length}`,
      cliente: customer.trim() || "Mostrador",
      estado: paymentMethod === "Efectivo" ? "Pagada" : "Preparando",
      metodo: paymentMethod,
      total,
      articulos: itemCount,
      hora: new Date().toLocaleTimeString("es-DO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setSales((prev) => [newSale, ...prev])
    setCart([])
    setCustomer("Mostrador")
    setSelectedSale(newSale)
    setAdminView("ventas")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex min-h-16 shrink-0 items-center justify-between gap-3 border-b bg-background/95 px-3 backdrop-blur sm:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="-ml-1" aria-label="Abrir menu" />
            <Separator
              orientation="vertical"
              className="mr-2 hidden data-[orientation=vertical]:h-4 sm:block"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Ventas privadas</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="relative hidden w-full max-w-sm md:block">
            <Search className="absolute top-2 left-2 size-4 text-muted-foreground" />
            <Input
              aria-label="Buscar productos para registrar una venta"
              placeholder="Buscar producto..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-8"
            />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-auto p-3 pb-24 sm:p-4 xl:pb-4">
          <section
            className={cn(
              "mb-4 grid gap-3 xl:grid xl:grid-cols-[1fr_280px]",
              adminView !== "dashboard" && "hidden xl:grid"
            )}
          >
            <div>
              <Badge variant="secondary" className="mb-3">
                <CalendarDays />
                Operación de hoy
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Dashboard de ventas
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Registra cobros, revisa órdenes y mantén visible el flujo del
                mostrador desde el móvil.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <WalletCards className="size-4 text-muted-foreground" />
                Corte parcial
              </div>
              <p className="mt-3 text-2xl font-bold">
                RD$ {revenue.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                Ticket promedio RD$ {averageTicket.toFixed(2)}
              </p>
            </div>
          </section>

          <div
            className={cn(
              "grid gap-3 sm:grid-cols-2 xl:grid xl:grid-cols-4",
              adminView !== "dashboard" && "hidden xl:grid"
            )}
          >
            <SalesMetricCard
              title="Ventas de hoy"
              value={sales.length.toString()}
              detail="Órdenes registradas"
              icon={ReceiptText}
            />
            <SalesMetricCard
              title="Ingresos"
              value={`RD$ ${revenue.toFixed(2)}`}
              detail="Pagadas y entregadas"
              icon={TrendingUp}
            />
            <SalesMetricCard
              title="En proceso"
              value={inProgress.toString()}
              detail="Pendientes o preparando"
              icon={Clock}
            />
            <SalesMetricCard
              title="Venta actual"
              value={`RD$ ${total.toFixed(2)}`}
              detail={`${itemCount} artículos en carrito`}
              icon={ShoppingCart}
            />
          </div>

          <div className="mt-4 grid min-h-0 gap-4 xl:grid-cols-[1fr_380px]">
            <div className="order-2 space-y-4 xl:order-1">
              <div
                className={cn(adminView !== "productos" && "hidden xl:block")}
              >
                <SaleProductsPanel
                  categories={categories}
                  activeCategory={activeCategory}
                  search={search}
                  products={filteredProducts}
                  onCategoryChange={setActiveCategory}
                  onSearchChange={setSearch}
                  onAdd={addToCart}
                />
              </div>

              <div className={cn(adminView !== "ventas" && "hidden xl:block")}>
                <SalesHistoryPanel
                  sales={sales}
                  onSelectSale={setSelectedSale}
                />
              </div>
            </div>

            <div
              className={cn(
                "order-1 xl:order-2",
                adminView !== "cobro" && "hidden xl:block"
              )}
            >
              <SaleCheckoutPanel
                cart={cart}
                customer={customer}
                paymentMethod={paymentMethod}
                productHint={productHint}
                total={total}
                itemCount={itemCount}
                onCustomerChange={setCustomer}
                onPaymentMethodChange={setPaymentMethod}
                onAdd={addToCart}
                onRemoveOne={removeOne}
                onRegister={registerSale}
                onFindProducts={() => setAdminView("productos")}
              />
            </div>
          </div>
        </div>

        <AdminMobileTabs value={adminView} onChange={setAdminView} />
        <SaleDetailSheet
          sale={selectedSale}
          open={selectedSale !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedSale(null)
          }}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
