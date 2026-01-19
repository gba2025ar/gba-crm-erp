# Desarrollo Local - Encapsulado en tu PC

## Setup Inicial (ya completado)
- Backend NestJS corriendo en `http://localhost:3000/api`
- Frontend Next.js corriendo en `http://localhost:3001`
- PostgreSQL 18 en `localhost:5432`
- Código en GitHub: `gba2025ar/gba-crm-erp`

## Acceso desde otros dispositivos (WiFi local)

### Desde otra PC, tablet o celular en la misma WiFi:
1. Ve al navegador
2. Accede a: `http://192.168.1.38:3001`
   - Reemplaza `192.168.1.38` con tu IP si es diferente

### Verificar tu IP local:
En PowerShell:
```powershell
ipconfig
# Busca "IPv4 Address" en tu adaptador WiFi
```

## Iniciar servidor completo

### Terminal 1 - Backend:
```powershell
cd "C:\Users\gbacl\OneDrive\Desktop\Proyectos sistema\GBA Sistema Gestion\backend"
npm run start:dev
```

### Terminal 2 - Frontend:
```powershell
cd "C:\Users\gbacl\OneDrive\Desktop\Proyectos sistema\GBA Sistema Gestion\frontend"
npm run dev
```

### Terminal 3 - PostgreSQL (si no está corriendo como servicio):
```powershell
docker compose up db
# o si PostgreSQL está instalado como servicio, verifica que esté corriendo
```

## Endpoints disponibles
- **API**: `http://localhost:3000/api`
- **Swagger**: `http://localhost:3000/api/docs`
- **Menús**: `http://localhost:3000/api/menus`
- **Health**: `http://localhost:3000/api/health`
- **Frontend local**: `http://localhost:3001`
- **Frontend red local**: `http://192.168.1.38:3001`

## PWA Offline (próximo paso)
- Frontend instalable en todos los dispositivos
- Funciona sin internet
- Sincroniza automáticamente cuando hay conexión
- Base de datos local (IndexedDB)

## Migraciones y desarrollo
```powershell
cd backend
npm run prisma:migrate:dev -- --name nombre_migracion
npm run prisma:studio  # Visualizar BD gráficamente
npm run build
npm run lint
npm run test
```

## Control de versiones
```powershell
git add .
git commit -m "Mensaje descriptivo"
git push origin main  # Subir cambios a GitHub
git pull origin main  # Descargar cambios
```

## Próximos pasos
1. ✅ Servidor local funcionando
2. ⏳ Implementar PWA offline
3. ⏳ Agregar autenticación JWT + roles
4. ⏳ Módulos CRUD (Clientes, Servicios, Inventario)
5. ⏳ Sincronización offline
6. ⏳ Cuando sea necesario: Migrar a VPS DonWeb
