/*
  # Sample Data for Food Delivery Platform

  1. Sample Data
    - Create sample users (buyers and restaurant owners)
    - Create sample restaurants with different cuisines
    - Create sample menu items for each restaurant
    - Create sample orders with different statuses
    - Create sample reviews and ratings

  This migration populates the database with realistic sample data
  for testing and demonstration purposes.
*/

-- Insert sample users
INSERT INTO users (id, email, role, name) VALUES
  ('11111111-1111-1111-1111-111111111111', 'buyer1@example.com', 'buyer', 'María González'),
  ('22222222-2222-2222-2222-222222222222', 'buyer2@example.com', 'buyer', 'Carlos Rodríguez'),
  ('33333333-3333-3333-3333-333333333333', 'buyer3@example.com', 'buyer', 'Ana Martínez'),
  ('44444444-4444-4444-4444-444444444444', 'owner1@example.com', 'owner', 'Juan Pérez'),
  ('55555555-5555-5555-5555-555555555555', 'owner2@example.com', 'owner', 'Isabella Romano'),
  ('66666666-6666-6666-6666-666666666666', 'owner3@example.com', 'owner', 'Diego Silva')
ON CONFLICT (email) DO NOTHING;

-- Insert sample restaurants
INSERT INTO restaurants (id, owner_id, name, description, image, cuisine, address, phone, is_open, delivery_fee, delivery_time) VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '44444444-4444-4444-4444-444444444444',
    'Burger Palace',
    'Las mejores hamburguesas artesanales de la ciudad. Ingredientes frescos y carnes de primera calidad.',
    'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    'Hamburguesas',
    'Av. Principal 123',
    '+1234567890',
    true,
    2.50,
    '20-35 min'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '55555555-5555-5555-5555-555555555555',
    'Pizza Corner',
    'Auténtica pizza italiana con masa artesanal y ingredientes importados directamente de Italia.',
    'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg',
    'Italiana',
    'Calle Roma 456',
    '+1234567891',
    true,
    3.00,
    '25-40 min'
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '66666666-6666-6666-6666-666666666666',
    'Sushi Express',
    'Sushi fresco preparado diariamente por chefs especializados en cocina japonesa.',
    'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    'Japonesa',
    'Boulevard Central 789',
    '+1234567892',
    true,
    4.00,
    '30-45 min'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample menu items for Burger Palace
INSERT INTO menu_items (restaurant_id, name, description, price, image, category, preparation_time, customizations, available) VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Burger Clásica',
    'Carne de res premium, lechuga fresca, tomate, cebolla caramelizada y nuestra salsa especial en pan brioche.',
    8.99,
    'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    'Hamburguesas',
    15,
    '["Sin cebolla", "Carne extra", "Queso extra", "Sin pickles", "Pan integral"]'::jsonb,
    true
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Burger BBQ',
    'Carne de res, queso cheddar, tocino crujiente, aros de cebolla y salsa BBQ casera.',
    10.99,
    'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    'Hamburguesas',
    18,
    '["Sin tocino", "Carne extra", "Queso extra", "Salsa extra"]'::jsonb,
    true
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Papas Fritas',
    'Papas cortadas a mano, doradas y crujientes con sal marina.',
    3.99,
    'https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg',
    'Acompañamientos',
    10,
    '["Porción grande", "Sin sal", "Con salsa especial", "Con queso"]'::jsonb,
    true
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Coca Cola',
    'Bebida refrescante 500ml.',
    2.50,
    'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg',
    'Bebidas',
    2,
    '["Con hielo", "Sin hielo", "Con limón"]'::jsonb,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample menu items for Pizza Corner
INSERT INTO menu_items (restaurant_id, name, description, price, image, category, preparation_time, customizations, available) VALUES
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Pizza Margarita',
    'Salsa de tomate artesanal, mozzarella fresca y albahaca aromática sobre masa tradicional.',
    12.99,
    'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg',
    'Pizzas',
    20,
    '["Masa delgada", "Masa gruesa", "Queso extra", "Sin albahaca"]'::jsonb,
    true
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Pizza Pepperoni',
    'Salsa de tomate, mozzarella y generosas rodajas de pepperoni premium.',
    15.99,
    'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg',
    'Pizzas',
    22,
    '["Masa delgada", "Masa gruesa", "Pepperoni extra", "Queso extra"]'::jsonb,
    true
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Ensalada César',
    'Lechuga romana, crutones caseros, queso parmesano y aderezo césar tradicional.',
    8.99,
    'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg',
    'Ensaladas',
    8,
    '["Con pollo", "Sin crutones", "Aderezo aparte", "Queso extra"]'::jsonb,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample menu items for Sushi Express
INSERT INTO menu_items (restaurant_id, name, description, price, image, category, preparation_time, customizations, available) VALUES
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'Sushi Combo',
    'Selección de 10 piezas: salmón, atún, camarón y anguila sobre arroz de sushi.',
    18.99,
    'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    'Sushi',
    15,
    '["Sin wasabi", "Wasabi extra", "Sin jengibre", "Salsa soya extra"]'::jsonb,
    true
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'California Roll',
    '8 piezas de roll con cangrejo, aguacate y pepino, cubierto con sésamo.',
    13.99,
    'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    'Rolls',
    12,
    '["Sin aguacate", "Sin pepino", "Sésamo extra"]'::jsonb,
    true
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'Sopa Miso',
    'Tradicional sopa japonesa con pasta de soja, tofu y algas wakame.',
    4.99,
    'https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg',
    'Sopas',
    5,
    '["Sin tofu", "Tofu extra", "Sin algas"]'::jsonb,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample orders
INSERT INTO orders (id, customer_id, restaurant_id, status, total, items, customer_address, customer_phone, payment_method, notes) VALUES
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'pending',
    21.97,
    '[
      {"name": "Burger Clásica", "quantity": 2, "price": 8.99, "customizations": ["Sin cebolla", "Queso extra"]},
      {"name": "Papas Fritas", "quantity": 1, "price": 3.99, "customizations": ["Porción grande"]}
    ]'::jsonb,
    'Av. Principal 123, Apt 4B',
    '+1234567890',
    'card',
    'Sin cebolla en ninguna hamburguesa, por favor'
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    '22222222-2222-2222-2222-222222222222',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'preparing',
    12.99,
    '[
      {"name": "Pizza Margarita", "quantity": 1, "price": 12.99, "customizations": ["Masa delgada", "Queso extra"]}
    ]'::jsonb,
    'Calle Roma 456',
    '+1234567891',
    'cash',
    ''
  ),
  (
    'ffffffff-ffff-ffff-ffff-ffffffffffff',
    '33333333-3333-3333-3333-333333333333',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'delivered',
    18.99,
    '[
      {"name": "Sushi Combo", "quantity": 1, "price": 18.99, "customizations": ["Wasabi extra"]}
    ]'::jsonb,
    'Boulevard Central 789, Casa 15',
    '+1234567892',
    'card',
    'Dejar en la puerta, por favor'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (customer_id, restaurant_id, order_id, rating, comment, helpful, response) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    5,
    'Excelente servicio y la comida llegó muy rápida. La burger estaba deliciosa y las papas perfectamente doradas. Definitivamente voy a pedir de nuevo.',
    8,
    '{"text": "¡Muchas gracias por tu comentario, María! Nos alegra saber que disfrutaste tu pedido. ¡Esperamos verte pronto!", "date": "2024-01-15"}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    4,
    'Buena comida en general. La pizza estaba rica pero llegó un poco fría. El tiempo de entrega fue razonable.',
    5,
    null
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'ffffffff-ffff-ffff-ffff-ffffffffffff',
    5,
    '¡Increíble! El mejor sushi que he probado en mucho tiempo. Ingredientes frescos y excelente presentación. 100% recomendado.',
    12,
    '{"text": "¡Muchísimas gracias! Nos esforzamos por ofrecer la mejor calidad en cada pedido. ¡Esperamos verte de nuevo pronto!", "date": "2024-01-14"}'::jsonb
  )
ON CONFLICT (id) DO NOTHING;