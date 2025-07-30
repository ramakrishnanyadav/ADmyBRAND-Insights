'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Settings, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: 'Create Campaign',
      description: 'Launch a new marketing campaign',
      icon: Plus,
      action: () => router.push('/campaigns/new')
    },
    {
      title: 'Upload Assets',
      description: 'Add new creative assets',
      icon: Upload,
      action: () => console.log('Upload assets')
    },
    {
      title: 'View Analytics',
      description: 'Detailed performance metrics',
      icon: BarChart3,
      action: () => router.push('/analytics')
    },
    {
      title: 'Settings',
      description: 'Configure your account',
      icon: Settings,
      action: () => router.push('/settings')
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={action.action}
            >
              <action.icon className="h-5 w-5" />
              <div className="text-center">
                <div className="text-sm font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}