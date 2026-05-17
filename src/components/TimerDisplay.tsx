import { formatTime } from '@/lib/formatTime';

/** MM:SS 형식 타이머 표시 */
export interface ITimerDisplayProps {
  seconds: number;
}

export const TimerDisplay = ({ seconds }: ITimerDisplayProps) => {
  return (
    <span className="font-mono text-base font-medium tracking-wide text-neutral-900">
      {formatTime(seconds)}
    </span>
  );
};
