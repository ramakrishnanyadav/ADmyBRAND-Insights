import { Suspense } from 'react';
import { Metadata } from 'next';
import { MetricCards } from '@/components/dashboard/metric-cards';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { TrafficSourceChart } from '@/components/dashboard/traffic-source-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

export const metadata: Metadata = {
  title: 'Dashboard - ADmyBRAND Insights',
  description: 'Analytics dashboard for digital marketing agencies',
};

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your campaigns.
          </p>
        </div>
      </div>
      
      <Suspense fallback={<LoadingSkeleton />}>
        <MetricCards />
      </Suspense>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div className="h-[400px] bg-muted animate-pulse rounded-lg" />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<div className="h-[400px] bg-muted animate-pulse rounded-lg" />}>
          <TrafficSourceChart />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div className="h-[400px] bg-muted animate-pulse rounded-lg" />}>
          <RecentActivity />
        </Suspense>
        <QuickActions />
      </div>
    </div>
  );
}