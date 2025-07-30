'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Eye, Edit, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const campaigns = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    status: 'active' as const,
    budget: 25000,
    spent: 18750,
    impressions: 245000,
    clicks: 12350,
    conversions: 890,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    targetAudience: 'Adults 25-45'
  },
  {
    id: '2',
    name: 'Q2 Digital Push',
    status: 'completed' as const,
    budget: 15000,
    spent: 15000,
    impressions: 180000,
    clicks: 8900,
    conversions: 650,
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    targetAudience: 'Professionals 30-50'
  },
  {
    id: '3',
    name: 'Holiday Campaign',
    status: 'draft' as const,
    budget: 35000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    targetAudience: 'Families with children'
  }
];

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your marketing campaigns and track their performance.
          </p>
        </div>
        <Link href="/campaigns/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </Link>
      </div>

      {/* Campaign Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <CardDescription>{campaign.targetAudience}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/campaigns/${campaign.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/campaigns/${campaign.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Campaign
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Badge 
                variant={
                  campaign.status === 'active' ? 'default' :
                  campaign.status === 'completed' ? 'secondary' :
                  'outline'
                }
                className="w-fit"
              >
                {campaign.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Budget Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Budget Used</span>
                    <span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                  </div>
                  <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Impressions</p>
                    <p className="font-medium">{campaign.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Clicks</p>
                    <p className="font-medium">{campaign.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Conversions</p>
                    <p className="font-medium">{campaign.conversions}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CTR</p>
                    <p className="font-medium">
                      {campaign.impressions > 0 
                        ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) + '%'
                        : '0%'
                      }
                    </p>
                  </div>
                </div>

                {/* Date Range */}
                <div className="text-xs text-muted-foreground border-t pt-3">
                  {campaign.startDate} - {campaign.endDate}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}