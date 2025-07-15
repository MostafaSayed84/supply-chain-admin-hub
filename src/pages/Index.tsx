import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Login } from '@/components/Login';
import { AppLayout } from '@/components/Layout/AppLayout';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect to appropriate dashboard based on role
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (user.role === 'vendor') {
        navigate('/vendor', { replace: true });
      }
    }
  }, [user, navigate]);

  // Show login if not authenticated
  if (!user) {
    return <Login />;
  }

  // This shouldn't be reached due to the useEffect redirect, but just in case
  return null;
};

export default Index;
