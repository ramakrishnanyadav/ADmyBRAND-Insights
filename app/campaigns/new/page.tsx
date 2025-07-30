'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewCampaignPage() {
  const router = useRouter();
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    budget: '',
    targetAudience: '',
    objectives: [] as string[],
    platforms: [] as string[]
  });

  const objectives = [
    'Brand Awareness',
    'Lead Generation',
    'Sales',
    'Website Traffic',
    'App Installs',
    'Customer Retention'
  ];

  const platforms = [
    'Google Ads',
    'Facebook',
    'Instagram',
    'LinkedIn',
    'Twitter',
    'TikTok',
    'YouTube'
  ];

  const handleObjectiveChange = (objective: string, checked: boolean) => {
    setCampaignData(prev => ({
      ...prev,
      objectives: checked 
        ? [...prev.objectives, objective]
        : prev.objectives.filter(o => o !== objective)
    }));
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setCampaignData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Campaign data:', campaignData);
    router.push('/campaigns');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Campaign</h1>
          <p className="text-muted-foreground">
            Set up a new marketing campaign with your objectives and target audience.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the fundamental details about your campaign.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter campaign name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={campaignData.budget}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="10000"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={campaignData.description}
                onChange={(e) => setCampaignData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your campaign goals and strategy..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                value={campaignData.targetAudience}
                onChange={(e) => setCampaignData(prev => ({ ...prev, targetAudience: e.target.value }))}
                placeholder="e.g., Adults 25-45, Tech enthusiasts"
              />
            </div>
          </CardContent>
        </Card>

        {/* Campaign Objectives */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Objectives</CardTitle>
            <CardDescription>
              Select the primary goals for this campaign.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {objectives.map((objective) => (
                <div key={objective} className="flex items-center space-x-2">
                  <Checkbox
                    id={objective}
                    checked={campaignData.objectives.includes(objective)}
                    onCheckedChange={(checked) => 
                      handleObjectiveChange(objective, checked as boolean)
                    }
                  />
                  <Label htmlFor={objective} className="text-sm font-normal">
                    {objective}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platforms */}
        <Card>
          <CardHeader>
            <CardTitle>Advertising Platforms</CardTitle>
            <CardDescription>
              Choose where you want to run your campaign.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platforms.map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform}
                    checked={campaignData.platforms.includes(platform)}
                    onCheckedChange={(checked) => 
                      handlePlatformChange(platform, checked as boolean)
                    }
                  />
                  <Label htmlFor={platform} className="text-sm font-normal">
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaign Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Schedule</CardTitle>
            <CardDescription>
              Set the start and end dates for your campaign.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DateRangePicker />
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </form>
    </div>
  );
}