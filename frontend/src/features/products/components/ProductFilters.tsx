import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type SortOption = "featured" | "price-asc" | "price-desc" | "stock"

export function ProductFilters({
  search,
  onSearchChange,
  categories,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  onlyOffers,
  onOnlyOffersChange,
}: {
  search: string
  onSearchChange: (value: string) => void
  categories: string[]
  category: string
  onCategoryChange: (value: string) => void
  sort: SortOption
  onSortChange: (value: SortOption) => void
  onlyOffers: boolean
  onOnlyOffersChange: (value: boolean) => void
}) {
  return (
    <section className="space-y-3" aria-label="Filtros de productos">
      <Input
        aria-label="Buscar productos"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar arroz, jugo, limpieza..."
        className="h-11"
      />

      <div
        role="tablist"
        aria-label="Filtrar productos por categoría"
        className="flex gap-2 overflow-x-auto pb-1"
      >
        {categories.map((item) => (
          <Button
            key={item}
            role="tab"
            aria-selected={category === item}
            variant={category === item ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(item)}
            className="h-9 rounded-full px-3"
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-2">
        <label className="flex h-10 items-center gap-2 rounded-lg border bg-card px-3 text-sm">
          <SlidersHorizontal className="size-4 text-muted-foreground" />
          <select
            aria-label="Ordenar productos"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="min-w-0 flex-1 bg-transparent outline-none"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="stock">Más disponibles</option>
          </select>
        </label>

        <button
          type="button"
          aria-pressed={onlyOffers}
          onClick={() => onOnlyOffersChange(!onlyOffers)}
          className="h-10 rounded-lg border bg-card px-3 text-sm font-medium transition-colors aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
        >
          Ofertas
        </button>
      </div>
    </section>
  )
}
