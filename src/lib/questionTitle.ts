import type { IQuestionSet } from '@/models/ITestContent';

/** 문제 세트 제목: Question 1-3 */
export const formatQuestionSetTitle = (start: number, end: number): string => {
  if (start === end) {
    return `Question ${start}`;
  }

  return `Question ${start}-${end}`;
};

/** 문항 제목: Question 1 */
export const formatQuestionTitle = (number: number): string => {
  return `Question ${number}`;
};

/** 세트 인덱스 기준 전체 테스트에서의 문항 번호 범위 (1-based) */
export const getQuestionRangeForSet = (
  questionSets: IQuestionSet[],
  setIndex: number,
): { start: number; end: number } => {
  let start = 1;

  for (let i = 0; i < setIndex; i++) {
    start += questionSets[i]?.questions.length;
  }

  const count = questionSets[setIndex]?.questions.length ?? 0;

  if (count === 0) {
    return { start: 0, end: 0 };
  }

  const end = start + count - 1;

  return { start, end };
};

/** 세트 내 문항의 전체 테스트 기준 문항 번호 */
export const getGlobalQuestionNumber = (
  questionSets: IQuestionSet[],
  setIndex: number,
  questionIndexInSet: number,
): number => {
  const { start } = getQuestionRangeForSet(questionSets, setIndex);
  return start + questionIndexInSet;
};
