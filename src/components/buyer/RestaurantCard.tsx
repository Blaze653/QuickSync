import React from 'react';
import { Star, Clock, DollarSign, MapPin } from 'lucide-react';

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
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <div 
      className="card hover:shadow-strong transition-all cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            restaurant.isOpen
              ? 'bg-success-500 text-white'
              : 'bg-error-500 text-white'
          }`}>
            {restaurant.isOpen ? 'Abierto' : 'Cerrado'}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-900">{restaurant.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
            {restaurant.name}
          </h3>
          <span className="text-sm text-primary-500 bg-primary-100 px-2 py-1 rounded-full">
            {restaurant.cuisine}
          </span>
        </div>

        <div className="flex items-center text-primary-600 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{restaurant.address}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-primary-600 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center text-primary-600 text-sm">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>${restaurant.deliveryFee}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;