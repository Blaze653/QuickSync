import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Eye, Phone, MapPin, DollarSign } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    customizations: string[];
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderTime: string;
  estimatedTime: number;
  paymentMethod: 'card' | 'cash';
  notes?: string;
}

const OrdersPanel: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'María González',
      customerPhone: '+1234567890',
      customerAddress: 'Av. Principal 123, Apt 4B',
      items: [
        {
          name: 'Burger Clásica',
          quantity: 2,
          price: 8.99,
          customizations: ['Sin cebolla', 'Queso extra']
        },
        {
          name: 'Papas Fritas',
          quantity: 1,
          price: 3.99,
          customizations: ['Porción grande']
        }
      ],
      total: 21.97,
      status: 'pending',
      orderTime: '2024-01-15 14:30:00',
      estimatedTime: 25,
      paymentMethod: 'card',
      notes: 'Sin cebolla en ninguna hamburguesa, por favor'
    },
    {
      id: '2',
      customerName: 'Carlos Rodríguez',
      customerPhone: '+1234567891',
      customerAddress: 'Calle Roma 456',
      items: [
        {
          name: 'Pizza Margarita',
          quantity: 1,
          price: 12.99,
          customizations: ['Masa delgada', 'Queso extra']
        }
      ],
      total: 12.99,
      status: 'preparing',
      orderTime: '2024-01-15 14:15:00',
      estimatedTime: 30,
      paymentMethod: 'cash'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | Order['status']>('all');

  const filteredOrders = orders.filter(order => 
    activeFilter === 'all' || order.status === activeFilter
  );

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'delivered': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'preparing': return 'Preparando';
      case 'ready': return 'Listo';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const orderCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h2>
        <p className="text-primary-600">Administra y rastrea todos los pedidos en tiempo real</p>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-primary-100 hover:bg-primary-200 text-primary-700'
            }`}
          >
            Todos ({orderCounts.all})
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'pending'
                ? 'bg-warning-500 text-white'
                : 'bg-warning-100 hover:bg-warning-200 text-warning-800'
            }`}
          >
            Pendientes ({orderCounts.pending})
          </button>
          <button
            onClick={() => setActiveFilter('preparing')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'preparing'
                ? 'bg-accent-500 text-white'
                : 'bg-accent-100 hover:bg-accent-200 text-accent-800'
            }`}
          >
            Preparando ({orderCounts.preparing})
          </button>
          <button
            onClick={() => setActiveFilter('ready')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'ready'
                ? 'bg-success-500 text-white'
                : 'bg-success-100 hover:bg-success-200 text-success-800'
            }`}
          >
            Listos ({orderCounts.ready})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map(order => (
          <div key={order.id} className="card hover:shadow-medium transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Pedido #{order.id}</h3>
                  <p className="text-sm text-gray-600">{order.orderTime}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>

              {/* Customer Info */}
              <div className="space-y-2 mb-4">
                <p className="font-medium text-gray-900">{order.customerName}</p>
                <div className="flex items-center text-primary-600 text-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{order.customerPhone}</span>
                </div>
                <div className="flex items-start text-primary-600 text-sm">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{order.customerAddress}</span>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Artículos ({order.items.length})</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.quantity}x {item.name}</span>
                        {item.customizations.length > 0 && (
                          <p className="text-gray-500 text-xs">
                            {item.customizations.join(', ')}
                          </p>
                        )}
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total and Actions */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-success-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-bold text-lg">{order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center text-primary-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{order.estimatedTime}min</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 bg-primary-100 hover:bg-primary-200 text-primary-700 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors text-sm"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Ver</span>
                  </button>
                  
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="flex-1 bg-accent-500 hover:bg-accent-600 text-white py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors text-sm"
                    >
                      <Clock className="h-4 w-4" />
                      <span>Preparar</span>
                    </button>
                  )}
                  
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="flex-1 bg-success-500 hover:bg-success-600 text-white py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors text-sm"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Listo</span>
                    </button>
                  )}
                  
                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="flex-1 bg-secondary-500 hover:bg-secondary-600 text-white py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors text-sm"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Entregar</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Pedido #{selectedOrder.id}
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Status */}
                <div className="text-center">
                  <span className={`px-6 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Información del Cliente</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Nombre:</span> {selectedOrder.customerName}</p>
                    <p><span className="font-medium">Teléfono:</span> {selectedOrder.customerPhone}</p>
                    <p><span className="font-medium">Dirección:</span> {selectedOrder.customerAddress}</p>
                    <p><span className="font-medium">Pago:</span> {selectedOrder.paymentMethod === 'card' ? 'Tarjeta' : 'Efectivo'}</p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Artículos del Pedido</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">
                            {item.quantity}x {item.name}
                          </h5>
                          <span className="font-semibold text-orange-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        {item.customizations.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Personalizaciones:</p>
                            <div className="flex flex-wrap gap-1">
                              {item.customizations.map(customization => (
                                <span
                                  key={customization}
                                  className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {customization}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Notas Especiales</h4>
                    <p className="text-gray-700">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Total */}
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total del Pedido</span>
                    <span className="text-xl font-bold text-green-600">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  {selectedOrder.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'preparing')}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors"
                    >
                      Marcar como Preparando
                    </button>
                  )}
                  
                  {selectedOrder.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'ready')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-colors"
                    >
                      Marcar como Listo
                    </button>
                  )}
                  
                  {selectedOrder.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                      className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-colors"
                    >
                      Marcar como Entregado
                    </button>
                  )}
                  
                  {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-colors"
                    >
                      Cancelar Pedido
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredOrders.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-primary-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <Clock className="h-12 w-12 text-primary-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No hay pedidos {activeFilter !== 'all' ? getStatusText(activeFilter as Order['status']).toLowerCase() : ''}
          </h3>
          <p className="text-primary-600">
            Los nuevos pedidos aparecerán aquí automáticamente
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersPanel;