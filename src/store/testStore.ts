import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TestPhase = 'idle' | 'solving' | 'review' | 'result';

export interface ITestStore {
  phase: TestPhase;
  currentSetIndex: number;
  elapsedSeconds: number;
  perSetElapsedSeconds: number[];
  answers: Record<string, string>;
  setPhase: (phase: TestPhase) => void;
  setCurrentSetIndex: (index: number) => void;
  setElapsedSeconds: (seconds: number) => void;
  setPerSetElapsedSeconds: (seconds: number[]) => void;
  setAnswer: (questionId: string, choiceId: string) => void;
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
