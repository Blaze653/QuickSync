import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import AppRouter from './components/AppRouter';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <AppRouter />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;