'use client';

/**
 * 테스트 컨텐츠 비동기 로드
 *
 * - 백엔드 API 호출 패턴으로 `/api/test-content` fetch (선택 요구사항)
 * - React Query로 캐시·로딩·에러 상태 관리
 */
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
