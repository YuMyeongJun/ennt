import cn from 'classnames';
import Link from 'next/link';

export interface IHeaderButtonProps {
  href: string;
  label: string;
  onClick?: () => void;
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
