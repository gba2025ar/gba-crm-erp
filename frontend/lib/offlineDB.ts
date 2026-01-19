import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface GbaCrmDB extends DBSchema {
  customers: {
    key: string;
    value: any;
    indexes: { 'by-sync': string };
  };
  services: {
    key: string;
    value: any;
    indexes: { 'by-sync': string };
  };
  tasks: {
    key: string;
    value: any;
    indexes: { 'by-sync': string };
  };
  inventory: {
    key: string;
    value: any;
    indexes: { 'by-sync': string };
  };
  syncQueue: {
    key: number;
    value: {
      id?: number;
      action: 'create' | 'update' | 'delete';
      entity: 'customers' | 'services' | 'tasks' | 'inventory';
      data: any;
      timestamp: number;
      synced: boolean;
    };
  };
}

let db: IDBPDatabase<GbaCrmDB> | null = null;

export async function initDB(): Promise<IDBPDatabase<GbaCrmDB>> {
  if (db) return db;

  db = await openDB<GbaCrmDB>('gba-crm-offline', 1, {
    upgrade(db) {
      // Clientes
      if (!db.objectStoreNames.contains('customers')) {
        const customersStore = db.createObjectStore('customers', { keyPath: 'id' });
        customersStore.createIndex('by-sync', 'synced');
      }

      // Servicios
      if (!db.objectStoreNames.contains('services')) {
        const servicesStore = db.createObjectStore('services', { keyPath: 'id' });
        servicesStore.createIndex('by-sync', 'synced');
      }

      // Tareas
      if (!db.objectStoreNames.contains('tasks')) {
        const tasksStore = db.createObjectStore('tasks', { keyPath: 'id' });
        tasksStore.createIndex('by-sync', 'synced');
      }

      // Inventario
      if (!db.objectStoreNames.contains('inventory')) {
        const inventoryStore = db.createObjectStore('inventory', { keyPath: 'id' });
        inventoryStore.createIndex('by-sync', 'synced');
      }

      // Cola de sincronización
      if (!db.objectStoreNames.contains('syncQueue')) {
        db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
      }
    },
  });

  return db;
}

export async function saveToLocalDB(entity: 'customers' | 'services' | 'tasks' | 'inventory', data: any) {
  const database = await initDB();
  data.synced = false;
  data.localTimestamp = Date.now();
  await database.put(entity, data);
  
  // Agregar a cola de sincronización
  await database.add('syncQueue', {
    action: 'create',
    entity,
    data,
    timestamp: Date.now(),
    synced: false,
  });
}

export async function getFromLocalDB(entity: 'customers' | 'services' | 'tasks' | 'inventory') {
  const database = await initDB();
  return database.getAll(entity);
}

export async function getSyncQueue() {
  const database = await initDB();
  return database.getAll('syncQueue');
}

export async function clearSyncQueue(ids: number[]) {
  const database = await initDB();
  for (const id of ids) {
    await database.delete('syncQueue', id);
  }
}

export async function isOnline(): Promise<boolean> {
  try {
    const response = await fetch('/api/health', { method: 'HEAD', cache: 'no-store' });
    return response.ok;
  } catch {
    return false;
  }
}
