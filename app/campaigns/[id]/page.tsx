import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Edit, Play, Pause, Archive } from 'lucide-react';
import Link from 'next/link';

// Mock data for demonstration
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
    targetAudience: 'Adults 25-45',
    description: 'A comprehensive summer campaign targeting seasonal shoppers with attractive discounts and promotions.',
    platforms: ['Google Ads', 'Facebook', 'Instagram'],
    objectives: ['Brand Awareness', 'Lead Generation', 'Sales']
  }
];

async function getCampaign(id: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  return campaigns.find(c => c.id === id) || null;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const campaign = await getCampaign(params.id);
  if (!campaign) return { title: 'Campaign Not Found' };
  
  return {
    title: `${campaign.name} - Campaigns`,
    description: `Campaign details for ${campaign.name}`
  };
}

export default async function CampaignPage({ params }: { params: { id: string } }) {
  const campaign = await getCampaign(params.id);
  
  if (!campaign) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
          <p className="text-muted-foreground">{campaign.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/campaigns/${campaign.id}/edit`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button>
            {campaign.status === 'active' ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Resume
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Campaign Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Campaign Overview</CardTitle>
            <Badge 
              variant={
                campaign.status === 'active' ? 'default' :
                campaign.status === 'completed' ? 'secondary' :
                'outline'
              }
            >
              {campaign.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="text-2xl font-bold">${campaign.budget.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Spent</p>
              <p className="text-2xl font-bold">${campaign.spent.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold">${(campaign.budget - campaign.spent).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Budget Used</p>
              <p className="text-2xl font-bold">{((campaign.spent / campaign.budget) * 100).toFixed(1)}%</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Budget Progress</span>
              <span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
            </div>
            <Progress value={(campaign.spent / campaign.budget) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Impressions</CardTitle>
            <CardDescription>Total ad views</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{campaign.impressions.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Clicks</CardTitle>
            <CardDescription>Total ad clicks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{campaign.clicks.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">
              CTR: {((campaign.clicks / campaign.impressions) * 100).toFixed(2)}%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conversions</CardTitle>
            <CardDescription>Total conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{campaign.conversions}</div>
            <div className="text-sm text-muted-foreground">
              CVR: {((campaign.conversions / campaign.clicks) * 100).toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Target Audience</p>
              <p className="text-sm text-muted-foreground">{campaign.targetAudience}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Campaign Period</p>
              <p className="text-sm text-muted-foreground">
                {campaign.startDate} - {campaign.endDate}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Platforms</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {campaign.platforms.map((platform) => (
                  <Badge key={platform} variant="outline">{platform}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Objectives</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {campaign.objectives.map((objective) => (
                  <Badge key={objective} variant="secondary">{objective}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Campaign activated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Daily budget increased to $1000</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New ad creative added</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}