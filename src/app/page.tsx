'use client';

/**
 * 1. 초기 화면
 * - 테스트 시작 버튼 → 문제 세트 풀이 화면
 * - 진입 시 컨텐츠 prefetch (useTestContentQuery)
 */
import Link from 'next/link';

import { useTestContentQuery } from '@/hooks/useTestContentQuery';
import { useTestStore } from '@/store/testStore';

export default function HomePage() {
  const { isLoading, isError } = useTestContentQuery();
  const setPhase = useTestStore((state) => state.setPhase);
  const reset = useTestStore((state) => state.reset);

  const handleStart = () => {
    reset();
    setPhase('solving');
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col items-center justify-center bg-white px-6">
      {isLoading && <p className="mb-4 text-sm text-neutral-500">로딩 중...</p>}
      {isError && <p className="mb-4 text-sm text-red-600">컨텐츠를 불러오지 못했습니다.</p>}
      <Link
        href="/test/solve"
        onClick={handleStart}
        className="rounded-full border-2 border-neutral-900 px-10 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-50"
      >
        테스트 시작
      </Link>
    </div>
  );
};
