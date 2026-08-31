import { Navigate, Route, Routes } from "react-router-dom"

import LoginPage from "@/pages/login/page"
import ProPage from "@/pages/pro/page"
import ShopPage from "@/pages/shop/page"
import RegisterPage from "@/pages/signup/page"
import SalesDashboard from "@/pages/venta/sales-dashboard"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/sale" element={<SalesDashboard />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/pro" element={<ProPage />} />
      <Route path="*" element={<h1>404 - Pagina no encontrada</h1>} />
    </Routes>
  )
}
