'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MENU_STRUCTURE } from '@/lib/menu-structure';

export function Sidebar() {
  const [expanded, setExpanded] = useState<string | null>('directorio');

  return (
    <aside className="w-64 glass rounded-2xl p-4 h-screen overflow-y-auto flex flex-col gap-4">
      <div className="px-2 py-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-emerald-300">GBA CRM-ERP</h2>
        <p className="text-xs text-slate-400">v0.1.0 Local</p>
      </div>

      <nav className="flex-1 space-y-2">
        {Object.entries(MENU_STRUCTURE).map(([key, section]) => (
          <div key={key}>
            <button
              onClick={() => setExpanded(expanded === key ? null : key)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition text-left text-white/80 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <span>{section.icon}</span>
                <span className="font-semibold text-sm">{section.title}</span>
              </span>
              <span className={`transition ${expanded === key ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {expanded === key && (
              <div className="pl-2 space-y-1 mt-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-sm rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 pt-4 text-xs text-slate-500">
        <p>© 2026 GBA Climatización</p>
      </div>
    </aside>
  );
}
