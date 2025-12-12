export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  isNFT?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  walletAddress?: string;
  isSeller: boolean;
}

export type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'rating';

export interface SellerStat {
  date: string;
  sales: number;
  visitors: number;
}