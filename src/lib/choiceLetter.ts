/** 선택지 인덱스 → 와이어프레임 표기 (A), (B), (C), (D) */
const LETTERS = ['A', 'B', 'C', 'D'] as const;

export const getChoiceLetter = (index: number): string => {
  return LETTERS[index] ?? String.fromCharCode(65 + index);
};
