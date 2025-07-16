import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProducts } from '@/data/mockData';
import { Search, Plus, Package, DollarSign, BarChart3, Eye, Edit } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';

export const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVendor = selectedVendor === 'all' || product.vendorName === selectedVendor;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesVendor && matchesCategory;
  });

  const vendors = [...new Set(mockProducts.map(p => p.vendorName))];
  const categories = [...new Set(mockProducts.map(p => p.category))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success';
      case 'inactive': return 'bg-muted/10 text-muted-foreground';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage all products across vendors</p>
        </div>
        <Button 
          className="bg-gradient-primary hover:bg-primary-hover shadow-admin"
          onClick={() => navigate('/admin/add-product')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedVendor} onValueChange={setSelectedVendor}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vendors</SelectItem>
                {vendors.map(vendor => (
                  <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="shadow-card hover:shadow-admin transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary-foreground" />
                </div>
                <Badge className={getStatusColor(product.status)}>
                  {product.status}
                </Badge>
              </div>
              <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">SKU</span>
                  <span className="font-mono">{product.sku}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span>{product.category}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Vendor</span>
                  <span className="text-right line-clamp-1">{product.vendorName}</span>
                </div>
              </div>
              
              <div className="pt-3 border-t space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Stock: {product.stock}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 100 ? 'bg-success/10 text-success' :
                    product.stock > 50 ? 'bg-warning/10 text-warning' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {product.stock > 100 ? 'In Stock' :
                     product.stock > 50 ? 'Low Stock' : 'Critical'}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => console.log('View product:', product.id)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-primary hover:bg-primary-hover"
                  onClick={() => console.log('Edit product:', product.id)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};