export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  currency: string;
  imageUrl: string;
  isBestSeller?: boolean;
  colors?: string[];
  sizes?: string[];
}
