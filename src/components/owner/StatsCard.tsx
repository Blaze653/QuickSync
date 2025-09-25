import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'success' | 'primary' | 'warning' | 'secondary';
  trend?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    success: 'bg-success-100 text-success-600',
    primary: 'bg-primary-100 text-primary-600',
    warning: 'bg-warning-100 text-warning-600',
    secondary: 'bg-secondary-100 text-secondary-600',
  };

  const isPositiveTrend = trend && trend.startsWith('+');

  return (
    <div className="card p-6 hover:shadow-medium transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            isPositiveTrend ? 'text-success-600' : 'text-error-600'
          }`}>
            {isPositiveTrend ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-primary-600 text-sm">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;