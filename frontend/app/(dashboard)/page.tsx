'use client';

import Link from 'next/link';

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <header className="glass rounded-3xl p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-semibold text-white mb-2">Panel de Control</h1>
            <p className="text-slate-300">Bienvenido al sistema de gestión integral GBA CRM-ERP</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <article className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">📋 Clientes</h3>
          <p className="text-sm text-slate-300 mb-4">Gestión de clientes y contactos</p>
          <Link href="/directorio/clientes" className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm hover:bg-emerald-500/30 transition">
            Ir a Clientes →
          </Link>
        </article>

        <article className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">⚙️ Servicios</h3>
          <p className="text-sm text-slate-300 mb-4">Ordenes de servicio y tareas</p>
          <Link href="/sistema/servicios" className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm hover:bg-blue-500/30 transition">
            Ir a Servicios →
          </Link>
        </article>

        <article className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">💰 Gestión</h3>
          <p className="text-sm text-slate-300 mb-4">Caja, pagos y facturación</p>
          <Link href="/gestion/caja" className="inline-block px-4 py-2 bg-amber-500/20 text-amber-300 rounded-lg text-sm hover:bg-amber-500/30 transition">
            Ir a Gestión →
          </Link>
        </article>
      </div>
    </div>
  );
}
