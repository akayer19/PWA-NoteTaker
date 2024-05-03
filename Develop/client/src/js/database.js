import { openDB } from 'idb';

// Initialize the IndexedDB
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add or update content in the database
export const putDb = async (id, content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const result = await store.put({ id, content });
  console.log('Data saved to the database', result);
  return result;
};

// Get all content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const result = await store.getAll();
  console.log('Data retrieved from the database', result);
  return result;
};

initdb();

