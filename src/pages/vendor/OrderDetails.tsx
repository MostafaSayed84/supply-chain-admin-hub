import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Package, Calendar, User } from "lucide-react";
import { mockPurchaseOrders } from "@/data/mockData";
import { formatCurrency } from "@/lib/currency";
import { StatusBadge } from "@/components/ui/status-badge";

export const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newStatus, setNewStatus] = useState("");

  const order = mockPurchaseOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <AppLayout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold">Order not found</h1>
          <Button onClick={() => navigate("/vendor/orders")} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleStatusUpdate = () => {
    if (!newStatus) return;
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Status Updated",
        description: `Order ${order.id} status has been updated to ${newStatus}.`,
      });
      setNewStatus("");
    }, 1000);
  };

  const availableStatuses = {
    'pending': ['confirmed', 'cancelled'],
    'confirmed': ['shipped', 'cancelled'],
    'shipped': ['delivered'],
    'delivered': [],
    'cancelled': []
  };

  const canUpdateStatus = availableStatuses[order.status as keyof typeof availableStatuses].length > 0;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/vendor/orders")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Order Details</h1>
            <p className="text-muted-foreground">Order ID: {order.id}</p>
          </div>
        </div>

        {/* Order Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Order Date</span>
                </div>
                <p className="font-semibold">{order.orderDate}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Current Status</span>
                </div>
                <StatusBadge status={order.status} />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Expected Delivery</span>
                </div>
                <p className="font-semibold">{order.expectedDelivery || 'Not specified'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(item.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-6 flex justify-end">
              <div className="text-right">
                <p className="text-lg font-semibold">
                  Total Amount: <span className="text-2xl text-primary">{formatCurrency(order.total)}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {order.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground bg-muted p-4 rounded">{order.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Status Update */}
        {canUpdateStatus && (
          <Card>
            <CardHeader>
              <CardTitle>Update Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end max-w-md">
                <div className="flex-1">
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStatuses[order.status as keyof typeof availableStatuses].map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleStatusUpdate}
                  disabled={!newStatus}
                >
                  Update Status
                </Button>
              </div>
              
              {order.status === 'confirmed' && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    💡 Tip: Update status to "Shipped" when you have dispatched the order to the customer.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};