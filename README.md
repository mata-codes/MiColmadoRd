# Syntar

Gestion simple para ventas e inventario.

Aplicacion web para administrar ventas, inventario y operaciones diarias.

## Estructura del proyecto

```
Syntar/
├── frontend/          # Aplicacion web (React + TypeScript + Vite)
└── README.md
```

## Frontend

Construido con **React**, **TypeScript**, **Vite**, **shadcn/ui** y **Tailwind CSS v4**.

### Páginas

| Ruta       | Descripcion                  |
|------------|------------------------------|
| `/login`   | Inicio de sesion             |
| `/register` | Registro de usuario          |
| `/sale`    | Punto de venta (POS)         |
| `/shop`    | Tienda                       |
| `/pro`     | Planes                       |

### Scripts disponibles

```bash
cd frontend
pnpm run dev      # Iniciar servidor de desarrollo
pnpm run build    # Compilar para producción
pnpm run lint     # Ejecutar linter
pnpm run format   # Formatear codigo con Prettier
pnpm run typecheck # Verificar tipos
```

### Tecnologías

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router v7](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/) (iconos)
- [Radix UI](https://www.radix-ui.com/) (primitivas accesibles)
