export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive' | 'pending';
  registrationDate: string;
  productsCount: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  sku: string;
  vendorId: string;
  vendorName: string;
  price: number;
  basePrice?: number;
  stock: number;
  unit: string;
  status: 'active' | 'inactive';
}

export interface PurchaseOrder {
  id: string;
  vendorId: string;
  vendorName: string;
  items: PurchaseOrderItem[];
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  orderDate: string;
  expectedDelivery?: string;
  total: number;
  totalAmount: number;
  notes?: string;
}

export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}