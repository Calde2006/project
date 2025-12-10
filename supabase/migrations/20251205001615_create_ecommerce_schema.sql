/*
  # TerraShop E-commerce Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text) - Category name
      - `slug` (text) - URL-friendly slug
      - `description` (text) - Category description
      - `image_url` (text) - Category image
      - `product_count` (integer) - Number of products
      - `created_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `slug` (text) - URL-friendly slug
      - `description` (text) - Product description
      - `price` (numeric) - Current price
      - `original_price` (numeric) - Original price (for discounts)
      - `discount_percentage` (integer) - Discount percentage
      - `category_id` (uuid) - Foreign key to categories
      - `material` (text) - Product material
      - `sku` (text) - SKU code
      - `stock` (integer) - Available stock
      - `rating` (numeric) - Average rating
      - `review_count` (integer) - Number of reviews
      - `is_new` (boolean) - New product badge
      - `featured` (boolean) - Featured product
      - `created_at` (timestamptz)
    
    - `product_images`
      - `id` (uuid, primary key)
      - `product_id` (uuid) - Foreign key to products
      - `url` (text) - Image URL
      - `alt_text` (text) - Alt text for accessibility
      - `order` (integer) - Display order
      - `created_at` (timestamptz)
    
    - `product_variants`
      - `id` (uuid, primary key)
      - `product_id` (uuid) - Foreign key to products
      - `size` (text) - Size option (XS, S, M, L, XL, XXL)
      - `color` (text) - Color name
      - `color_hex` (text) - Color hex code
      - `stock` (integer) - Stock for this variant
      - `created_at` (timestamptz)
    
    - `product_features`
      - `id` (uuid, primary key)
      - `product_id` (uuid) - Foreign key to products
      - `feature` (text) - Feature description
      - `order` (integer) - Display order
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (no authentication required for viewing products)
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  product_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL,
  original_price numeric(10,2),
  discount_percentage integer DEFAULT 0,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  material text DEFAULT '',
  sku text UNIQUE NOT NULL,
  stock integer DEFAULT 0,
  rating numeric(2,1) DEFAULT 0,
  review_count integer DEFAULT 0,
  is_new boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  alt_text text DEFAULT '',
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create product_variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  size text,
  color text,
  color_hex text,
  stock integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create product_features table
CREATE TABLE IF NOT EXISTS product_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  feature text NOT NULL,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view product images"
  ON product_images FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view product variants"
  ON product_variants FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view product features"
  ON product_features FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_features_product ON product_features(product_id);
