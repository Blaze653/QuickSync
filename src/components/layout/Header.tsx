import React from 'react';
import { ShoppingCart, User, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

interface HeaderProps {
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-soft border-b border-primary-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-xl shadow-soft">
              <img 
                src="/quicksync.png" 
                alt="QuickSync" 
                className="h-6 w-auto"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">QuickSync</h1>
              {user?.role === 'owner' && (
                <p className="text-xs text-primary-500">Panel de Administración</p>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications - Only for owners */}
            {user?.role === 'owner' && (
              <button className="relative p-2 text-primary-400 hover:text-primary-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 bg-error-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
            )}

            {/* Cart - Only for buyers */}
            {user?.role === 'buyer' && onCartClick && (
              <button
                onClick={onCartClick}
                className="relative p-2 text-primary-400 hover:text-primary-600 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getItemCount()}
                  </span>
                )}
              </button>
            )}

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-primary-50 rounded-full p-2 pr-3">
                <div className="bg-primary-500 p-1 rounded-full">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              </div>

              <button
                onClick={logout}
                className="p-2 text-primary-400 hover:text-primary-600 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;