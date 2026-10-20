export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number; // in BDT (৳)
  originalPrice?: number;
  category: string;
  categoryLabel: string;
  badge?: string;
  images: string[];
  description: string;
  fabricDetails: string[];
  careInstructions: string[];
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export type CategoryFilter = 'all' | 'eid-collection' | string;
export type SortOption = 'featured' | 'price-low' | 'price-high' | 'name';
