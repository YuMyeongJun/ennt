const LETTERS = ['A', 'B', 'C', 'D'] as const;

export const getChoiceLetter = (index: number): string => {
  return LETTERS[index] ?? String.fromCharCode(65 + index);
};
