import React, { useState } from 'react';
import { X, Plus, Minus, Clock, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

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

interface MenuModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ restaurant, onClose }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const { addToCart } = useCart();

  const categories = [...new Set(restaurant.menu.map(item => item.category))];

  React.useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categories]);

  const filteredMenu = restaurant.menu.filter(item => 
    activeCategory === '' || item.category === activeCategory
  );

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const cartItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      quantity,
      customizations: selectedCustomizations,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      image: selectedItem.image
    };

    addToCart(cartItem);
    setSelectedItem(null);
    setQuantity(1);
    setSelectedCustomizations([]);
  };

  const toggleCustomization = (customization: string) => {
    setSelectedCustomizations(prev =>
      prev.includes(customization)
        ? prev.filter(c => c !== customization)
        : [...prev, customization]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-orange-500 to-red-500">
          <img 
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-bold mb-2">{restaurant.name}</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full">
              <span className="bg-white/20 px-2 py-1 rounded-full">
                {restaurant.cuisine}
              </span>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(90vh-12rem)]">
          {/* Categories Sidebar */}
          <div className="w-64 bg-primary-50 p-4 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Categorías</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-6 border-t border-primary-100 bg-primary-50">
            <div className="grid gap-6">
              {filteredMenu.map(item => (
                <div
                  key={item.id}
                  className="bg-white border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-bold text-orange-600">
                            ${item.price.toFixed(2)}
                  <p className="text-primary-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{item.preparationTime} min</span>
                      <span className="text-lg font-bold text-primary-600">
                          </div>
                        </div>
                      <div className="flex items-center text-primary-500 text-sm">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Item Detail Modal */}
        {selectedItem && (
          <div className="absolute inset-0 bg-white flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <button
                onClick={() => setSelectedItem(null)}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center space-x-2"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-xl font-bold text-gray-900">{selectedItem.name}</h3>
              <div></div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-2xl mx-auto">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />

                <p className="text-gray-600 mb-6">{selectedItem.description}</p>

                {/* Customizations */}
                {selectedItem.customizations.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Personalizar</h4>
                    <div className="space-y-2">
                      {selectedItem.customizations.map(customization => (
                        <label
                          key={customization}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCustomizations.includes(customization)}
                            onChange={() => toggleCustomization(customization)}
                            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-gray-700">{customization}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-semibold text-gray-900">Cantidad</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-semibold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 border border-gray-300 rounded-full hover:bg-gray-50"
                    <button className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-full transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50">
              <div className="max-w-2xl mx-auto">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Agregar al carrito - ${(selectedItem.price * quantity).toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuModal;