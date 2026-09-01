import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import type { Product } from "../types/product.interface"

interface Props {
  product: Product
  quantity?: number
  onAddToCart?: (product: Product) => void
  onViewDetails?: (product: Product) => void
}

export function ProductCard({
  product,
  quantity = 0,
  onAddToCart,
  onViewDetails,
}: Props) {
  const price = product.discountPrice ?? product.price
  const hasDiscount = product.discountPrice !== undefined
  const isOutOfStock = product.stock <= 0

  return (
    <Card className="relative mx-auto grid w-full grid-cols-[108px_1fr] overflow-hidden p-0 sm:block">
      <button
        type="button"
        className="text-left"
        onClick={() => onViewDetails?.(product)}
        aria-label={`Ver detalles de ${product.name}`}
      >
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          className="h-full min-h-36 w-full object-cover sm:aspect-video sm:h-auto"
        />
      </button>
      <div className="flex min-w-0 flex-col">
        <CardHeader className="gap-2 p-3 pb-2 sm:p-4 sm:pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <button
                type="button"
                className="line-clamp-2 text-left text-sm font-medium hover:underline sm:text-base"
                onClick={() => onViewDetails?.(product)}
              >
                {product.name}
              </button>
              <CardDescription className="mt-1 line-clamp-2 text-xs sm:text-sm">
                {product.description}
              </CardDescription>
            </div>
            <CardAction className="static">
              <Badge variant={hasDiscount ? "default" : "secondary"}>
                RD$ {price.toFixed(2)}
              </Badge>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-3 px-3 pb-2 text-xs text-muted-foreground sm:px-4">
          <span className="truncate">{product.brand}</span>
          <span className={isOutOfStock ? "text-destructive" : ""}>
            {isOutOfStock ? "Agotado" : `${product.stock} disp.`}
          </span>
        </CardContent>
        <CardFooter className="mt-auto p-3 pt-0 sm:p-4 sm:pt-0">
          <Button
            className="h-9 w-full"
            disabled={isOutOfStock}
            aria-label={`Agregar ${product.name} al carrito`}
            onClick={() => onAddToCart?.(product)}
          >
            {isOutOfStock
              ? "No disponible"
              : quantity > 0
                ? `Agregar (${quantity})`
                : "Agregar"}
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
