import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthPage from '../pages/AuthPage';
import BuyerDashboard from '../pages/BuyerDashboard';
import OwnerDashboard from '../pages/OwnerDashboard';
import LoadingSpinner from './ui/LoadingSpinner';

const AppRouter: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return user.role === 'buyer' ? <BuyerDashboard /> : <OwnerDashboard />;
};

export default AppRouter;