import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Building2, 
  Package, 
  ShoppingCart, 
  LogOut,
  Shield,
  FileText,
  Plus,
  Truck,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Building2, label: 'Vendors', href: '/admin/vendors' },
    { icon: Plus, label: 'Add Vendor', href: '/admin/add-vendor' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: Plus, label: 'Add Product', href: '/admin/add-product' },
    { icon: ShoppingCart, label: 'Purchase Orders', href: '/admin/purchase-orders' },
    { icon: Plus, label: 'Create PO', href: '/admin/create-purchase-order' },
    { icon: Truck, label: 'Shipped Orders', href: '/admin/shipped-orders' },
  ];

  const vendorMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/vendor' },
    { icon: FileText, label: 'Purchase Orders', href: '/vendor/orders' },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : vendorMenuItems;

  return (
    <div className="w-64 bg-admin-sidebar min-h-screen flex flex-col shadow-admin">
      {/* Header */}
      <div className="p-6 border-b border-admin-sidebar-hover">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-white font-semibold">Vendor Portal</h1>
            <p className="text-admin-muted text-sm capitalize">{user?.role} Panel</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-admin-sidebar-hover">
        <div className="text-white">
          <p className="font-medium">{user?.name}</p>
          <p className="text-admin-muted text-sm">{user?.email}</p>
          {user?.companyName && (
            <p className="text-admin-muted text-xs mt-1">{user.companyName}</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/admin' && item.href !== '/vendor' && location.pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                    isActive 
                      ? "bg-admin-accent text-white" 
                      : "text-admin-muted hover:bg-admin-sidebar-hover hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-admin-sidebar-hover">
        <Button
          variant="ghost"
          className="w-full justify-start text-admin-muted hover:text-white hover:bg-admin-sidebar-hover"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};