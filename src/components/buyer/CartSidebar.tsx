import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, CreditCard, MapPin, Clock } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    address: '',
    paymentMethod: 'card',
    notes: ''
  });

  const handleCheckout = () => {
    // Simulate payment processing
    setTimeout(() => {
      alert('¡Pedido realizado con éxito! Tiempo estimado: 25-40 minutos');
      clearCart();
      setShowCheckout(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900">Mi Carrito</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-primary-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-primary-500" />
          </button>
        </div>

        {cart.items.length === 0 ? (
          /* Empty Cart */
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
              <p className="text-primary-600">Agrega algunos platos deliciosos para comenzar</p>
            </div>
          </div>
        ) : !showCheckout ? (
          /* Cart Items */
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {cart.items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="bg-primary-50 rounded-lg p-4">
                    <div className="flex space-x-3">
                      <img
                        src={item.image || 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-primary-400 hover:text-error-500 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-primary-600 mb-2">{item.restaurantName}</p>
                        
                        {item.customizations.length > 0 && (
                          <div className="mb-2">
                            <p className="text-xs text-primary-500">Personalizaciones:</p>
                            <p className="text-xs text-primary-600">{item.customizations.join(', ')}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 border border-primary-300 rounded-full hover:bg-primary-100"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-medium w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 border border-primary-300 rounded-full hover:bg-primary-100"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-bold text-primary-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-primary-100 p-6 bg-primary-50">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-600">Subtotal</span>
                  <span className="font-medium">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-600">Delivery</span>
                  <span className="font-medium">$2.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-600">Impuestos</span>
                  <span className="font-medium">${(cart.total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-primary-200 pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary-600">${(cart.total + 2.50 + cart.total * 0.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setShowCheckout(true)}
                  className="btn-primary w-full py-3"
                >
                  Proceder al pago
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-primary-200 hover:bg-primary-300 text-primary-700 py-2 rounded-xl font-medium transition-colors text-sm"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Checkout */
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Delivery Address */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary-500" />
                    Dirección de entrega
                  </h3>
                  <textarea
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                    placeholder="Ingresa tu dirección completa..."
                    className="input-field w-full p-3 resize-none"
                    rows={3}
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-primary-500" />
                    Método de pago
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 p-3 border border-primary-200 rounded-lg hover:bg-primary-50 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={checkoutData.paymentMethod === 'card'}
                        onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })}
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <CreditCard className="h-5 w-5 text-primary-400" />
                      <span>Tarjeta de crédito/débito</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-primary-200 rounded-lg hover:bg-primary-50 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={checkoutData.paymentMethod === 'cash'}
                        onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })}
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <span className="w-5 h-5 text-primary-400 text-sm font-bold">$</span>
                      <span>Efectivo</span>
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Notas especiales</h3>
                  <textarea
                    value={checkoutData.notes}
                    onChange={(e) => setCheckoutData({ ...checkoutData, notes: e.target.value })}
                    placeholder="Instrucciones especiales para el delivery..."
                    className="input-field w-full p-3 resize-none"
                    rows={2}
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 mr-2 text-primary-500" />
                    <span className="font-semibold text-gray-900">Tiempo estimado: 25-40 min</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {cart.items.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex justify-between">
                        <span className="text-primary-600">{item.quantity}x {item.name}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Footer */}
            <div className="border-t border-primary-100 p-6 bg-primary-50">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total a pagar</span>
                <span className="text-primary-600">${(cart.total + 2.50 + cart.total * 0.1).toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  disabled={!checkoutData.address}
                  className="btn-primary w-full py-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirmar pedido
                </button>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="w-full bg-primary-200 hover:bg-primary-300 text-primary-700 py-2 rounded-xl font-medium transition-colors text-sm"
                >
                  Volver al carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;