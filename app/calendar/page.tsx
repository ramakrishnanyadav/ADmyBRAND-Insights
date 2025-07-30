'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const events = [
  {
    id: '1',
    title: 'Summer Sale Campaign Launch',
    date: new Date(2024, 5, 15),
    type: 'campaign',
    status: 'active'
  },
  {
    id: '2',
    title: 'Q2 Performance Review',
    date: new Date(2024, 5, 20),
    type: 'meeting',
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Holiday Campaign Planning',
    date: new Date(2024, 5, 25),
    type: 'planning',
    status: 'scheduled'
  }
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const selectedDateEvents = events.filter(event => 
    event.date.toDateString() === selectedDate?.toDateString()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Schedule and track your marketing campaigns and events.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Campaign Calendar</CardTitle>
            <CardDescription>View and manage your campaign schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                event: events.map(e => e.date)
              }}
              modifiersStyles={{
                event: { 
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))'
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Events for Selected Date */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? selectedDate.toLocaleDateString() : 'Select a Date'}
            </CardTitle>
            <CardDescription>
              {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''} scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map(event => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge 
                        variant={event.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No events scheduled for this date.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your next scheduled campaigns and meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {event.date.toLocaleDateString()} • {event.type}
                  </p>
                </div>
                <Badge 
                  variant={event.status === 'active' ? 'default' : 'secondary'}
                >
                  {event.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}