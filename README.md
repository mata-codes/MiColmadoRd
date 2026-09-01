# Syntar

Syntar es una aplicacion web open source para gestionar ventas, inventario, flujo de compra y operaciones diarias de un negocio desde una interfaz moderna hecha con React.

El proyecto esta enfocado actualmente en el frontend: autenticacion, tienda, carrito, punto de venta, resumen de ventas, seleccion de metodo de pago y planes de membresia.

## Caracteristicas

- Dashboard de punto de venta para registrar ventas.
- Catalogo de productos con flujo de carrito.
- Resumen de ventas, ingresos y ordenes en proceso.
- Pantallas de inicio de sesion y registro.
- Navegacion lateral responsive.
- Vista de planes Free, Pro y Enterprise.
- Configuracion centralizada de marca.
- Organizacion por features para facilitar el crecimiento del proyecto.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui
- Radix UI
- Lucide React
- React Router
- pnpm

## Estructura Del Proyecto

```text
Syntar/
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/       # Componentes compartidos y UI
|   |   |-- config/           # Configuracion global de la app
|   |   |-- features/         # Modulos por dominio
|   |   |   |-- auth/
|   |   |   |-- products/
|   |   |   `-- sales/
|   |   |-- hooks/
|   |   |-- lib/
|   |   |-- pages/
|   |   |-- routes/
|   |   |-- App.tsx
|   |   `-- main.tsx
|   |-- Dockerfile
|   |-- package.json
|   `-- pnpm-lock.yaml
|-- LICENSE
`-- README.md
```

## Requisitos

- Node.js 22 o superior
- pnpm

## Instalacion

```bash
cd frontend
pnpm install
```

## Desarrollo

```bash
pnpm run dev
```

Vite mostrara la URL local para abrir la aplicacion en el navegador.

## Build De Produccion

```bash
pnpm run build
```

## Preview Del Build

```bash
pnpm run preview
```

## Scripts Disponibles

Ejecutar desde la carpeta `frontend`.

| Comando | Descripcion |
| --- | --- |
| `pnpm run dev` | Inicia el servidor de desarrollo. |
| `pnpm run build` | Verifica tipos y genera el build de produccion. |
| `pnpm run preview` | Ejecuta una vista previa del build. |
| `pnpm run lint` | Ejecuta ESLint. |
| `pnpm run format` | Formatea archivos TypeScript y TSX con Prettier. |
| `pnpm run typecheck` | Ejecuta TypeScript sin generar archivos. |

## Rutas

| Ruta | Descripcion |
| --- | --- |
| `/login` | Inicio de sesion. |
| `/register` | Registro de usuario. |
| `/sale` | Dashboard de punto de venta. |
| `/shop` | Tienda y carrito. |
| `/pro` | Planes y membresias. |

## Docker

El frontend incluye un Dockerfile para ejecutar la aplicacion en un contenedor.

```bash
cd frontend
docker build -t syntar-frontend .
docker run --rm -p 5173:5173 syntar-frontend
```

## Contribuir

Syntar es open source y las contribuciones son bienvenidas.

1. Haz un fork del repositorio.
2. Crea una rama para tu cambio.
3. Manten los cambios enfocados y faciles de revisar.
4. Ejecuta formato y build antes de abrir un pull request.
5. Abre un pull request con una descripcion clara del cambio.

Checks recomendados:

```bash
cd frontend
pnpm run format
pnpm run build
```

## Roadmap

- Persistencia real de inventario.
- Autenticacion y sesiones de usuario.
- Integracion con API backend.
- CRUD de productos.
- Reportes y analiticas de ventas.
- Roles y permisos.
- Pruebas automatizadas para flujos criticos.

## Licencia

Este proyecto esta disponible como software open source bajo la licencia MIT.

Consulta el archivo [LICENSE](LICENSE) para mas informacion.
