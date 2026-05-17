import type { ReactNode } from 'react';

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
