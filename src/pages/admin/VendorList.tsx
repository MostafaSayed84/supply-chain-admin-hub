import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockVendors } from '@/data/mockData';
import { Search, Plus, Building2, Phone, Mail, MapPin, Eye, Settings } from 'lucide-react';

export const VendorList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredVendors = mockVendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'inactive': return 'bg-muted/10 text-muted-foreground';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendors</h1>
          <p className="text-muted-foreground">Manage your vendor relationships and registrations</p>
        </div>
        <Button 
          className="bg-gradient-primary hover:bg-primary-hover shadow-admin"
          onClick={() => navigate('/admin/add-vendor')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search vendors by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id} className="shadow-card hover:shadow-admin transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    <Badge className={getStatusColor(vendor.status)}>
                      {vendor.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {vendor.email}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                {vendor.phone}
              </div>
              
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span className="line-clamp-2">{vendor.address}</span>
              </div>
              
              <div className="pt-3 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Products</span>
                  <span className="font-medium">{vendor.productsCount}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="text-muted-foreground">Joined</span>
                  <span className="font-medium">{new Date(vendor.registrationDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => console.log('View vendor details:', vendor.id)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-primary hover:bg-primary-hover"
                  onClick={() => console.log('Manage vendor:', vendor.id)}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No vendors found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or add a new vendor.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};