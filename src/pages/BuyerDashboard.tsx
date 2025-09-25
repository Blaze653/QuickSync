import React, { useState } from 'react';
import Header from '../components/layout/Header';
import RestaurantCard from '../components/buyer/RestaurantCard';
import MenuModal from '../components/buyer/MenuModal';
import CartSidebar from '../components/buyer/CartSidebar';
import { Search, Filter, MapPin, Clock, Star } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  address: string;
  isOpen: boolean;
  menu: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  preparationTime: number;
  customizations: string[];
}

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    cuisine: 'Hamburguesas',
    rating: 4.5,
    deliveryTime: '20-35 min',
    deliveryFee: 2.50,
    address: 'Av. Principal 123',
    isOpen: true,
    menu: [
      {
        id: '1',
        name: 'Burger Clásica',
        description: 'Carne de res, lechuga, tomate, cebolla y salsa especial',
        price: 8.99,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
        category: 'Hamburguesas',
        preparationTime: 15,
        customizations: ['Sin cebolla', 'Carne extra', 'Queso extra', 'Sin pickles']
      },
      {
        id: '2',
        name: 'Papas Fritas',
        description: 'Papas doradas y crujientes con sal marina',
        price: 3.99,
        image: 'https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg',
        category: 'Acompañamientos',
        preparationTime: 10,
        customizations: ['Porción grande', 'Sin sal', 'Con salsa especial']
      }
    ]
  },
  {
    id: '2',
    name: 'Pizza Corner',
    image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg',
    cuisine: 'Italiana',
    rating: 4.3,
    deliveryTime: '25-40 min',
    deliveryFee: 3.00,
    address: 'Calle Roma 456',
    isOpen: true,
    menu: [
      {
        id: '3',
        name: 'Pizza Margarita',
        description: 'Salsa de tomate, mozzarella fresca y albahaca',
        price: 12.99,
        image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg',
        category: 'Pizzas',
        preparationTime: 20,
        customizations: ['Masa delgada', 'Masa gruesa', 'Queso extra', 'Sin albahaca']
      }
    ]
  }
];

const BuyerDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredRestaurants = mockRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setCartOpen(true)} />

      {/* Hero Section */}
      <section className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Gestión inteligente para tu negocio
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Optimiza pedidos, inventario y facturación desde una sola plataforma
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
              <input
                type="text"
                placeholder="Buscar restaurantes o comida..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 shadow-strong focus:outline-none focus:ring-4 focus:ring-white/25"
              />
              <button
                onClick={() => setFilterOpen(true)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-primary-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-success-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-success-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Entrega rápida</h3>
                <p className="text-primary-600">20-40 min promedio</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-accent-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Calidad garantizada</h3>
                <p className="text-primary-600">4.5+ estrellas promedio</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-secondary-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cobertura amplia</h3>
                <p className="text-primary-600">Toda la ciudad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Restaurantes disponibles ({filteredRestaurants.length})
          </h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-sm">Ordenar por:</span>
            <select className="input-field px-3 py-2 text-sm">
              <option>Más populares</option>
              <option>Tiempo de entrega</option>
              <option>Calificación</option>
              <option>Precio</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => setSelectedRestaurant(restaurant)}
            />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-primary-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-primary-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No se encontraron restaurantes
            </h3>
            <p className="text-primary-600">
              Intenta con otros términos de búsqueda o explora todas las opciones disponibles
            </p>
          </div>
        )}
      </main>

      {/* Menu Modal */}
      {selectedRestaurant && (
        <MenuModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default BuyerDashboard;