import { DashboardData, Campaign, Customer, User } from './types';

// Mock user data
export const currentUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@admybrand.com',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
  role: 'admin',
  lastActive: new Date()
};

// Mock dashboard data
export async function getDashboardData(): Promise<DashboardData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    metrics: [
      {
        name: 'Total Revenue',
        value: 245892,
        change: 12.5,
        changeType: 'increase',
        prefix: '$'
      },
      {
        name: 'Active Campaigns',
        value: 23,
        change: -2.1,
        changeType: 'decrease'
      },
      {
        name: 'Total Customers',
        value: 1247,
        change: 8.3,
        changeType: 'increase'
      },
      {
        name: 'Conversion Rate',
        value: 3.24,
        change: 0.5,
        changeType: 'increase',
        suffix: '%'
      }
    ],
    revenueChart: [
      { name: 'Jan', value: 18500, previousValue: 16200 },
      { name: 'Feb', value: 21300, previousValue: 19800 },
      { name: 'Mar', value: 19800, previousValue: 21000 },
      { name: 'Apr', value: 24500, previousValue: 18900 },
      { name: 'May', value: 26700, previousValue: 23400 },
      { name: 'Jun', value: 28900, previousValue: 25100 }
    ],
    trafficSources: [
      { name: 'Organic Search', value: 45 },
      { name: 'Social Media', value: 28 },
      { name: 'Direct', value: 15 },
      { name: 'Referral', value: 8 },
      { name: 'Email', value: 4 }
    ],
    recentActivity: [
      {
        id: '1',
        type: 'campaign_created',
        title: 'New Campaign Created',
        description: 'Summer Sale 2024 campaign has been created and is pending approval',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        user: 'Mike Chen',
        status: 'success'
      },
      {
        id: '2',
        type: 'customer_added',
        title: 'New Customer Registered',
        description: 'TechCorp Inc. has joined as a premium customer',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        user: 'System',
        status: 'success'
      },
      {
        id: '3',
        type: 'budget_updated',
        title: 'Campaign Budget Updated',
        description: 'Q2 Digital campaign budget increased by $5,000',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        user: 'Sarah Johnson',
        status: 'warning'
      }
    ],
    topCampaigns: [],
    topCustomers: []
  };
}

export async function getCampaigns(): Promise<Campaign[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    {
      id: '1',
      name: 'Summer Sale 2024',
      status: 'active',
      budget: 25000,
      spent: 18750,
      impressions: 245000,
      clicks: 12350,
      conversions: 890,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
      targetAudience: 'Adults 25-45'
    },
    {
      id: '2',
      name: 'Q2 Digital Push',
      status: 'completed',
      budget: 15000,
      spent: 15000,
      impressions: 180000,
      clicks: 8900,
      conversions: 650,
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-06-30'),
      targetAudience: 'Professionals 30-50'
    }
  ];
}

export async function getCampaign(id: string): Promise<Campaign | null> {
  const campaigns = await getCampaigns();
  return campaigns.find(c => c.id === id) || null;
}

export async function getCustomers(): Promise<Customer[]> {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return [
    {
      id: '1',
      name: 'TechCorp Inc.',
      email: 'contact@techcorp.com',
      company: 'TechCorp Inc.',
      status: 'active',
      totalSpent: 45780,
      lastOrderDate: new Date('2024-01-15'),
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      name: 'Design Studio Pro',
      email: 'hello@designstudio.com',
      company: 'Design Studio Pro',
      status: 'active',
      totalSpent: 32450,
      lastOrderDate: new Date('2024-01-12'),
      location: 'New York, NY'
    }
  ];
}