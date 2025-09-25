import React, { useState } from 'react';
import Header from '../components/layout/Header';
import StatsCard from '../components/owner/StatsCard';
import MenuManagement from '../components/owner/MenuManagement';
import OrdersPanel from '../components/owner/OrdersPanel';
import ReviewsPanel from '../components/owner/ReviewsPanel';
import { TrendingUp, DollarSign, ShoppingBag, Clock, Star, Users } from 'lucide-react';

const OwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'orders' | 'reviews'>('overview');

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: TrendingUp },
    { id: 'menu', label: 'Menú', icon: ShoppingBag },
    { id: 'orders', label: 'Pedidos', icon: Clock },
    { id: 'reviews', label: 'Reseñas', icon: Star },
  ];

  const mockStats = {
    todaySales: 1250.80,
    todayOrders: 23,
    avgRating: 4.6,
    totalCustomers: 156
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-primary-600">Gestiona tu restaurante y monitorea las ventas</p>
        </div>

        {/* Navigation Tabs */}
        <div className="card mb-8 overflow-hidden">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'text-primary-600 hover:text-primary-900 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Ventas Hoy"
                value={`$${mockStats.todaySales.toFixed(2)}`}
                icon={DollarSign}
                color="success"
                trend="+12%"
              />
              <StatsCard
                title="Pedidos Hoy"
                value={mockStats.todayOrders.toString()}
                icon={ShoppingBag}
                color="primary"
                trend="+8%"
              />
              <StatsCard
                title="Calificación"
                value={mockStats.avgRating.toString()}
                icon={Star}
                color="warning"
                trend="+0.2"
              />
              <StatsCard
                title="Clientes Total"
                value={mockStats.totalCustomers.toString()}
                icon={Users}
                color="secondary"
                trend="+15%"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sales Chart */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ventas de la Semana</h3>
                <div className="h-64 flex items-end justify-center space-x-2">
                  {[40, 65, 45, 80, 60, 75, 90].map((height, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="bg-primary-500 rounded-t-sm w-8 transition-all hover:bg-primary-600"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-primary-600 mt-2">
                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Items */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platos Más Vendidos</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Burger Clásica', sales: 45, percentage: 35 },
                    { name: 'Pizza Margarita', sales: 32, percentage: 25 },
                    { name: 'Papas Fritas', sales: 28, percentage: 22 },
                    { name: 'Ensalada César', sales: 18, percentage: 14 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-primary-600">{item.sales} vendidos</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-primary-200 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && <MenuManagement />}
        {activeTab === 'orders' && <OrdersPanel />}
        {activeTab === 'reviews' && <ReviewsPanel />}
      </div>
    </div>
  );
};

export default OwnerDashboard;