'use client';

import Link from 'next/link';
import { MENU_STRUCTURE } from '@/lib/menu-structure';

const sectionIcons = {
  sistema: '⚙️',
  directorio: '📋',
  archivos: '📁',
  gestion: '💰',
  herramientas: '🛠️',
  configuracion: '⚡',
};

const sectionColors = {
  sistema: { bg: 'from-blue-500/20 to-blue-500/10', border: 'border-blue-500/30', hover: 'hover:border-blue-400' },
  directorio: { bg: 'from-emerald-500/20 to-emerald-500/10', border: 'border-emerald-500/30', hover: 'hover:border-emerald-400' },
  archivos: { bg: 'from-purple-500/20 to-purple-500/10', border: 'border-purple-500/30', hover: 'hover:border-purple-400' },
  gestion: { bg: 'from-amber-500/20 to-amber-500/10', border: 'border-amber-500/30', hover: 'hover:border-amber-400' },
  herramientas: { bg: 'from-pink-500/20 to-pink-500/10', border: 'border-pink-500/30', hover: 'hover:border-pink-400' },
  configuracion: { bg: 'from-sky-500/20 to-sky-500/10', border: 'border-sky-500/30', hover: 'hover:border-sky-400' },
};

const sectionTextColors = {
  sistema: 'text-blue-300',
  directorio: 'text-emerald-300',
  archivos: 'text-purple-300',
  gestion: 'text-amber-300',
  herramientas: 'text-pink-300',
  configuracion: 'text-sky-300',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5"></div>
        <div className="relative px-6 py-16 sm:px-12 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 mb-4 rounded-full bg-white/5 border border-white/10">
                <span className="text-xs uppercase tracking-widest text-emerald-300">Bienvenido</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                GBA <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">CRM-ERP</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Tu sistema integral de gestión empresarial. Operaciones, directorio, finanzas y más, todo en un solo lugar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Grid */}
      <div className="px-6 py-12 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(MENU_STRUCTURE).map(([key, section]) => {
            const colors = sectionColors[key as keyof typeof sectionColors];
            const textColor = sectionTextColors[key as keyof typeof sectionTextColors];
            const icon = sectionIcons[key as keyof typeof sectionIcons];

            return (
              <Link
                key={key}
                href={section.items[0]?.href || '#'}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${colors.border} ${colors.hover} backdrop-blur-xl`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`}></div>

                {/* Content */}
                <div className="relative p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-4xl mb-3">{icon}</div>
                    <h3 className={`text-2xl font-bold ${textColor} mb-2 group-hover:brightness-110 transition`}>
                      {section.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-4">
                      {section.items.length} opciones disponibles
                    </p>
                  </div>

                  {/* Preview Items */}
                  <div className="space-y-2">
                    {section.items.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                        <span className="text-slate-500">→</span>
                        <span className="line-clamp-1">{item.name}</span>
                      </div>
                    ))}
                    {section.items.length > 2 && (
                      <div className="text-xs text-slate-500 italic pt-1">
                        +{section.items.length - 2} opciones más
                      </div>
                    )}
                  </div>

                  {/* Arrow Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                    <span className={`text-2xl ${textColor}`}>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Access Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Acceso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/directorio/clientes"
              className="group glass rounded-xl p-6 border border-emerald-500/20 hover:border-emerald-400/50 transition flex items-center gap-4"
            >
              <div className="text-4xl group-hover:scale-110 transition">👥</div>
              <div>
                <h4 className="text-white font-semibold group-hover:text-emerald-300 transition">Clientes</h4>
                <p className="text-xs text-slate-400">Gestión de clientes</p>
              </div>
            </Link>

            <Link
              href="/sistema/servicios"
              className="group glass rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/50 transition flex items-center gap-4"
            >
              <div className="text-4xl group-hover:scale-110 transition">🔧</div>
              <div>
                <h4 className="text-white font-semibold group-hover:text-blue-300 transition">Servicios</h4>
                <p className="text-xs text-slate-400">Órdenes de servicio</p>
              </div>
            </Link>

            <Link
              href="/gestion/caja"
              className="group glass rounded-xl p-6 border border-amber-500/20 hover:border-amber-400/50 transition flex items-center gap-4"
            >
              <div className="text-4xl group-hover:scale-110 transition">💰</div>
              <div>
                <h4 className="text-white font-semibold group-hover:text-amber-300 transition">Caja</h4>
                <p className="text-xs text-slate-400">Movimiento de caja</p>
              </div>
            </Link>

            <Link
              href="/sistema/inventario"
              className="group glass rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition flex items-center gap-4"
            >
              <div className="text-4xl group-hover:scale-110 transition">📦</div>
              <div>
                <h4 className="text-white font-semibold group-hover:text-purple-300 transition">Inventario</h4>
                <p className="text-xs text-slate-400">Repuestos y stock</p>
              </div>
            </Link>

            <Link
              href="/directorio/empleados"
              className="group glass rounded-xl p-6 border border-pink-500/20 hover:border-pink-400/50 transition flex items-center gap-4"
            >
              <div className="text-4xl group-hover:scale-110 transition">👔</div>
              <div>
                <h4 className="text-white font-semibold group-hover:text-pink-300 transition">Empleados</h4>
                <p className="text-xs text-slate-400">Directorio de personal</p>
              </div>
            </Link>

            <Link
              href="/configuracion/usuarios"
              className="group glass rounded-xl p-6 border border-sky-500/20 hover:border-sky-400/50 transition flex items-center gap-4"
            >
              <div className="text-4xl group-hover:scale-110 transition">⚙️</div>
              <div>
                <h4 className="text-white font-semibold group-hover:text-sky-300 transition">Configuración</h4>
                <p className="text-xs text-slate-400">Usuarios y permisos</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">🟢</div>
            <h4 className="text-white font-semibold mb-1">Estado del Sistema</h4>
            <p className="text-emerald-300 text-sm">Operativo y disponible</p>
          </div>

          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">📊</div>
            <h4 className="text-white font-semibold mb-1">Módulos</h4>
            <p className="text-sky-300 text-sm">6 secciones principales</p>
          </div>

          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">🚀</div>
            <h4 className="text-white font-semibold mb-1">Versión</h4>
            <p className="text-amber-300 text-sm">v0.1.0 Local - Desarrollo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
