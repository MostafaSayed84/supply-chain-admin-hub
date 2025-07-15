import React from 'react';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { mockPurchaseOrders } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileText, 
  Package, 
  TrendingUp,
  Clock,
  CheckCircle,
  Truck
} from 'lucide-react';

export const VendorDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Filter orders for current vendor
  const vendorOrders = mockPurchaseOrders.filter(po => po.vendorId === user?.id);
  const pendingOrders = vendorOrders.filter(po => po.status === 'pending');
  const shippedOrders = vendorOrders.filter(po => po.status === 'shipped');
  const totalRevenue = vendorOrders.reduce((sum, po) => sum + po.total, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}! Here's your order overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Orders"
          value={vendorOrders.length}
          change="+2 this month"
          changeType="positive"
          icon={FileText}
          gradient
        />
        
        <StatsCard
          title="Pending Orders"
          value={pendingOrders.length}
          change="Needs attention"
          changeType="neutral"
          icon={Clock}
        />
        
        <StatsCard
          title="Shipped Orders"
          value={shippedOrders.length}
          change="In transit"
          changeType="positive"
          icon={Truck}
        />
        
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+12% from last month"
          changeType="positive"
          icon={TrendingUp}
          gradient
        />
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Recent Purchase Orders</h3>
          <div className="space-y-3">
            {vendorOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  order.status === 'pending' ? 'bg-warning' :
                  order.status === 'shipped' ? 'bg-primary' :
                  order.status === 'delivered' ? 'bg-success' :
                  'bg-muted'
                }`}>
                  {order.status === 'pending' ? <Clock className="w-4 h-4 text-warning-foreground" /> :
                   order.status === 'shipped' ? <Truck className="w-4 h-4 text-primary-foreground" /> :
                   <CheckCircle className="w-4 h-4 text-success-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.items.length} items • ${order.total.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'pending' ? 'bg-warning/10 text-warning' :
                    order.status === 'shipped' ? 'bg-primary/10 text-primary' :
                    order.status === 'delivered' ? 'bg-success/10 text-success' :
                    'bg-muted/10 text-muted-foreground'
                  }`}>
                    {order.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{order.orderDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <div className="p-4 border-2 border-dashed border-muted rounded-lg text-center">
              <Package className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">View All Orders</p>
              <p className="text-xs text-muted-foreground">Manage your purchase orders</p>
            </div>
            
            <div className="p-4 border-2 border-dashed border-muted rounded-lg text-center">
              <Truck className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Update Shipments</p>
              <p className="text-xs text-muted-foreground">Track and update order status</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Status Summary */}
      <div className="bg-card rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4">Order Status Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-warning/10 rounded-lg">
            <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-warning">{pendingOrders.length}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{shippedOrders.length}</p>
            <p className="text-sm text-muted-foreground">Shipped</p>
          </div>
          
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">{vendorOrders.filter(po => po.status === 'delivered').length}</p>
            <p className="text-sm text-muted-foreground">Delivered</p>
          </div>
          
          <div className="text-center p-4 bg-muted/10 rounded-lg">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-2xl font-bold">{vendorOrders.length}</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};