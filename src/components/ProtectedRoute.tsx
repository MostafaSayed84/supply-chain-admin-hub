
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'admin' | 'vendor';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== allowedRole) {
    // Redirect to their appropriate dashboard
    const redirectPath = user.role === 'admin' ? '/admin' : '/vendor';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
