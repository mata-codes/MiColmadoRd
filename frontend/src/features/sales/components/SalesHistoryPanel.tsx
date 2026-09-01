import { Eye, ReceiptText } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { Sale, SaleStatus } from "../types/sale"

export function SalesHistoryPanel({
  sales,
  onSelectSale,
}: {
  sales: Sale[]
  onSelectSale: (sale: Sale) => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Seguimiento de ventas</CardTitle>
          <ReceiptText className="size-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="grid gap-3 rounded-lg border bg-background p-3 sm:grid-cols-[1fr_auto] md:grid-cols-[120px_1fr_120px_120px_40px] md:items-center"
            >
              <div>
                <p className="text-sm font-semibold">{sale.id}</p>
                <p className="text-xs text-muted-foreground">{sale.hora}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{sale.cliente}</p>
                <p className="text-xs text-muted-foreground">
                  {sale.articulos} artículos
                </p>
              </div>
              <Badge
                variant={statusVariant(sale.estado)}
                className="justify-self-start sm:justify-self-end md:justify-self-start"
              >
                {sale.estado}
              </Badge>
              <div>
                <p className="text-sm text-muted-foreground">{sale.metodo}</p>
                <p className="text-sm font-bold">RD$ {sale.total.toFixed(2)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Ver detalle de ${sale.id}`}
                onClick={() => onSelectSale(sale)}
              >
                <Eye />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function statusVariant(status: SaleStatus) {
  if (status === "Pagada" || status === "Entregada") return "default"
  if (status === "Preparando") return "secondary"
  return "outline"
}
