import cn from 'classnames';

export type ChoiceVariant = 'solve' | 'review';

export interface IChoiceOptionProps {
  letter: string;
  label: string;
  variant: ChoiceVariant;
  isSelected?: boolean;
  showAsWrong?: boolean;
  showAsCorrect?: boolean;
  onSelect?: () => void;
}

export const ChoiceOption = ({
  letter,
  label,
  variant,
  isSelected = false,
  showAsWrong = false,
  showAsCorrect = false,
  onSelect,
}: IChoiceOptionProps) => {
  const isSolve = variant === 'solve';

  const circleClass = cn(
    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold',
    isSolve && isSelected && 'border-neutral-900 bg-neutral-900 text-white',
    isSolve && !isSelected && 'border-neutral-400 bg-white text-neutral-900',
    !isSolve && showAsWrong && 'border-red-600 bg-red-600 text-white',
    !isSolve && showAsCorrect && 'border-blue-600 bg-blue-600 text-white',
    !isSolve && !showAsWrong && !showAsCorrect && 'border-neutral-300 bg-white text-neutral-500',
  );

  const content = (
    <>
      <span className={circleClass}>({letter})</span>
      <span className="text-sm leading-snug text-neutral-900">{label}</span>
    </>
  );

  if (isSolve && onSelect) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-start gap-3 py-1 text-left"
      >
        {content}
      </button>
    );
  }

  return <div className="flex items-start gap-3 py-1">{content}</div>;
};
