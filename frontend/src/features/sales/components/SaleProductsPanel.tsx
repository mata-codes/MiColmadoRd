import { Package, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import type { SaleProduct } from "../types/sale-product"

export function SaleProductsPanel({
  categories,
  activeCategory,
  search,
  products,
  onCategoryChange,
  onSearchChange,
  onAdd,
}: {
  categories: string[]
  activeCategory: string
  search: string
  products: SaleProduct[]
  onCategoryChange: (value: string) => void
  onSearchChange: (value: string) => void
  onAdd: (product: SaleProduct) => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Productos</CardTitle>
          <Badge variant="outline">POS</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            aria-label="Buscar productos para registrar una venta"
            placeholder="Buscar producto..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-10 pl-9"
          />
        </div>

        <div
          role="tablist"
          aria-label="Filtrar productos del punto de venta"
          className="flex gap-2 overflow-x-auto pb-1"
        >
          {categories.map((category) => (
            <Button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className="h-9 rounded-full px-3"
            >
              {category}
            </Button>
          ))}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <button
                key={product.id}
                type="button"
                aria-label={`Agregar ${product.name} a la venta`}
                onClick={() => onAdd(product)}
                className="flex min-h-32 flex-col justify-between rounded-lg border bg-background p-3 text-left transition-all hover:border-primary hover:shadow-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                    <Package className="size-4" />
                  </div>
                  <Badge variant="secondary">
                    RD$ {product.price.toFixed(2)}
                  </Badge>
                </div>
                <div>
                  <p className="line-clamp-2 text-sm font-medium">
                    {product.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {product.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <p className="text-sm font-medium">
              No hay productos para este filtro
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Cambia la búsqueda o selecciona otra categoría.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
