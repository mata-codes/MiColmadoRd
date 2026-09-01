"use client"

import * as React from "react"
import {
  Boxes,
  Command,
  Home,
  LifeBuoy,
  LogIn,
  ReceiptText,
  Send,
  ShoppingBasket,
  Store,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import { APP_CONFIG } from "@/config/app"
import { ProPlansModal } from "@/features/subscriptions"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type AppSidebarMode = "public" | "admin"

const data = {
  user: {
    name: "Santana",
    email: "santana@syntar.app",
    avatar:
      "https://imgs.search.brave.com/pD-lVXc9jsIF0EZ0LmN1wj1h45RnQ-5g-CYYtkoLNIw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/OTUxLzEzNy9zbWFs/bC9zdHlsaXNoLXNw/ZWN0YWNsZXMtZ3V5/LTNkLWF2YXRhci1j/aGFyYWN0ZXItaWxs/dXN0cmF0aW9ucy1w/bmcucG5n",
  },
  publicSecondary: [
    {
      title: "Soporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  publicNav: [
    {
      title: "Inicio",
      url: "/shop",
      icon: Home,
    },
    {
      title: "Comprar",
      url: "/shop",
      icon: Store,
      items: [
        {
          title: "Catálogo",
          url: "/shop",
        },
        {
          title: "Vista de cliente",
          url: "/shop",
        },
      ],
    },
    {
      title: "Acceso interno",
      url: "/login",
      icon: LogIn,
    },
  ],
  adminNav: [
    {
      title: "Dashboard",
      url: "/sale",
      icon: Home,
    },
    {
      title: "Ventas",
      url: "/sale",
      icon: ReceiptText,
      items: [
        {
          title: "Punto de venta",
          url: "/sale",
        },
        {
          title: "Pago rápido",
          url: "/sale",
        },
      ],
    },
    {
      title: "Tienda pública",
      url: "/shop",
      icon: Store,
    },
  ],
  publicCategories: [
    {
      name: "Alimentos",
      url: "/shop",
      icon: ShoppingBasket,
    },
    {
      name: "Bebidas",
      url: "/shop",
      icon: Boxes,
    },
    {
      name: "Limpieza",
      url: "/shop",
      icon: Boxes,
    },
  ],
}

function withActiveState<T extends { url: string; items?: { url: string }[] }>(
  items: T[],
  pathname: string
) {
  return items.map((item) => ({
    ...item,
    isActive:
      pathname === item.url ||
      item.items?.some((subItem) => pathname === subItem.url),
  }))
}

export function AppSidebar({
  mode = "admin",
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  mode?: AppSidebarMode
}) {
  const location = useLocation()
  const isPublic = mode === "public"
  const navItems = withActiveState(
    isPublic ? data.publicNav : data.adminNav,
    location.pathname
  )

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={isPublic ? "/shop" : "/sale"}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {APP_CONFIG.name}
                  </span>
                  <span className="truncate text-xs">
                    {isPublic ? "Compra y planes" : APP_CONFIG.tagline}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        {isPublic ? <NavProjects projects={data.publicCategories} /> : null}
        <NavSecondary items={data.publicSecondary} className="mt-auto" />
      </SidebarContent>
      {isPublic ? (
        <SidebarFooter>
          <ProPlansModal
            trigger={
              <Button className="w-full" size="lg">
                Ver planes Pro
              </Button>
            }
          />
        </SidebarFooter>
      ) : (
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
