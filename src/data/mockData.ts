import { Vendor, Product, PurchaseOrder } from '@/types/vendor';

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'الشركة السعودية للتقنية',
    email: 'vendor1@satech.com.sa',
    phone: '+966-11-456-7890',
    address: 'شارع الملك فهد، الرياض 12371، المملكة العربية السعودية',
    status: 'active',
    registrationDate: '2024-01-15',
    productsCount: 15
  },
  {
    id: '2',
    name: 'مؤسسة الخليج للإلكترونيات',
    email: 'vendor2@gulfelec.com.sa',
    phone: '+966-12-654-3210',
    address: 'شارع التحلية، جدة 21462، المملكة العربية السعودية',
    status: 'active',
    registrationDate: '2024-02-20',
    productsCount: 23
  },
  {
    id: '3',
    name: 'شركة الحلول الذكية',
    email: 'contact@smartsolutions.com.sa',
    phone: '+966-13-321-9876',
    address: 'شارع الأمير محمد بن فهد، الدمام 31411، المملكة العربية السعودية',
    status: 'pending',
    registrationDate: '2024-07-10',
    productsCount: 8
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'سماعات بلوتوث لاسلكية',
    category: 'إلكترونيات',
    sku: 'WBH-001',
    vendorId: '1',
    vendorName: 'الشركة السعودية للتقنية',
    price: 337.46,
    stock: 150,
    unit: 'قطعة',
    status: 'active'
  },
  {
    id: '2',
    name: 'شاحن سريع USB-C',
    category: 'إلكترونيات',
    sku: 'UFC-002',
    vendorId: '1',
    vendorName: 'الشركة السعودية للتقنية',
    price: 93.71,
    stock: 300,
    unit: 'قطعة',
    status: 'active'
  },
  {
    id: '3',
    name: 'مصباح مكتب LED ذكي',
    category: 'مكتبية',
    sku: 'SLD-003',
    vendorId: '2',
    vendorName: 'مؤسسة الخليج للإلكترونيات',
    price: 172.46,
    stock: 75,
    unit: 'قطعة',
    status: 'active'
  },
  {
    id: '4',
    name: 'فأرة لاسلكية مريحة',
    category: 'إلكترونيات',
    sku: 'EWM-004',
    vendorId: '2',
    vendorName: 'مؤسسة الخليج للإلكترونيات',
    price: 123.71,
    stock: 200,
    unit: 'قطعة',
    status: 'active'
  },
  {
    id: '5',
    name: 'حامل هاتف من الخيزران',
    category: 'إكسسوارات',
    sku: 'BPS-005',
    vendorId: '3',
    vendorName: 'شركة الحلول الذكية',
    price: 74.96,
    stock: 50,
    unit: 'قطعة',
    status: 'active'
  }
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-001',
    vendorId: '1',
    vendorName: 'الشركة السعودية للتقنية',
    items: [
      {
        productId: '1',
        productName: 'سماعات بلوتوث لاسلكية',
        sku: 'WBH-001',
        quantity: 50,
        unitPrice: 337.46,
        total: 16873.00
      },
      {
        productId: '2',
        productName: 'شاحن سريع USB-C',
        sku: 'UFC-002',
        quantity: 100,
        unitPrice: 93.71,
        total: 9371.00
      }
    ],
    status: 'pending',
    createdAt: '2024-07-12',
    orderDate: '2024-07-12',
    expectedDelivery: '2024-07-20',
    total: 26244.00,
    totalAmount: 26244.00,
    notes: 'طلب عاجل لإطلاق الربع الثالث'
  },
  {
    id: 'PO-002',
    vendorId: '2',
    vendorName: 'مؤسسة الخليج للإلكترونيات',
    items: [
      {
        productId: '3',
        productName: 'مصباح مكتب LED ذكي',
        sku: 'SLD-003',
        quantity: 25,
        unitPrice: 172.46,
        total: 4311.50
      }
    ],
    status: 'shipped',
    createdAt: '2024-07-08',
    orderDate: '2024-07-08',
    expectedDelivery: '2024-07-15',
    total: 4311.50,
    totalAmount: 4311.50
  },
  {
    id: 'PO-003',
    vendorId: '1',
    vendorName: 'الشركة السعودية للتقنية',
    items: [
      {
        productId: '2',
        productName: 'شاحن سريع USB-C',
        sku: 'UFC-002',
        quantity: 200,
        unitPrice: 93.71,
        total: 18742.00
      }
    ],
    status: 'delivered',
    createdAt: '2024-06-25',
    orderDate: '2024-06-25',
    expectedDelivery: '2024-07-02',
    total: 18742.00,
    totalAmount: 18742.00
  }
];