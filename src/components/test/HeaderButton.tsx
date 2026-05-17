import cn from 'classnames';
import Link from 'next/link';

/** 헤더 우측 pill 버튼 (정답 확인 / 다음 문제 / 테스트 종료) */
export interface IHeaderButtonProps {
  href: string;
  label: string;
  onClick?: () => void;
  /** 미응답 시 정답 확인 비활성화 */
  disabled?: boolean;
}

export const HeaderButton = ({ href, label, onClick, disabled = false }: IHeaderButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-disabled={disabled}
      className={cn(
        'rounded-full border border-neutral-900 px-4 py-1.5 text-sm font-medium text-neutral-900',
        disabled
          ? 'pointer-events-none border-neutral-300 text-neutral-400'
          : 'hover:bg-neutral-100',
      )}
    >
      {label}
    </Link>
  );
};
