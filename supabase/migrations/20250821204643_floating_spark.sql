/*
  # Food Delivery Platform Database Schema

  1. New Tables
    - `users` - Store user accounts for both buyers and restaurant owners
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `role` (enum: buyer, owner)
      - `name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `restaurants` - Store restaurant information
      - `id` (uuid, primary key)
      - `owner_id` (uuid, foreign key to users)
      - `name` (text)
      - `description` (text)
      - `image` (text, URL)
      - `cuisine` (text)
      - `address` (text)
      - `phone` (text)
      - `is_open` (boolean)
      - `delivery_fee` (decimal)
      - `delivery_time` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `menu_items` - Store restaurant menu items
      - `id` (uuid, primary key)
      - `restaurant_id` (uuid, foreign key to restaurants)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `image` (text, URL)
      - `category` (text)
      - `preparation_time` (integer, minutes)
      - `customizations` (jsonb array)
      - `available` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `orders` - Store customer orders
      - `id` (uuid, primary key)
      - `customer_id` (uuid, foreign key to users)
      - `restaurant_id` (uuid, foreign key to restaurants)
      - `status` (enum: pending, preparing, ready, delivered, cancelled)
      - `total` (decimal)
      - `items` (jsonb array)
      - `customer_address` (text)
      - `customer_phone` (text)
      - `payment_method` (enum: card, cash)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `reviews` - Store customer reviews and ratings
      - `id` (uuid, primary key)
      - `customer_id` (uuid, foreign key to users)
      - `restaurant_id` (uuid, foreign key to restaurants)
      - `order_id` (uuid, foreign key to orders)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `helpful` (integer, default 0)
      - `response` (jsonb, restaurant response)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on roles
    - Users can only access their own data
    - Restaurant owners can access their restaurant data
    - Public read access for restaurant and menu data

  3. Indexes
    - Add indexes for frequently queried columns
    - Composite indexes for complex queries
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('buyer', 'owner');
CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'ready', 'delivered', 'cancelled');
CREATE TYPE payment_method AS ENUM ('card', 'cash');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'buyer',
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text DEFAULT '',
  image text DEFAULT '',
  cuisine text NOT NULL,
  address text NOT NULL,
  phone text DEFAULT '',
  is_open boolean DEFAULT true,
  delivery_fee decimal(10,2) DEFAULT 2.50,
  delivery_time text DEFAULT '20-35 min',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL,
  image text DEFAULT '',
  category text NOT NULL,
  preparation_time integer DEFAULT 15,
  customizations jsonb DEFAULT '[]'::jsonb,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  status order_status DEFAULT 'pending',
  total decimal(10,2) NOT NULL,
  items jsonb NOT NULL,
  customer_address text NOT NULL,
  customer_phone text DEFAULT '',
  payment_method payment_method DEFAULT 'card',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment text DEFAULT '',
  helpful integer DEFAULT 0,
  response jsonb DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_restaurants_owner_id ON restaurants(owner_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine ON restaurants(cuisine);
CREATE INDEX IF NOT EXISTS idx_restaurants_is_open ON restaurants(is_open);

CREATE INDEX IF NOT EXISTS idx_menu_items_restaurant_id ON menu_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(available);

CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_restaurant_id ON orders(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

CREATE INDEX IF NOT EXISTS idx_reviews_restaurant_id ON reviews(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Restaurants policies
CREATE POLICY "Anyone can read restaurants"
  ON restaurants
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owners can manage own restaurants"
  ON restaurants
  FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id);

-- Menu items policies
CREATE POLICY "Anyone can read menu items"
  ON menu_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Restaurant owners can manage own menu items"
  ON menu_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = menu_items.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

-- Orders policies
CREATE POLICY "Customers can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = customer_id);

CREATE POLICY "Restaurant owners can read orders for their restaurants"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = orders.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

CREATE POLICY "Customers can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Restaurant owners can update order status"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = orders.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

-- Reviews policies
CREATE POLICY "Anyone can read reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Customers can create reviews for own orders"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = customer_id
    AND EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = reviews.order_id
      AND orders.customer_id = auth.uid()
    )
  );

CREATE POLICY "Restaurant owners can respond to reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = reviews.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

-- Functions for automatic updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurants_updated_at
  BEFORE UPDATE ON restaurants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();