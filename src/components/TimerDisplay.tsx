import { formatTime } from '@/lib/formatTime';

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
