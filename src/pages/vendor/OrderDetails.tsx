import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AppLayout } from '@/components/Layout/AppLayout';
import { ArrowLeft, Package, Calendar, DollarSign, Truck, CheckCircle } from 'lucide-react';
import { mockPurchaseOrders, mockProducts } from '@/data/mockData';
import { formatCurrency } from '@/lib/currency';
import { useToast } from '@/hooks/use-toast';

export const OrderDetails: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState('');

  const order = mockPurchaseOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <AppLayout>
        <div className="p-6">
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Order not found</h3>
              <p className="text-muted-foreground">The requested order could not be found.</p>
              <Button onClick={() => navigate('/vendor/orders')} className="mt-4" variant="outline">
                Back to Orders
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const handleStatusUpdate = () => {
    if (!status) {
      toast({
        title: "Error",
        description: "Please select a status.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Status Updated",
      description: `Order ${order.id} status has been updated to ${status}.`,
    });
    
    navigate('/vendor/orders');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered': return 'bg-success/10 text-success';
      case 'cancelled': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/vendor/orders')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Order {order.id}</h1>
              <p className="text-muted-foreground">View and manage order details</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order Date</p>
                  <p className="text-lg font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                  <p className="text-lg font-semibold">{order.items.length}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-semibold text-primary">{formatCurrency(order.totalAmount)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Status</p>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
                <Truck className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Items */}
        <Card className="shadow-card">
          <CardHeader><CardTitle>Order Items</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => {
                  const product = mockProducts.find(p => p.id === item.productId);
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <Package className="w-4 h-4 text-primary-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">{product?.name || 'Unknown Product'}</div>
                            <div className="text-sm text-muted-foreground">{product?.category}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.quantity} {product?.unit}</TableCell>
                      <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(item.quantity * item.unitPrice)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount:</span>
                <span className="text-primary">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Update */}
        {order.status === 'pending' || order.status === 'confirmed' ? (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Update Order Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Change Status To:</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      {order.status === 'pending' && (
                        <>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </>
                      )}
                      {order.status === 'confirmed' && (
                        <>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleStatusUpdate}
                    className="w-full bg-gradient-primary hover:bg-primary-hover"
                    disabled={!status}
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Order Status: {order.status}</h3>
              <p className="text-muted-foreground">This order has been {order.status}. No further action is required.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};