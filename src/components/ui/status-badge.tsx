import React from 'react';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'secondary';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = 'default',
  className 
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'delivered':
      case 'confirmed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
      case 'low stock':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'shipped':
      case 'in transit':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'inactive':
      case 'cancelled':
      case 'critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Badge 
      className={cn(
        'border',
        getStatusColor(status),
        className
      )}
    >
      {status}
    </Badge>
  );
};