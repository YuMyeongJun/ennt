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
  /** 현재 세트 풀이 시작 시점의 누적 시간(초) — 세트별 소요 시간 계산용 */
  setSolveStartElapsed: number;
  /** 현재 세트 풀이 시작 시각(ms) — elapsed 타이머와 독립적으로 세트 시간 기록 */
  setSolveStartedAt: number | null;
  /** startSetTimer가 적용된 세트 인덱스 (중도 이탈 후 같은 세트 재진입 시 기준점 유지) */
  setSolveStartSetIndex: number | null;
  /** 세트별 소요 시간(초). 결과 화면 집계용 */
  perSetElapsedSeconds: number[];
  /** questionId → choiceId 매핑 */
  answers: Record<string, string>;
  setPhase: (phase: TestPhase) => void;
  setCurrentSetIndex: (index: number) => void;
  setElapsedSeconds: (seconds: number) => void;
  setAnswer: (questionId: string, choiceId: string) => void;
  /** 세트 풀이 시작 시 호출 (타이머 기준점 저장) */
  startSetTimer: () => void;
  /** 정답 확인 시 호출 — 현재 세트 소요 시간을 perSetElapsedSeconds에 기록 */
  commitCurrentSetElapsed: () => void;
  /** 테스트 시작 시 초기화 */
  reset: () => void;
}

const initialState = {
  phase: 'idle' as TestPhase,
  currentSetIndex: 0,
  elapsedSeconds: 0,
  setSolveStartElapsed: 0,
  setSolveStartedAt: null as number | null,
  setSolveStartSetIndex: null as number | null,
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
      setAnswer: (questionId, choiceId) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: choiceId },
        })),
      startSetTimer: () =>
        set((state) => {
          if (state.setSolveStartSetIndex === state.currentSetIndex) {
            return {};
          }

          return {
            setSolveStartElapsed: state.elapsedSeconds,
            setSolveStartedAt: Date.now(),
            setSolveStartSetIndex: state.currentSetIndex,
          };
        }),
      commitCurrentSetElapsed: () =>
        set((state) => {
          if (state.perSetElapsedSeconds[state.currentSetIndex] !== undefined) {
            return { setSolveStartSetIndex: null, setSolveStartedAt: null };
          }

          const durationFromWallClock =
            state.setSolveStartedAt !== null
              ? Math.floor((Date.now() - state.setSolveStartedAt) / 1000)
              : Math.max(0, state.elapsedSeconds - state.setSolveStartElapsed);
          const duration = Math.max(0, durationFromWallClock);
          const perSetElapsedSeconds = [...state.perSetElapsedSeconds];
          perSetElapsedSeconds[state.currentSetIndex] = duration;

          return {
            perSetElapsedSeconds,
            setSolveStartSetIndex: null,
            setSolveStartedAt: null,
          };
        }),
      reset: () => set(initialState),
    }),
    { name: 'ennt-test-storage' },
  ),
);
