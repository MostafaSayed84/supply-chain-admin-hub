
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/Layout/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { VendorList } from "./pages/admin/VendorList";
import { ProductList } from "./pages/admin/ProductList";
import { PurchaseOrders } from "./pages/admin/PurchaseOrders";
import { VendorDashboard } from "./pages/vendor/VendorDashboard";
import { VendorOrders } from "./pages/vendor/VendorOrders";
import { OrderDetails } from "./pages/vendor/OrderDetails";
import { AddVendor } from "./pages/admin/AddVendor";
import { AddProduct } from "./pages/admin/AddProduct";
import { VendorProducts } from "./pages/admin/VendorProducts";
import { CreatePurchaseOrder } from "./pages/admin/CreatePurchaseOrder";
import { ShippedOrders } from "./pages/admin/ShippedOrders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={
              <ProtectedRoute allowedRole="admin">
                <AppLayout>
                  <AdminDashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/vendors" element={
              <ProtectedRoute allowedRole="admin">
                <AppLayout>
                  <VendorList />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/products" element={
              <ProtectedRoute allowedRole="admin">
                <AppLayout>
                  <ProductList />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/purchase-orders" element={
              <ProtectedRoute allowedRole="admin">
                <AppLayout>
                  <PurchaseOrders />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/vendor" element={
              <ProtectedRoute allowedRole="vendor">
                <AppLayout>
                  <VendorDashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/vendor/orders" element={
              <ProtectedRoute allowedRole="vendor">
                <AppLayout>
                  <VendorOrders />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/vendor/orders/:orderId" element={
              <ProtectedRoute allowedRole="vendor">
                <AppLayout>
                  <OrderDetails />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/add-vendor" element={
              <ProtectedRoute allowedRole="admin">
                <AddVendor />
              </ProtectedRoute>
            } />
            <Route path="/admin/add-product" element={
              <ProtectedRoute allowedRole="admin">
                <AddProduct />
              </ProtectedRoute>
            } />
            <Route path="/admin/vendors/:vendorId/products" element={
              <ProtectedRoute allowedRole="admin">
                <AppLayout>
                  <VendorProducts />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/create-purchase-order" element={
              <ProtectedRoute allowedRole="admin">
                <CreatePurchaseOrder />
              </ProtectedRoute>
            } />
            <Route path="/admin/shipped-orders" element={
              <ProtectedRoute allowedRole="admin">
                <AppLayout>
                  <ShippedOrders />
                </AppLayout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
