'use client';

import { useEffect } from 'react';

import { useTestStore } from '@/store/testStore';

export const useTestTimer = (isRunning: boolean) => {
  const phase = useTestStore((state) => state.phase);

  useEffect(() => {
    if (!isRunning || phase !== 'solving') {
      return;
    }

    const interval = setInterval(() => {
      useTestStore.setState((state) => ({
        elapsedSeconds: state.elapsedSeconds + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, phase]);

  return useTestStore((state) => state.elapsedSeconds);
};
