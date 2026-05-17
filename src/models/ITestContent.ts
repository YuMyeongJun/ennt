/**
 * API / JSON에서 내려오는 테스트 컨텐츠 타입 정의
 *
 * 과제 정책:
 * - questionSets: 최소 3, 최대 10개
 * - questions per set: 최소 2, 최대 4개
 * - choices per question: 최소 2, 최대 4개, 정답 1개
 */

/** 선택지 (A, B, C, D) */
export interface IChoice {
  id: string;
  label: string;
}

/** 개별 문항 (제목 Question {n}은 UI에서 자동 생성) */
export interface IQuestion {
  id: string;
  /** 문항 지문 (plain text) */
  passage: string;
  choices: IChoice[];
  /** 정답 choice id */
  correctChoiceId: string;
  /** 문항 해설 (마크다운: 개행, bold, italic) */
  explanation: string;
}

/** 문제 세트 — 공통 지문 + 복수 문항 */
export interface IQuestionSet {
  id: string;
  /** 세트 공통 지문 (plain text). 제목 Question {N-M}은 UI에서 자동 생성 */
  passage: string;
  /** 세트 공통 해설 (마크다운) */
  explanation: string;
  questions: IQuestion[];
}

export interface ITestContent {
  questionSets: IQuestionSet[];
}
