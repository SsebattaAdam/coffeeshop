import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {REHYDRATE} from 'redux-persist';
import {produce} from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Persist config - ensures cart and favorites persist across app restarts
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['beans', 'coffee', 'cart'], // Cart items and favorite flags (in beans/coffee) will persist
  // Note: Favorites are stored as 'favourite' property in beansList and coffeeList
  // Images are excluded from persistence and restored from fresh data on rehydration
};

// Beans Reducer
const initialBeansState: BeansState = {
  beansList: BeansData,
  favoritesList: [],
};

const beansReducer = (state = initialBeansState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case REHYDRATE:
        // When rehydrating, merge persisted favorite flags with fresh data
        // Always use fresh BeansData to ensure image references work
        if (action.payload?.beans) {
          const persistedBeans = action.payload.beans;
          // Merge favorite flags from persisted state into fresh data
          if (persistedBeans.beansList && Array.isArray(persistedBeans.beansList)) {
            persistedBeans.beansList.forEach((persistedBean: any) => {
              if (persistedBean && persistedBean.id) {
                const freshBeanIndex = draft.beansList.findIndex(
                  b => b.id === persistedBean.id,
                );
                if (freshBeanIndex !== -1 && persistedBean.favourite !== undefined) {
                  draft.beansList[freshBeanIndex].favourite = persistedBean.favourite;
                }
              }
            });
          }
          // Restore favoritesList
          if (persistedBeans.favoritesList && Array.isArray(persistedBeans.favoritesList)) {
            draft.favoritesList = [...persistedBeans.favoritesList];
          }
        }
        break;

      case 'TOGGLE_BEAN_FAVORITE':
        const beanIndex = draft.beansList.findIndex(
          bean => bean.id === action.payload,
        );
        if (beanIndex !== -1) {
          draft.beansList[beanIndex].favourite =
            !draft.beansList[beanIndex].favourite;

          if (draft.beansList[beanIndex].favourite) {
            if (!draft.favoritesList.includes(action.payload)) {
              draft.favoritesList.push(action.payload);
            }
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
      case REHYDRATE:
        // When rehydrating, merge persisted favorite flags with fresh data
        // Always use fresh CoffeeData to ensure image references work
        if (action.payload?.coffee) {
          const persistedCoffee = action.payload.coffee;
          // Merge favorite flags from persisted state into fresh data
          if (persistedCoffee.coffeeList && Array.isArray(persistedCoffee.coffeeList)) {
            persistedCoffee.coffeeList.forEach((persistedCoffeeItem: any) => {
              if (persistedCoffeeItem && persistedCoffeeItem.id) {
                const freshCoffeeIndex = draft.coffeeList.findIndex(
                  c => c.id === persistedCoffeeItem.id,
                );
                if (freshCoffeeIndex !== -1 && persistedCoffeeItem.favourite !== undefined) {
                  draft.coffeeList[freshCoffeeIndex].favourite = persistedCoffeeItem.favourite;
                }
              }
            });
          }
          // Restore favoritesList
          if (persistedCoffee.favoritesList && Array.isArray(persistedCoffee.favoritesList)) {
            draft.favoritesList = [...persistedCoffee.favoritesList];
          }
        }
        break;

      case 'TOGGLE_COFFEE_FAVORITE':
        const coffeeIndex = draft.coffeeList.findIndex(
          coffee => coffee.id === action.payload,
        );
        if (coffeeIndex !== -1) {
          draft.coffeeList[coffeeIndex].favourite =
            !draft.coffeeList[coffeeIndex].favourite;

          if (draft.coffeeList[coffeeIndex].favourite) {
            if (!draft.favoritesList.includes(action.payload)) {
              draft.favoritesList.push(action.payload);
            }
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
      case REHYDRATE:
        // Restore cart from persisted state
        if (action.payload?.cart) {
          const persistedCart = action.payload.cart;
          // Restore cart list - but we need to handle image references
          // For now, restore what we can - images will need to be restored from original data
          if (persistedCart.cartList && Array.isArray(persistedCart.cartList)) {
            // Filter out items with broken image references and restore from original data
            draft.cartList = persistedCart.cartList.map((cartItem: any) => {
              // Try to restore image from original data
              const originalItem = 
                cartItem.type === 'Bean'
                  ? BeansData.find(b => b.id === cartItem.id)
                  : CoffeeData.find(c => c.id === cartItem.id);
              
              if (originalItem) {
                return {
                  ...cartItem,
                  imagelink_square: originalItem.imagelink_square,
                };
              }
              return cartItem;
            }).filter((item: any) => item.imagelink_square); // Remove items that can't be restored
          }
          draft.cartPrice = persistedCart.cartPrice || 0;
        }
        break;

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
