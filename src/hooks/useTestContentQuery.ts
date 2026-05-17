'use client';

import { useQuery } from '@tanstack/react-query';

import type { ITestContent } from '@/models/ITestContent';

const fetchTestContent = async (): Promise<ITestContent> => {
  const response = await fetch('/api/test-content');

  if (!response.ok) {
    throw new Error('Failed to fetch test content');
  }

  return response.json();
};

export const useTestContentQuery = () => {
  return useQuery({
    queryKey: ['test-content'],
    queryFn: fetchTestContent,
  });
};
