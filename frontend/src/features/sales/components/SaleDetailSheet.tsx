import { ReceiptText } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

import type { Sale } from "../types/sale"

export function SaleDetailSheet({
  sale,
  open,
  onOpenChange,
}: {
  sale: Sale | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!sale) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="p-0 sm:right-0 sm:left-auto sm:h-full sm:w-96"
      >
        <SheetHeader className="border-b">
          <Badge variant="secondary" className="mb-2 w-fit">
            <ReceiptText />
            Recibo
          </Badge>
          <SheetTitle>{sale.id}</SheetTitle>
          <SheetDescription>
            Venta registrada a las {sale.hora} para {sale.cliente}.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-3 p-4 text-sm">
          <Row label="Estado" value={sale.estado} />
          <Row label="Método" value={sale.metodo} />
          <Row label="Artículos" value={sale.articulos.toString()} />
          <Separator />
          <div className="flex items-center justify-between text-base font-bold">
            <span>Total</span>
            <span>RD$ {sale.total.toFixed(2)}</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
