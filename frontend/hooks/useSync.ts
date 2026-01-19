import { useEffect, useState } from 'react';
import { isOnline, getSyncQueue, clearSyncQueue } from '@/lib/offlineDB';

export function useSync() {
  const [online, setOnline] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      setOnline(await isOnline());
    };

    checkConnection();
    const interval = setInterval(checkConnection, 10000);
    return () => clearInterval(interval);
  }, []);

  const syncPendingChanges = async () => {
    if (!online) return;
    setSyncing(true);

    try {
      const queue = await getSyncQueue();
      if (queue.length === 0) {
        setSyncing(false);
        return;
      }

      for (const item of queue) {
        try {
          const endpoint = `/api/${item.entity}`;
          let response;

          if (item.action === 'create') {
            response = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item.data),
            });
          } else if (item.action === 'update') {
            response = await fetch(`${endpoint}/${item.data.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item.data),
            });
          } else if (item.action === 'delete') {
            response = await fetch(`${endpoint}/${item.data.id}`, {
              method: 'DELETE',
            });
          }

          if (response?.ok) {
            await clearSyncQueue([item.id!]);
          }
        } catch (error) {
          console.error('Sync error:', error);
        }
      }
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    if (online && !syncing) {
      syncPendingChanges();
    }
  }, [online]);

  return { online, syncing, syncPendingChanges };
}
