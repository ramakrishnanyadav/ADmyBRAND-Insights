'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Plus, Filter } from 'lucide-react';

const customers = [
  {
    id: '1',
    name: 'TechCorp Inc.',
    email: 'contact@techcorp.com',
    company: 'TechCorp Inc.',
    status: 'active' as const,
    totalSpent: 45780,
    lastOrderDate: '2024-01-15',
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'Design Studio Pro',
    email: 'hello@designstudio.com',
    company: 'Design Studio Pro',
    status: 'active' as const,
    totalSpent: 32450,
    lastOrderDate: '2024-01-12',
    location: 'New York, NY'
  },
  {
    id: '3',
    name: 'Marketing Solutions',
    email: 'info@marketingsol.com',
    company: 'Marketing Solutions',
    status: 'inactive' as const,
    totalSpent: 18900,
    lastOrderDate: '2023-12-08',
    location: 'Chicago, IL'
  }
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer relationships and track their engagement.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            {filteredCustomers.length} customers found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{customer.name}</h3>
                      <Badge 
                        variant={customer.status === 'active' ? 'default' : 'secondary'}
                      >
                        {customer.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                    <p className="text-xs text-muted-foreground">{customer.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${customer.totalSpent.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total spent</p>
                  <p className="text-xs text-muted-foreground">
                    Last order: {customer.lastOrderDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}