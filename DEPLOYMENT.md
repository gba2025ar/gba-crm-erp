# Deployment a Railway + Vercel (Gratis)

## Preparación

### 1. Crear cuentas (gratis)
- Railway: https://railway.app (conecta con GitHub)
- Vercel: https://vercel.com (conecta con GitHub)
- GitHub: https://github.com (si no tienes cuenta)

### 2. Subir código a GitHub
Crea un repositorio privado en GitHub y sube el proyecto:

```powershell
cd "C:\Users\gbacl\OneDrive\Desktop\Proyectos sistema\GBA Sistema Gestion"
git init
git add .
git commit -m "Initial commit - GBA CRM ERP"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/gba-crm-erp.git
git push -u origin main
```

## Deploy Backend en Railway

### 1. Crear proyecto
- Entra a https://railway.app/new
- Click "Deploy from GitHub repo"
- Selecciona tu repositorio `gba-crm-erp`
- Railway detectará automáticamente el backend

### 2. Agregar PostgreSQL
- En el proyecto Railway, click "+ New"
- Selecciona "Database" → "PostgreSQL"
- Railway creará la base automáticamente

### 3. Configurar variables de entorno
En el servicio backend → Variables:
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
PORT=3000
NODE_ENV=production
```

### 4. Configurar build
En Settings del servicio backend:
- Root Directory: `backend`
- Build Command: `npm install && npm run build && npx prisma generate`
- Start Command: `npx prisma migrate deploy && npm run start:prod`
- Watch Paths: `backend/**`

### 5. Desplegar
- Railway desplegará automáticamente
- Copia la URL pública (ej: `https://tu-backend.railway.app`)

## Deploy Frontend en Vercel

### 1. Conectar repositorio
- Entra a https://vercel.com/new
- Click "Import Git Repository"
- Selecciona `gba-crm-erp`

### 2. Configurar proyecto
- Framework Preset: `Next.js`
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `.next`

### 3. Agregar variables de entorno
En Project Settings → Environment Variables:
```
NEXT_PUBLIC_API_BASE_URL=https://tu-backend.railway.app/api
```
(Reemplaza con la URL real de Railway)

### 4. Desplegar
- Click "Deploy"
- Vercel construirá y desplegará
- Tu app estará en `https://gba-crm-erp.vercel.app`

## Conectar con tu dominio (opcional)

### Railway (backend API)
1. En Railway → Settings → Domains
2. Agrega custom domain: `api.gbaclimatizacion.com.ar`
3. En DonWeb DNS agrega:
   - Tipo: CNAME
   - Nombre: `api`
   - Valor: `tu-proyecto.railway.app`

### Vercel (frontend)
1. En Vercel → Settings → Domains
2. Agrega: `gbaclimatizacion.com.ar` y `www.gbaclimatizacion.com.ar`
3. En DonWeb DNS agrega:
   - Tipo: A, Nombre: `@`, Valor: `76.76.21.21`
   - Tipo: CNAME, Nombre: `www`, Valor: `cname.vercel-dns.com`

## Verificar funcionamiento
- Backend API: https://tu-backend.railway.app/api
- Swagger docs: https://tu-backend.railway.app/api/docs
- Frontend: https://gba-crm-erp.vercel.app

## Límites gratuitos
- **Railway**: 500 horas/mes, $5 crédito mensual (suficiente para desarrollo)
- **Vercel**: Ilimitado para proyectos personales
- **PostgreSQL Railway**: 1GB almacenamiento

## Próximos pasos después de deployment
1. Implementar modo offline (PWA + sincronización)
2. Agregar autenticación JWT
3. Crear módulos completos (clientes, servicios, inventario)
4. Configurar backups automáticos
