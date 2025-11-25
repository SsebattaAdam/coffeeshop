// MMKV Storage adapter for redux-persist
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MMKVModule = require('react-native-mmkv');
const MMKVClass = MMKVModule.MMKV || MMKVModule.default || MMKVModule;

// Create MMKV instance
const storage = new (MMKVClass as any)();

// Create MMKV storage adapter for redux-persist
export const mmkvStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value || null);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

