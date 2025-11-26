// MMKV Storage adapter for redux-persist
// Using try-catch to ensure module loads even if MMKV fails
let storage: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const MMKVModule = require('react-native-mmkv');
  const MMKVClass = MMKVModule.MMKV || MMKVModule.default || MMKVModule;
  storage = new (MMKVClass as any)();
} catch (error) {
  console.warn('MMKV initialization failed, using in-memory storage:', error);
  // Fallback to in-memory storage
  const memoryStorage: Record<string, string> = {};
  storage = {
    set: (key: string, value: string) => {
      memoryStorage[key] = value;
    },
    getString: (key: string) => {
      return memoryStorage[key];
    },
    delete: (key: string) => {
      delete memoryStorage[key];
    },
  };
}

// Create MMKV storage adapter for redux-persist
export const mmkvStorage = {
  setItem: (key: string, value: string) => {
    try {
      storage.set(key, value);
      return Promise.resolve(true);
    } catch (error) {
      console.error('Error setting item in storage:', error);
      return Promise.resolve(true);
    }
  },
  getItem: (key: string) => {
    try {
      const value = storage.getString(key);
      return Promise.resolve(value || null);
    } catch (error) {
      console.error('Error getting item from storage:', error);
      return Promise.resolve(null);
    }
  },
  removeItem: (key: string) => {
    try {
      storage.delete(key);
      return Promise.resolve();
    } catch (error) {
      console.error('Error removing item from storage:', error);
      return Promise.resolve();
    }
  },
};

