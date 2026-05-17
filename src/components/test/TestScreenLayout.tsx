import type { ReactNode } from 'react';

/** 풀이·해설 화면 공통 레이아웃 (고정 헤더 + 스크롤 본문, 모바일 폭 420px) */
export interface ITestScreenLayoutProps {
  header: ReactNode;
  children: ReactNode;
}

export const TestScreenLayout = ({ header, children }: ITestScreenLayoutProps) => {
  return (
    <div className="mx-auto flex h-full min-h-dvh w-full max-w-[420px] flex-col bg-white">
      {header}
      <div className="flex-1 overflow-y-auto border-x border-neutral-300 bg-white px-4 py-5">
        {children}
      </div>
    </div>
  );
};
