import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {produce} from 'immer';

// Import types
import type {
  BeanItem,
  BeansState,
  CoffeeItem,
  CoffeeState,
  CartItem,
  CartState,
} from './types';

// Import data
import BeansData from '../constants/data/BeansData';
import CoffeeData from '../constants/data/CoffeeData';

// Import MMKV storage adapter with fallback
let mmkvStorage: any;
try {
  const storageModule = require('./mmkvStorage');
  mmkvStorage = storageModule.mmkvStorage;
} catch (error) {
  console.warn('MMKV storage not available, using in-memory fallback:', error);
  // Fallback storage that doesn't persist
  mmkvStorage = {
    setItem: () => Promise.resolve(true),
    getItem: () => Promise.resolve(null),
    removeItem: () => Promise.resolve(),
  };
}

// Persist config
const persistConfig = {
  key: 'root',
  storage: mmkvStorage,
  whitelist: ['beans', 'coffee', 'cart', 'favorites'],
};

// Beans Reducer
const initialBeansState: BeansState = {
  beansList: BeansData,
  favoritesList: [],
};

const beansReducer = (state = initialBeansState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'TOGGLE_BEAN_FAVORITE':
        const beanIndex = draft.beansList.findIndex(
          bean => bean.id === action.payload,
        );
        if (beanIndex !== -1) {
          draft.beansList[beanIndex].favourite =
            !draft.beansList[beanIndex].favourite;

          if (draft.beansList[beanIndex].favourite) {
            draft.favoritesList.push(action.payload);
          } else {
            draft.favoritesList = draft.favoritesList.filter(
              id => id !== action.payload,
            );
          }
        }
        break;

      default:
        return state;
    }
  });
};

// Coffee Reducer
const initialCoffeeState: CoffeeState = {
  coffeeList: CoffeeData,
  favoritesList: [],
};

const coffeeReducer = (state = initialCoffeeState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'TOGGLE_COFFEE_FAVORITE':
        const coffeeIndex = draft.coffeeList.findIndex(
          coffee => coffee.id === action.payload,
        );
        if (coffeeIndex !== -1) {
          draft.coffeeList[coffeeIndex].favourite =
            !draft.coffeeList[coffeeIndex].favourite;

          if (draft.coffeeList[coffeeIndex].favourite) {
            draft.favoritesList.push(action.payload);
          } else {
            draft.favoritesList = draft.favoritesList.filter(
              id => id !== action.payload,
            );
          }
        }
        break;

      default:
        return state;
    }
  });
};

// Cart Reducer
const initialCartState: CartState = {
  cartList: [],
  cartPrice: 0,
};

const cartReducer = (state = initialCartState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingItem = draft.cartList.find(
          item =>
            item.id === action.payload.id &&
            item.size === action.payload.size,
        );

        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          draft.cartList.push(action.payload);
        }

        draft.cartPrice = draft.cartList.reduce((total, item) => {
          const price = parseFloat(
            item.prices.find(p => p.size === item.size)?.price || '0',
          );
          return total + price * item.quantity;
        }, 0);
        break;

      case 'REMOVE_FROM_CART':
        draft.cartList = draft.cartList.filter(
          item =>
            !(
              item.id === action.payload.id &&
              item.size === action.payload.size
            ),
        );

        draft.cartPrice = draft.cartList.reduce((total, item) => {
          const price = parseFloat(
            item.prices.find(p => p.size === item.size)?.price || '0',
          );
          return total + price * item.quantity;
        }, 0);
        break;

      case 'UPDATE_CART_QUANTITY':
        const itemToUpdate = draft.cartList.find(
          item =>
            item.id === action.payload.id &&
            item.size === action.payload.size,
        );

        if (itemToUpdate) {
          itemToUpdate.quantity = action.payload.quantity;
        }

        draft.cartPrice = draft.cartList.reduce((total, item) => {
          const price = parseFloat(
            item.prices.find(p => p.size === item.size)?.price || '0',
          );
          return total + price * item.quantity;
        }, 0);
        break;

      case 'CLEAR_CART':
        draft.cartList = [];
        draft.cartPrice = 0;
        break;
      default:
        return state;
    }
  });
};

// Combine reducers
const rootReducer = combineReducers({
  beans: beansReducer,
  coffee: coffeeReducer,
  cart: cartReducer,

});

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor
export const persistor = persistStore(store);


// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
