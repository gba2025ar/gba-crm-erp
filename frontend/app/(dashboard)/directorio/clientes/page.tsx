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

export default function ClientesPage() {
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
    <div className="space-y-6">
      {/* Header */}
      <header className="glass rounded-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-white">Gestión de Clientes</h1>
            <p className="text-slate-300 text-sm mt-1">Directorio • Clientes</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg font-medium hover:bg-emerald-500/30 transition"
          >
            ➕ Nuevo Cliente
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className={`flex items-center gap-2 ${online ? 'text-emerald-300' : 'text-orange-300'}`}>
            <span className={`inline-block w-2 h-2 rounded-full ${online ? 'bg-emerald-400' : 'bg-orange-400'}`}></span>
            {online ? '🟢 En línea' : '🔴 Sin conexión'}
          </span>
          {syncing && <span className="text-sky-300">🔄 Sincronizando...</span>}
          <span className="text-slate-400">{clients.length} clientes</span>
        </div>
      </header>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 max-w-2xl w-full space-y-4"
          >
            <h2 className="text-xl font-semibold text-white">
              {editingId ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Nombre Legal *</label>
                <input
                  type="text"
                  value={formData.legalName || ''}
                  onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Empresa S.A."
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Nombre Comercial</label>
                <input
                  type="text"
                  value={formData.tradeName || ''}
                  onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Nombre comercial"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">CUIT</label>
                <input
                  type="text"
                  value={formData.taxId || ''}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="30-12345678-9"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="contacto@empresa.com"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm text-slate-300 mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="+54 11 2345-6789"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm text-slate-300 mb-1">Notas</label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
                  placeholder="Información adicional..."
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500/30 text-emerald-300 rounded-lg hover:bg-emerald-500/40 transition font-medium"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="glass rounded-2xl p-4">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre, email o CUIT (mínimo 2 caracteres)..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Clients List */}
      {loading ? (
        <div className="glass rounded-2xl p-8 text-center text-slate-300">
          ⏳ Cargando clientes...
        </div>
      ) : clients.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center text-slate-300">
          📭 No hay clientes registrados
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <article key={client.id} className="glass rounded-xl p-4 space-y-2">
              <h3 className="font-semibold text-white text-lg">{client.legalName}</h3>
              {client.tradeName && <p className="text-slate-300 text-sm">{client.tradeName}</p>}
              {client.taxId && <p className="text-slate-400 text-xs">CUIT: {client.taxId}</p>}
              {client.email && <p className="text-sky-300 text-sm">{client.email}</p>}
              {client.phone && <p className="text-sky-300 text-sm">{client.phone}</p>}
              {client.notes && <p className="text-slate-400 text-xs italic">{client.notes}</p>}
              
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleEdit(client)}
                  className="flex-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm hover:bg-blue-500/30 transition"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="flex-1 px-3 py-1 bg-red-500/20 text-red-300 rounded text-sm hover:bg-red-500/30 transition"
                >
                  🗑️ Borrar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
