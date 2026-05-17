'use client';

/**
 * 테스트 소요 시간 타이머
 *
 * - phase === 'solving' 일 때만 1초마다 elapsedSeconds 증가
 * - 해설(review) 화면에서는 증가하지 않음 (과제 명세)
 */
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
