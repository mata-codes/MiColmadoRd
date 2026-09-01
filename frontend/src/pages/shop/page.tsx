import { useMemo, useState } from "react"
import { Crown, Search, ShoppingCart } from "lucide-react"

import { MobileBottomNav } from "@/components/navigation/MobileBottomNav"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { APP_CONFIG } from "@/config/app"
import {
  CartDrawer,
  CartSummary,
  ProductCard,
  ProductDetailSheet,
  ProductFilters,
  useCart,
  useProducts,
  type Product,
  type SortOption,
} from "@/features/products"
import { ProPlansModal } from "@/features/subscriptions"
import {
  ALL_CATEGORIES_LABEL,
  getCategoryOptions,
  matchesCategory,
  normalizeCatalogText,
} from "@/lib/catalog"

export default function ShopPage() {
  return (
    <SidebarProvider>
      <AppSidebar mode="public" />
      <ShopContent />
    </SidebarProvider>
  )
}

function ShopContent() {
  const { setOpenMobile } = useSidebar()
  const { products } = useProducts()
  const cart = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState(ALL_CATEGORIES_LABEL)
  const [sort, setSort] = useState<SortOption>("featured")
  const [onlyOffers, setOnlyOffers] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta")

  const categories = useMemo(() => getCategoryOptions(products), [products])

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const searchText = normalizeCatalogText(
          `${product.name} ${product.brand} ${product.category}`
        )
        const matchSearch = searchText.includes(normalizeCatalogText(search))
        const matchCategory = matchesCategory(category, product.category)
        const matchOffer = !onlyOffers || product.discountPrice !== undefined

        return matchSearch && matchCategory && matchOffer
      })
      .sort((a, b) => {
        if (sort === "price-asc") {
          return (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)
        }

        if (sort === "price-desc") {
          return (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)
        }

        if (sort === "stock") {
          return b.stock - a.stock
        }

        return Number(b.featured) - Number(a.featured)
      })
  }, [category, onlyOffers, products, search, sort])

  const cartSummary = (
    <CartSummary
      cart={cart.items}
      paid={cart.paid}
      paymentMethod={paymentMethod}
      onPaymentMethodChange={setPaymentMethod}
      onAdd={(product) => cart.add(product)}
      onRemoveOne={cart.removeOne}
      onRemove={cart.remove}
      onCheckout={cart.checkout}
    />
  )

  return (
    <SidebarInset>
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="flex min-h-16 items-center justify-between gap-2 px-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="-ml-1" aria-label="Abrir menu" />
            <Separator
              orientation="vertical"
              className="hidden data-[orientation=vertical]:h-4 sm:block"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {APP_CONFIG.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Tienda móvil
              </p>
            </div>
          </div>

          <CartDrawer
            count={cart.totals.count}
            open={cartOpen}
            onOpenChange={setCartOpen}
          >
            {cartSummary}
          </CartDrawer>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <main className="min-w-0 flex-1 overflow-auto p-3 pb-24 sm:p-4 lg:pb-4">
          <section className="mb-4 grid gap-3 rounded-lg border bg-card p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <Badge variant="secondary" className="mb-3">
                Compra rápida
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Todo para tu colmado, a mano
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Busca, filtra, revisa detalles y arma tu carrito desde el
                celular sin perder tiempo.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 md:w-72 md:grid-cols-1">
              <ProPlansModal
                trigger={
                  <Button variant="outline" className="h-10">
                    <Crown />
                    Planes Pro
                  </Button>
                }
              />
              <Button className="h-10" onClick={() => setCartOpen(true)}>
                <ShoppingCart />
                RD$ {cart.totals.total.toFixed(2)}
              </Button>
            </div>
          </section>

          <div className="sticky top-[4.5rem] z-10 mb-4 space-y-3 bg-background/95 py-2 backdrop-blur">
            <div className="relative md:hidden">
              <Search className="absolute top-3 left-3 size-4 text-muted-foreground" />
              <div className="[&_input]:pl-9">
                <ProductFilters
                  search={search}
                  onSearchChange={setSearch}
                  categories={categories}
                  category={category}
                  onCategoryChange={setCategory}
                  sort={sort}
                  onSortChange={setSort}
                  onlyOffers={onlyOffers}
                  onOnlyOffersChange={setOnlyOffers}
                />
              </div>
            </div>
            <div className="hidden md:block">
              <ProductFilters
                search={search}
                onSearchChange={setSearch}
                categories={categories}
                category={category}
                onCategoryChange={setCategory}
                sort={sort}
                onSortChange={setSort}
                onlyOffers={onlyOffers}
                onOnlyOffersChange={setOnlyOffers}
              />
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={
                    cart.items.find((item) => item.id === product.id)
                      ?.quantity ?? 0
                  }
                  onAddToCart={(item) => cart.add(item)}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="font-medium">No encontramos productos</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Prueba con otra búsqueda o cambia los filtros.
              </p>
            </div>
          )}
        </main>

        <aside className="hidden w-96 border-l bg-card lg:block">
          {cartSummary}
        </aside>
      </div>

      <MobileBottomNav
        cartCount={cart.totals.count}
        onMenu={() => setOpenMobile(true)}
        onCart={() => setCartOpen(true)}
      />

      <ProductDetailSheet
        product={selectedProduct}
        open={selectedProduct !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null)
        }}
        onAddToCart={cart.add}
      />
    </SidebarInset>
  )
}
