const menuSections = [
  {
    title: "Sistema",
    items: [
      "Servicios",
      "Servicios Agrupados por lotes",
      "Tareas programadas",
      "Gestión de proyectos",
      "Inventario de repuestos",
      "Repuestos utilizados",
      "Despiece y reciclaje",
      "Infraestructura y activos físicos",
      "Equipos para alquilar",
      "Contratos de alquiler",
      "Contratos de mantenimiento",
      "Venta y facturación",
      "Asignación de herramientas",
    ],
  },
  {
    title: "Directorio",
    items: [
      "Clientes",
      "Empresas",
      "Contactos",
      "Técnicos",
      "Empleados",
      "Coordinadores",
      "Casa vendedoras",
      "Compañías de garantías",
      "Compañía aseguradoras",
      "Proveedores",
      "Socios propietarios",
      "Flota de vehículos",
      "Logística transportista",
      "Reuniones programadas",
      "Notas / Eventos",
    ],
  },
  {
    title: "Archivos",
    items: [
      "Marcas",
      "Modelos",
      "Manuales de servicio",
      "Fallas de componentes",
      "Departamentos de la empresa",
      "Cargos y roles",
      "Tipos de servicios",
      "Tipos de accesorios",
      "Tipos de especificaciones",
      "Tipos de controles",
      "Modelos de contratos",
      "Planes de mantenimiento",
      "Detalles a chequear",
      "Grupos de componentes",
      "Depósitos",
      "Patrones de calibración",
      "Estados de las reparaciones",
      "Estados para los alquileres",
      "Estados para los proyectos",
      "Condiciones y modalidades de servicio",
      "Almacenamiento de archivos",
      "Ciudades y localidades",
      "Provincias / Estados / Departamentos",
    ],
  },
  {
    title: "Gestión",
    items: [
      "Movimiento de caja",
      "Cajas habilitadas",
      "Conceptos de caja",
      "Liquidaciones",
      "Pagos a proveedores",
      "Condiciones de IVA",
      "Tasas de IVA",
      "Puntos de venta",
      "Formas de pago",
      "Vencimientos de pago",
      "Unidades monetarias y paridad",
      "Tipos de comprobantes",
      "Tipos de impuestos",
      "Tipos de transacciones",
      "Cuentas bancarias",
      "Pedidos / Requerimientos",
      "Órdenes de compra",
      "Comprobantes de compras realizadas",
      "Remitos",
    ],
  },
  {
    title: "Herramientas",
    items: [
      "Panel de control",
      "Gráficos estadísticos",
      "IA técnico especialista",
      "Prioridades según IA",
      "Noticias y sugerencias",
      "Editor de esquemas y diagramas",
    ],
  },
  {
    title: "Configuración",
    items: ["Cuentas de usuarios", "Perfiles de usuarios"],
  },
];

const quickActions = [
  { label: "Crear servicio programado", href: "#" },
  { label: "Alta de cliente", href: "/customers" },
  { label: "Registrar repuesto usado", href: "#" },
  { label: "Lanzar proyecto", href: "#" },
  { label: "Configurar permisos", href: "#" },
];

const highlights = [
  { label: "Operación", value: "Activo", tone: "text-emerald-300" },
  { label: "Seguridad", value: "Roles en revisión", tone: "text-amber-300" },
  { label: "IA", value: "Habilitada", tone: "text-sky-300" },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full grid-lines">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-8">
        <header className="glass rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-emerald-200/80">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">GBA CRM-ERP</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Panel inicial</span>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-semibold text-white">Tu suite integral de gestión</h1>
            <p className="text-slate-300 max-w-3xl leading-relaxed">
              Navega las áreas clave del CRM/ERP: operaciones, directorio, catálogos, gestión financiera, herramientas e IA. Empieza con las acciones rápidas y asigna responsables.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="glass rounded-full px-4 py-2 text-sm text-white hover:border-emerald-300/60 hover:shadow-[0_0_0_1px_rgba(142,243,197,0.35)] transition"
              >
                {action.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            {highlights.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-slate-400 uppercase text-[11px] tracking-wide">{item.label}</span>
                <span className={`${item.tone} font-semibold`}>{item.value}</span>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {menuSections.map((section) => (
            <article key={section.title} className="glass rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                <span className="text-xs text-slate-400">{section.items.length} opciones</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm text-slate-200/90 bg-white/5 border border-white/10 rounded-full px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
