/**
 * 테스트 진행 상태 전역 스토어
 *
 * - zustand + persist: 중도 이탈 후 재진입 시 선택지·타이머·진행 세트 복원 (선택 요구사항)
 * - localStorage 키: ennt-test-storage
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** 화면 흐름: 초기 → 풀이 → 해설 → 결과 */
export type TestPhase = 'idle' | 'solving' | 'review' | 'result';

export interface ITestStore {
  /** 현재 테스트 단계 */
  phase: TestPhase;
  /** 풀이/해설 중인 문제 세트 인덱스 (0-based) */
  currentSetIndex: number;
  /** 테스트 시작 후 누적 소요 시간(초). 해설 화면에서는 증가하지 않음 */
  elapsedSeconds: number;
  /** 세트별 소요 시간(초). 결과 화면 집계용 */
  perSetElapsedSeconds: number[];
  /** questionId → choiceId 매핑 */
  answers: Record<string, string>;
  setPhase: (phase: TestPhase) => void;
  setCurrentSetIndex: (index: number) => void;
  setElapsedSeconds: (seconds: number) => void;
  setPerSetElapsedSeconds: (seconds: number[]) => void;
  setAnswer: (questionId: string, choiceId: string) => void;
  /** 테스트 시작 시 초기화 */
  reset: () => void;
}

const initialState = {
  phase: 'idle' as TestPhase,
  currentSetIndex: 0,
  elapsedSeconds: 0,
  perSetElapsedSeconds: [] as number[],
  answers: {} as Record<string, string>,
};

export const useTestStore = create<ITestStore>()(
  persist(
    (set) => ({
      ...initialState,
      setPhase: (phase) => set({ phase }),
      setCurrentSetIndex: (currentSetIndex) => set({ currentSetIndex }),
      setElapsedSeconds: (elapsedSeconds) => set({ elapsedSeconds }),
      setPerSetElapsedSeconds: (perSetElapsedSeconds) => set({ perSetElapsedSeconds }),
      setAnswer: (questionId, choiceId) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: choiceId },
        })),
      reset: () => set(initialState),
    }),
    { name: 'ennt-test-storage' },
  ),
);
