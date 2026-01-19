'use client';

import { useState, useEffect } from 'react';
import { createClient, updateClient, deleteClient, searchClients, fetchClients } from '@/api/customers';
import { useSync } from '@/hooks/useSync';

interface Customer {
  id: string;
  legalName: string;
  tradeName?: string;
  taxId?: string;
  email?: string;
  phone?: string;
  type?: string;
  notes?: string;
  createdAt?: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Customer>>({});
  const { online, syncing } = useSync();

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setLoading(true);
    try {
      const data = await fetchClients();
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = await searchClients(query);
      setClients(results);
    } else if (query.length === 0) {
      loadClients();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.legalName) {
      alert('El nombre legal es requerido');
      return;
    }

    try {
      if (editingId) {
        await updateClient(editingId, formData);
      } else {
        await createClient(formData);
      }
      setFormData({});
      setEditingId(null);
      setShowForm(false);
      loadClients();
    } catch (error) {
      console.error('Error saving client:', error);
      alert('Error al guardar cliente');
    }
  };

  const handleEdit = (client: Customer) => {
    setFormData(client);
    setEditingId(client.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este cliente?')) {
      try {
        await deleteClient(id);
        loadClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Error al eliminar cliente');
      }
    }
  };

  const handleCancel = () => {
    setFormData({});
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="glass rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-semibold text-white mb-2">Gestión de Clientes</h1>
              <div className="flex gap-4 text-sm">
                <span className={`px-3 py-1 rounded-full ${online ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                  {online ? '🟢 En línea' : '🔴 Sin conexión'}
                </span>
                {syncing && <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">⟳ Sincronizando...</span>}
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="glass px-6 py-3 rounded-full text-white hover:border-emerald-300/60 transition"
            >
              {showForm ? '✕ Cancelar' : '+ Nuevo Cliente'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre legal *"
                  value={formData.legalName || ''}
                  onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                  className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-emerald-300/60"
                  required
                />
                <input
                  type="text"
                  placeholder="Nombre comercial"
                  value={formData.tradeName || ''}
                  onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
                  className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-emerald-300/60"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="CUIT/RFC"
                  value={formData.taxId || ''}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-emerald-300/60"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-emerald-300/60"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-emerald-300/60"
                />
              </div>

              <textarea
                placeholder="Notas"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-emerald-300/60"
                rows={2}
              />

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 glass px-4 py-2 rounded-lg text-white hover:border-emerald-300/60 transition font-semibold"
                >
                  {editingId ? 'Actualizar' : 'Crear'} Cliente
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </header>

        <div className="glass rounded-2xl p-6">
          <input
            type="text"
            placeholder="🔍 Buscar clientes..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-300/60"
          />
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-300">Cargando clientes...</div>
        ) : clients.length === 0 ? (
          <div className="text-center py-12 text-slate-300">No hay clientes registrados</div>
        ) : (
          <div className="grid gap-4">
            {clients.map((client) => (
              <article key={client.id} className="glass rounded-xl p-6 flex justify-between items-start hover:border-emerald-300/40 transition">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{client.legalName}</h3>
                  {client.tradeName && <p className="text-sm text-slate-300">{client.tradeName}</p>}
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400">
                    {client.taxId && <span>🔹 {client.taxId}</span>}
                    {client.email && <span>📧 {client.email}</span>}
                    {client.phone && <span>📱 {client.phone}</span>}
                  </div>
                  {client.notes && <p className="text-sm text-slate-300 mt-2 italic">{client.notes}</p>}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(client)}
                    className="px-3 py-1 rounded text-sm bg-white/10 text-white hover:bg-white/20 transition"
                  >
                    ✎ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="px-3 py-1 rounded text-sm bg-red-500/10 text-red-300 hover:bg-red-500/20 transition"
                  >
                    🗑 Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
