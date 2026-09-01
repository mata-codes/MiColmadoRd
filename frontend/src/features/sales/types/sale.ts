export type SaleStatus = "Pagada" | "Pendiente" | "Preparando" | "Entregada"
export type PaymentMethod = "Efectivo" | "Tarjeta" | "Transferencia"
export type AdminView = "dashboard" | "cobro" | "productos" | "ventas"

export type Sale = {
  id: string
  cliente: string
  estado: SaleStatus
  metodo: PaymentMethod
  total: number
  articulos: number
  hora: string
}
