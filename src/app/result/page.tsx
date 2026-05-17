'use client';

import Link from 'next/link';

import { TimerDisplay } from '@/components/TimerDisplay';
import { useTestContentQuery } from '@/hooks/useTestContentQuery';
import { useTestStore } from '@/store/testStore';

export default function ResultPage() {
  const { data } = useTestContentQuery();
  const elapsedSeconds = useTestStore((state) => state.elapsedSeconds);
  const perSetElapsedSeconds = useTestStore((state) => state.perSetElapsedSeconds);
  const answers = useTestStore((state) => state.answers);
  const reset = useTestStore((state) => state.reset);

  const questionSets = data?.questionSets ?? [];

  const correctSetCount = questionSets.filter((set) =>
    set.questions.every((q) => answers[q.id] === q.correctChoiceId),
  ).length;

  const handleRestart = () => {
    reset();
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col bg-white">
      <header className="border-b border-neutral-300 px-4 py-4">
        <h1 className="text-xl font-bold text-neutral-900">Result</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <dl className="mb-6 space-y-3 border-b border-neutral-200 pb-6 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-neutral-600">총 소요 시간</dt>
            <dd className="font-mono font-medium text-neutral-900">
              <TimerDisplay seconds={elapsedSeconds} />
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-neutral-600">문제 세트별 정오답</dt>
            <dd className="font-medium text-neutral-900">
              {correctSetCount}/{questionSets.length}
            </dd>
          </div>
        </dl>

        <ul className="flex flex-col divide-y divide-neutral-200 border border-neutral-300">
          {questionSets.map((set, index) => {
            const correctCount = set.questions.filter(
              (q) => answers[q.id] === q.correctChoiceId,
            ).length;
            const setTime = perSetElapsedSeconds[index] ?? 0;

            return (
              <li
                key={set.id}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-3 text-sm"
              >
                <span className="font-medium text-neutral-900">{set.title}</span>
                <span className="font-mono text-neutral-600">
                  <TimerDisplay seconds={setTime} />
                </span>
                <span className="font-medium text-neutral-900">
                  {correctCount}/{set.questions.length}
                </span>
              </li>
            );
          })}
        </ul>

        <Link
          href="/test/review"
          className="mt-6 block text-center text-sm font-medium text-blue-600 underline"
        >
          해설 다시 보기
        </Link>

        <Link
          href="/"
          onClick={handleRestart}
          className="mt-4 block rounded-full border border-neutral-900 py-3 text-center text-sm font-medium text-neutral-900 hover:bg-neutral-50"
        >
          처음으로
        </Link>
      </div>
    </div>
  );
}
