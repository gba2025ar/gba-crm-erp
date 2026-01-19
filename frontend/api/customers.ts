import { initDB } from '@/lib/offlineDB';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export async function fetchClients() {
  try {
    const response = await fetch(`${API_BASE}/customers`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching clients:', error);
  }

  // Fallback: obtener de almacenamiento local
  const db = await initDB();
  return db.getAll('customers');
}

export async function createClient(client: any) {
  const db = await initDB();
  
  try {
    const response = await fetch(`${API_BASE}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });

    if (response.ok) {
      const data = await response.json();
      await db.put('customers', data);
      return data;
    }
  } catch (error) {
    console.error('Error creating client:', error);
  }

  // Guardar localmente si no hay conexión
  const id = Math.random().toString(36).substr(2, 9);
  const localClient = { ...client, id, synced: false, localTimestamp: Date.now() };
  await db.put('customers', localClient);
  return localClient;
}

export async function updateClient(id: string, updates: any) {
  const db = await initDB();

  try {
    const response = await fetch(`${API_BASE}/customers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const data = await response.json();
      await db.put('customers', data);
      return data;
    }
  } catch (error) {
    console.error('Error updating client:', error);
  }

  // Guardar localmente
  const client = await db.get('customers', id);
  if (client) {
    const updated = { ...client, ...updates, synced: false };
    await db.put('customers', updated);
    return updated;
  }
}

export async function deleteClient(id: string) {
  const db = await initDB();

  try {
    const response = await fetch(`${API_BASE}/customers/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await db.delete('customers', id);
      return true;
    }
  } catch (error) {
    console.error('Error deleting client:', error);
  }

  // Marcar como eliminado localmente
  await db.delete('customers', id);
  return true;
}

export async function searchClients(query: string) {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(`${API_BASE}/customers/search?q=${encodeURIComponent(query)}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error searching clients:', error);
  }

  // Buscar localmente
  const db = await initDB();
  const allClients = await db.getAll('customers');
  return allClients.filter(
    (c) =>
      c.legalName?.toLowerCase().includes(query.toLowerCase()) ||
      c.tradeName?.toLowerCase().includes(query.toLowerCase()) ||
      c.email?.toLowerCase().includes(query.toLowerCase()) ||
      c.phone?.includes(query)
  );
}
