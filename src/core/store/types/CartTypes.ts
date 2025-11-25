export interface CartItem {
  id: string;
  name: string;
  roasted: string;
  imagelink_square: any;
  special_ingredient: string;
  prices: Array<{size: string; price: string; currency: string}>;
  type: string;
  quantity: number;
  size: string;
}

export interface CartState {
  cartList: CartItem[];
  cartPrice: number;
}

