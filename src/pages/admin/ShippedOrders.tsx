import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Eye, Package, Truck } from "lucide-react";
import { mockPurchaseOrders } from "@/data/mockData";
import { formatCurrency } from "@/lib/currency";
import { StatusBadge } from "@/components/ui/status-badge";

export const ShippedOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");

  const shippedOrders = mockPurchaseOrders.filter(order => 
    order.status === 'shipped' || order.status === 'delivered'
  );

  const handleStatusUpdate = (orderId: string, status: string) => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Status Updated",
        description: `Order ${orderId} status has been updated to ${status}.`,
      });
      setSelectedOrder(null);
      setNewStatus("");
    }, 1000);
  };

  const OrderDetailsDialog = ({ order }: { order: any }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Details - {order.id}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Vendor Information</h3>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{order.vendorName}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Status</h3>
            <StatusBadge status={order.status} />
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Order Date: {order.orderDate}</p>
              {order.expectedDelivery && (
                <p className="text-sm text-muted-foreground">Expected: {order.expectedDelivery}</p>
              )}
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <h3 className="font-semibold mb-4">Order Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item: any, index: number) => (
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
        </div>

        {/* Total */}
        <div className="flex justify-end">
          <div className="text-right">
            <p className="text-lg font-semibold">
              Total Amount: <span className="text-2xl text-primary">{formatCurrency(order.total)}</span>
            </p>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div>
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-muted-foreground bg-muted p-3 rounded">{order.notes}</p>
          </div>
        )}

        {/* Status Update */}
        {order.status === 'shipped' && (
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Update Status</h3>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={() => handleStatusUpdate(order.id, newStatus)}
                disabled={!newStatus}
              >
                Update Status
              </Button>
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/purchase-orders")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Purchase Orders
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Truck className="h-8 w-8" />
              Shipped Orders
            </h1>
            <p className="text-muted-foreground">{shippedOrders.length} orders shipped or delivered</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Shipped & Delivered Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {shippedOrders.length === 0 ? (
              <div className="text-center py-8">
                <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Shipped Orders</h3>
                <p className="text-muted-foreground">No orders have been shipped yet.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Expected Delivery</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shippedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.vendorName}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.expectedDelivery || 'Not specified'}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          {selectedOrder && <OrderDetailsDialog order={selectedOrder} />}
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};