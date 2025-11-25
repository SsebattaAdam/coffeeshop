import type {CartItem} from './types';

// Action types
export const TOGGLE_BEAN_FAVORITE = 'TOGGLE_BEAN_FAVORITE';
export const TOGGLE_COFFEE_FAVORITE = 'TOGGLE_COFFEE_FAVORITE';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

// Action creators
export const toggleBeanFavorite = (beanId: string) => ({
  type: TOGGLE_BEAN_FAVORITE,
  payload: beanId,
});

export const toggleCoffeeFavorite = (coffeeId: string) => ({
  type: TOGGLE_COFFEE_FAVORITE,
  payload: coffeeId,
});

export const addToCart = (item: CartItem) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (id: string, size: string) => ({
  type: REMOVE_FROM_CART,
  payload: {id, size},
});

export const updateCartQuantity = (
  id: string,
  size: string,
  quantity: number,
) => ({
  type: UPDATE_CART_QUANTITY,
  payload: {id, size, quantity},
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

