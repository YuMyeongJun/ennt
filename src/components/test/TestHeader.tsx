import { TimerDisplay } from '@/components/TimerDisplay';

/** 와이어프레임 상단 바: 좌측 MM:SS, 우측 액션 버튼 */
export interface ITestHeaderProps {
  elapsedSeconds: number;
  action: React.ReactNode;
}

export const TestHeader = ({ elapsedSeconds, action }: ITestHeaderProps) => {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-neutral-300 bg-white px-4 py-3">
      <TimerDisplay seconds={elapsedSeconds} />
      {action}
    </header>
  );
};
