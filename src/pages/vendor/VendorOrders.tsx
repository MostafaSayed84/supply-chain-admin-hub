import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockPurchaseOrders } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Search, FileText, Calendar, DollarSign, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const VendorOrders: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Filter orders for current vendor
  const vendorOrders = mockPurchaseOrders.filter(order => order.vendorId === user?.id);
  
  const filteredOrders = vendorOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning';
      case 'confirmed': return 'bg-primary/10 text-primary';
      case 'shipped': return 'bg-blue-500/10 text-blue-600';
      case 'delivered': return 'bg-success/10 text-success';
      case 'cancelled': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'confirmed': return CheckCircle;
      case 'shipped': return Truck;
      case 'delivered': return CheckCircle;
      default: return FileText;
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast({
      title: "Order status updated",
      description: `Order ${orderId} has been marked as ${newStatus}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Purchase Orders</h1>
        <p className="text-muted-foreground">Manage your purchase orders and update shipping status</p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          
          return (
            <Card key={order.id} className="shadow-card hover:shadow-admin transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      order.status === 'pending' ? 'bg-warning' :
                      order.status === 'shipped' ? 'bg-primary' :
                      order.status === 'delivered' ? 'bg-success' :
                      'bg-gradient-primary'
                    }`}>
                      <StatusIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        Ordered on {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    {(order.status === 'pending' || order.status === 'confirmed') && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-primary hover:bg-primary-hover"
                        onClick={() => handleStatusUpdate(order.id, 'shipped')}
                      >
                        Mark as Shipped
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="font-bold text-lg">{order.total.toLocaleString()} SAR</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Items</p>
                      <p className="font-medium">{order.items.length} products</p>
                    </div>
                  </div>
                  
                  {order.expectedDelivery && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Expected Delivery</p>
                        <p className="font-medium">{new Date(order.expectedDelivery).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Order Items */}
                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-3">Order Items:</p>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                        </div>
                        <div className="text-center mx-4">
                          <p className="font-medium">Qty: {item.quantity}</p>
                          <p className="text-sm text-muted-foreground">{item.unitPrice} SAR</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{item.total.toLocaleString()} SAR</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {order.notes && (
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm font-medium mb-1">Order Notes:</p>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No purchase orders found</h3>
            <p className="text-muted-foreground">
              {vendorOrders.length === 0 
                ? "You don't have any purchase orders yet." 
                : "Try adjusting your search terms or filters."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};