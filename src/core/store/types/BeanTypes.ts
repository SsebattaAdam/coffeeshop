export interface BeanItem {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: any;
  imagelink_portrait: any;
  ingredients: string;
  special_ingredient: string;
  prices: Array<{size: string; price: string; currency: string}>;
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
}

export interface BeansState {
  beansList: BeanItem[];
  favoritesList: string[]; // Array of bean IDs
}

