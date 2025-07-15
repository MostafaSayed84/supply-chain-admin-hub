import React from 'react';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { mockVendors, mockProducts, mockPurchaseOrders } from '@/data/mockData';
import { 
  Building2, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const totalVendors = mockVendors.length;
  const activeVendors = mockVendors.filter(v => v.status === 'active').length;
  const totalProducts = mockProducts.length;
  const totalOrders = mockPurchaseOrders.length;
  const pendingOrders = mockPurchaseOrders.filter(po => po.status === 'pending').length;
  const totalRevenue = mockPurchaseOrders.reduce((sum, po) => sum + po.total, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your vendor portal.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Vendors"
          value={totalVendors}
          change={`${activeVendors} active`}
          changeType="positive"
          icon={Building2}
          gradient
        />
        
        <StatsCard
          title="Total Products"
          value={totalProducts}
          change="+12% from last month"
          changeType="positive"
          icon={Package}
        />
        
        <StatsCard
          title="Purchase Orders"
          value={totalOrders}
          change={`${pendingOrders} pending`}
          changeType="neutral"
          icon={ShoppingCart}
        />
        
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+8.2% from last month"
          changeType="positive"
          icon={DollarSign}
          gradient
        />
        
        <StatsCard
          title="Active Users"
          value="24"
          change="+3 new this week"
          changeType="positive"
          icon={Users}
        />
        
        <StatsCard
          title="Growth Rate"
          value="15.3%"
          change="Monthly growth"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-success-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New product added</p>
                <p className="text-xs text-muted-foreground">TechCorp Suppliers added Wireless Earbuds</p>
              </div>
              <span className="text-xs text-muted-foreground">2h ago</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-warning-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Purchase order shipped</p>
                <p className="text-xs text-muted-foreground">PO-002 has been shipped by Global Electronics</p>
              </div>
              <span className="text-xs text-muted-foreground">4h ago</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New vendor registered</p>
                <p className="text-xs text-muted-foreground">Green Solutions registered as a new vendor</p>
              </div>
              <span className="text-xs text-muted-foreground">1d ago</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Vendor Status Overview</h3>
          <div className="space-y-4">
            {mockVendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{vendor.name}</p>
                    <p className="text-xs text-muted-foreground">{vendor.productsCount} products</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  vendor.status === 'active' ? 'bg-success/10 text-success' :
                  vendor.status === 'pending' ? 'bg-warning/10 text-warning' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {vendor.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};