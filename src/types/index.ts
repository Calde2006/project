export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  product_count: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number;
  discount_percentage: number;
  category_id: string;
  material: string;
  sku: string;
  stock: number;
  rating: number;
  review_count: number;
  is_new: boolean;
  featured: boolean;
  created_at: string;
  category?: Category;
  images?: ProductImage[];
  variants?: ProductVariant[];
  features?: ProductFeature[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string;
  order: number;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size?: string;
  color?: string;
  color_hex?: string;
  stock: number;
  created_at: string;
}

export interface ProductFeature {
  id: string;
  product_id: string;
  feature: string;
  order: number;
  created_at: string;
}
