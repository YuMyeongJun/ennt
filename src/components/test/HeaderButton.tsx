'use client';

import cn from 'classnames';
import { useRouter } from 'next/navigation';

/** 헤더 우측 pill 버튼 (정답 확인 / 다음 문제 / 테스트 종료) */
export interface IHeaderButtonProps {
  href: string;
  label: string;
  onClick?: () => void;
  /** 미응답 시 정답 확인 비활성화 */
  disabled?: boolean;
}

export const HeaderButton = ({ href, label, onClick, disabled = false }: IHeaderButtonProps) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    onClick?.();
    router.push(href);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'rounded-full border border-neutral-900 px-4 py-1.5 text-sm font-medium text-neutral-900',
        disabled
          ? 'cursor-not-allowed border-neutral-300 text-neutral-400'
          : 'hover:bg-neutral-100',
      )}
    >
      {label}
    </button>
  );
};
