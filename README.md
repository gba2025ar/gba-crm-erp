# GBA CRM-ERP

Stack elegido:
- Backend: NestJS 11 (TypeScript) + Prisma + PostgreSQL
- Frontend: Next.js 16 (React, TypeScript) + Tailwind CSS
- Infra local: Docker Compose para la base de datos PostgreSQL

## Requisitos previos
1. Node.js 20+ y npm
2. Docker Desktop (para levantar PostgreSQL)
3. PowerShell o terminal equivalente

## Puesta en marcha (paso a paso)
1. Clonar/abrir este directorio en VS Code (ya estás aquí).
2. Levantar base de datos (una sola vez):
   ```powershell
   cd "."; docker compose up -d db
   ```
3. Backend (API):
   ```powershell
   cd ".\backend"
   copy .env.example .env   # o crea .env con la cadena de conexión
   npm install
   npm run prisma:migrate:dev -- --name init   # crea tablas
   npm run start:dev
   ```
   - API base: http://localhost:3000/api
   - Swagger: http://localhost:3000/api/docs
4. Frontend (web):
   ```powershell
   cd ".\frontend"
   npm install
   npm run dev
   ```
   - App web: http://localhost:3001 (se sugiere cambiar el puerto usando NEXT_PUBLIC_PORT si hace falta)

## Variables de entorno
Backend (`backend/.env`):
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gba_crm"
PORT=3000
```
Frontend (`frontend/.env.local`, opcional):
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## Scripts útiles (backend)
- `npm run start:dev`: servidor en modo watch
- `npm run prisma:migrate:dev -- --name <nombre>`: crear migraciones
- `npm run prisma:studio`: abrir Prisma Studio

## Endpoints iniciales
- `GET /api` → info de la app y conteo de menús
- `GET /api/health` → estado básico
- `GET /api/menus` → estructura de menús solicitada
- `GET /api/docs` → documentación interactiva Swagger

## Próximos pasos sugeridos
- Agregar autenticación (JWT + roles) y seguridad de rutas
- Definir casos de uso por módulo (Servicios, Directorio, Gestión, etc.)
- Añadir seed de datos mínimos (roles, usuario admin, catálogos)
- Añadir CI (GitHub Actions) y linters en ambos proyectos
