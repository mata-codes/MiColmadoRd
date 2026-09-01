import { useMemo, useState } from "react"

import type { Product } from "../types/product.interface"

export type CartItem = Product & {
  quantity: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [paid, setPaid] = useState(false)

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const price = item.discountPrice ?? item.price
      return sum + price * item.quantity
    }, 0)
    const delivery = subtotal > 0 ? 75 : 0
    const total = subtotal + delivery
    const count = items.reduce((sum, item) => sum + item.quantity, 0)

    return { subtotal, delivery, total, count }
  }, [items])

  const add = (product: Product, quantity = 1) => {
    if (product.stock <= 0) return

    setPaid(false)
    setItems((prev) => {
      const current = prev.find((item) => item.id === product.id)

      if (current) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, item.stock),
              }
            : item
        )
      }

      return [
        ...prev,
        { ...product, quantity: Math.min(quantity, product.stock) },
      ]
    })
  }

  const removeOne = (id: number) => {
    setItems((prev) => {
      const current = prev.find((item) => item.id === id)

      if (current && current.quantity > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      }

      return prev.filter((item) => item.id !== id)
    })
  }

  const remove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const checkout = () => {
    setPaid(true)
    setItems([])
  }

  return {
    items,
    paid,
    totals,
    add,
    removeOne,
    remove,
    checkout,
  }
}
