'use client';

import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '@/lib/data';

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard-data'],
    queryFn: getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // 30 seconds
  });
}