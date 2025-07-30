import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { getDashboardData } from '@/lib/data';
import { cn } from '@/lib/utils';

export async function MetricCards() {
  const data = await getDashboardData();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data.metrics.map((metric) => (
        <Card key={metric.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric.prefix}{metric.value.toLocaleString()}{metric.suffix}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {metric.changeType === 'increase' ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={cn(
                metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
              )}>
                {Math.abs(metric.change)}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}