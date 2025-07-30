export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'manager';
  lastActive: Date;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: Date;
  endDate: Date;
  targetAudience: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'active' | 'inactive' | 'pending';
  totalSpent: number;
  lastOrderDate: Date;
  avatar?: string;
  location: string;
}

export interface MetricData {
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  prefix?: string;
  suffix?: string;
}

export interface ChartData {
  name: string;
  value: number;
  previousValue?: number;
  date?: string;
}

export interface Activity {
  id: string;
  type: 'campaign_created' | 'customer_added' | 'order_completed' | 'budget_updated';
  title: string;
  description: string;
  timestamp: Date;
  user: string;
  status: 'success' | 'warning' | 'error';
}

export interface DashboardData {
  metrics: MetricData[];
  revenueChart: ChartData[];
  trafficSources: ChartData[];
  recentActivity: Activity[];
  topCampaigns: Campaign[];
  topCustomers: Customer[];
}