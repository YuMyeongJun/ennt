'use client';

/**
 * 2. 문제 세트 풀이 화면
 *
 * - 상단: 소요 시간(MM:SS) + 정답 확인 버튼
 * - 모든 문항 선택 시에만 정답 확인 활성화
 * - 타이머는 useTestTimer로 풀이 중에만 증가
 */
import { useEffect, useMemo } from 'react';

import { ChoiceOption } from '@/components/test/ChoiceOption';
import { HeaderButton } from '@/components/test/HeaderButton';
import { TestHeader } from '@/components/test/TestHeader';
import { TestScreenLayout } from '@/components/test/TestScreenLayout';
import { useTestContentQuery } from '@/hooks/useTestContentQuery';
import { useTestTimer } from '@/hooks/useTestTimer';
import { getChoiceLetter } from '@/lib/choiceLetter';
import {
  formatQuestionSetTitle,
  formatQuestionTitle,
  getGlobalQuestionNumber,
  getQuestionRangeForSet,
} from '@/lib/questionTitle';
import { useTestStore } from '@/store/testStore';

export default function TestSolvePage() {
  const { data, isLoading, isError } = useTestContentQuery();
  const currentSetIndex = useTestStore((state) => state.currentSetIndex);
  const elapsedSeconds = useTestTimer(true);
  const answers = useTestStore((state) => state.answers);
  const setAnswer = useTestStore((state) => state.setAnswer);
  const phase = useTestStore((state) => state.phase);
  const setPhase = useTestStore((state) => state.setPhase);
  const startSetTimer = useTestStore((state) => state.startSetTimer);
  const commitCurrentSetElapsed = useTestStore((state) => state.commitCurrentSetElapsed);

  const questionSets = data?.questionSets ?? [];
  const questionSet = questionSets[currentSetIndex];
  const { start: setStart, end: setEnd } = getQuestionRangeForSet(questionSets, currentSetIndex);
  const setTitle = questionSet ? formatQuestionSetTitle(setStart, setEnd) : '';

  /** 풀이 화면 진입 시 phase·세트 타이머 기준점 동기화 */
  useEffect(() => {
    if (phase !== 'solving') {
      setPhase('solving');
    }

    startSetTimer();
  }, [currentSetIndex, phase, setPhase, startSetTimer]);

  const allAnswered = useMemo(() => {
    if (!questionSet) {
      return false;
    }

    return questionSet.questions.every((q) => answers[q.id]);
  }, [answers, questionSet]);

  const handleCheck = () => {
    commitCurrentSetElapsed();
    setPhase('review');
  };

  if (isLoading) {
    return <p className="p-8 text-center text-neutral-500">로딩 중...</p>;
  }

  if (isError || !questionSet) {
    return <p className="p-8 text-center text-red-600">문제를 불러올 수 없습니다.</p>;
  }

  return (
    <TestScreenLayout
      header={
        <TestHeader
          elapsedSeconds={elapsedSeconds}
          action={
            <HeaderButton
              href="/test/review"
              label="정답 확인"
              onClick={handleCheck}
              disabled={!allAnswered}
            />
          }
        />
      }
    >
      <h1 className="mb-4 text-lg font-bold text-neutral-900">{setTitle}</h1>

      <p className="mb-8 whitespace-pre-wrap text-sm leading-relaxed text-neutral-800">
        {questionSet.passage}
      </p>

      <div className="flex flex-col gap-10">
        {questionSet.questions.map((question, questionIndex) => (
          <section key={question.id} className="flex flex-col gap-3">
            <h2 className="text-base font-bold text-neutral-900">
              {formatQuestionTitle(
                getGlobalQuestionNumber(questionSets, currentSetIndex, questionIndex),
              )}
            </h2>
            <p className="text-sm text-neutral-800">{question.passage}</p>
            <ul className="mt-1 flex flex-col gap-2">
              {question.choices.map((choice, index) => (
                <li key={choice.id}>
                  <ChoiceOption
                    letter={getChoiceLetter(index)}
                    label={choice.label}
                    variant="solve"
                    isSelected={answers[question.id] === choice.id}
                    onSelect={() => setAnswer(question.id, choice.id)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </TestScreenLayout>
  );
}
