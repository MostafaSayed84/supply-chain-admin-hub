import { Vendor, Product, PurchaseOrder } from '@/types/vendor';

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'TechCorp Suppliers',
    email: 'vendor1@supplier.com',
    phone: '+1-555-0123',
    address: '123 Tech Street, Silicon Valley, CA 94102',
    status: 'active',
    registrationDate: '2024-01-15',
    productsCount: 15
  },
  {
    id: '2',
    name: 'Global Electronics',
    email: 'vendor2@supplier.com',
    phone: '+1-555-0456',
    address: '456 Electronics Ave, Austin, TX 78701',
    status: 'active',
    registrationDate: '2024-02-20',
    productsCount: 23
  },
  {
    id: '3',
    name: 'Green Solutions',
    email: 'contact@greensolutions.com',
    phone: '+1-555-0789',
    address: '789 Eco Drive, Portland, OR 97201',
    status: 'pending',
    registrationDate: '2024-07-10',
    productsCount: 8
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    sku: 'WBH-001',
    vendorId: '1',
    vendorName: 'TechCorp Suppliers',
    price: 89.99,
    stock: 150,
    unit: 'pcs',
    status: 'active'
  },
  {
    id: '2',
    name: 'USB-C Fast Charger',
    category: 'Electronics',
    sku: 'UFC-002',
    vendorId: '1',
    vendorName: 'TechCorp Suppliers',
    price: 24.99,
    stock: 300,
    unit: 'pcs',
    status: 'active'
  },
  {
    id: '3',
    name: 'Smart LED Desk Lamp',
    category: 'Office',
    sku: 'SLD-003',
    vendorId: '2',
    vendorName: 'Global Electronics',
    price: 45.99,
    stock: 75,
    unit: 'pcs',
    status: 'active'
  },
  {
    id: '4',
    name: 'Ergonomic Wireless Mouse',
    category: 'Electronics',
    sku: 'EWM-004',
    vendorId: '2',
    vendorName: 'Global Electronics',
    price: 32.99,
    stock: 200,
    unit: 'pcs',
    status: 'active'
  },
  {
    id: '5',
    name: 'Bamboo Phone Stand',
    category: 'Accessories',
    sku: 'BPS-005',
    vendorId: '3',
    vendorName: 'Green Solutions',
    price: 19.99,
    stock: 50,
    unit: 'pcs',
    status: 'active'
  }
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-001',
    vendorId: '1',
    vendorName: 'TechCorp Suppliers',
    items: [
      {
        productId: '1',
        productName: 'Wireless Bluetooth Headphones',
        sku: 'WBH-001',
        quantity: 50,
        unitPrice: 89.99,
        total: 4499.50
      },
      {
        productId: '2',
        productName: 'USB-C Fast Charger',
        sku: 'UFC-002',
        quantity: 100,
        unitPrice: 24.99,
        total: 2499.00
      }
    ],
    status: 'pending',
    createdAt: '2024-07-12',
    orderDate: '2024-07-12',
    expectedDelivery: '2024-07-20',
    total: 6998.50,
    totalAmount: 6998.50,
    notes: 'Urgent order for Q3 launch'
  },
  {
    id: 'PO-002',
    vendorId: '2',
    vendorName: 'Global Electronics',
    items: [
      {
        productId: '3',
        productName: 'Smart LED Desk Lamp',
        sku: 'SLD-003',
        quantity: 25,
        unitPrice: 45.99,
        total: 1149.75
      }
    ],
    status: 'shipped',
    createdAt: '2024-07-08',
    orderDate: '2024-07-08',
    expectedDelivery: '2024-07-15',
    total: 1149.75,
    totalAmount: 1149.75
  },
  {
    id: 'PO-003',
    vendorId: '1',
    vendorName: 'TechCorp Suppliers',
    items: [
      {
        productId: '2',
        productName: 'USB-C Fast Charger',
        sku: 'UFC-002',
        quantity: 200,
        unitPrice: 24.99,
        total: 4998.00
      }
    ],
    status: 'delivered',
    createdAt: '2024-06-25',
    orderDate: '2024-06-25',
    expectedDelivery: '2024-07-02',
    total: 4998.00,
    totalAmount: 4998.00
  }
];