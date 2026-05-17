'use client';

/**
 * 3. 문제 세트별 해설 화면
 *
 * - 타이머: 풀이 화면과 동일 값 표시, 증가하지 않음 (useTestTimer 미사용)
 * - 문항별 정답/오답 라벨, 선택지 색상(빨강 오답 / 파랑 정답)
 * - 마지막 세트: 테스트 종료 → 결과 / 그 외: 다음 문제 → 풀이
 */
import { ChoiceOption } from '@/components/test/ChoiceOption';
import { HeaderButton } from '@/components/test/HeaderButton';
import { MarkdownText } from '@/components/MarkdownText';
import { TestHeader } from '@/components/test/TestHeader';
import { TestScreenLayout } from '@/components/test/TestScreenLayout';
import { useTestContentQuery } from '@/hooks/useTestContentQuery';
import { getChoiceLetter } from '@/lib/choiceLetter';
import { useTestStore } from '@/store/testStore';

export default function TestReviewPage() {
  const { data, isLoading } = useTestContentQuery();
  const currentSetIndex = useTestStore((state) => state.currentSetIndex);
  const elapsedSeconds = useTestStore((state) => state.elapsedSeconds);
  const answers = useTestStore((state) => state.answers);
  const setPhase = useTestStore((state) => state.setPhase);
  const setCurrentSetIndex = useTestStore((state) => state.setCurrentSetIndex);

  const questionSet = data?.questionSets[currentSetIndex];
  const isLastSet = data ? currentSetIndex >= data.questionSets.length - 1 : true;

  const handleNext = () => {
    setCurrentSetIndex(currentSetIndex + 1);
    setPhase('solving');
  };

  const handleFinish = () => {
    setPhase('result');
  };

  if (isLoading || !questionSet) {
    return <p className="p-8 text-center text-neutral-500">로딩 중...</p>;
  }

  return (
    <TestScreenLayout
      header={
        <TestHeader
          elapsedSeconds={elapsedSeconds}
          action={
            isLastSet ? (
              <HeaderButton href="/result" label="테스트 종료" onClick={handleFinish} />
            ) : (
              <HeaderButton href="/test/solve" label="다음 문제" onClick={handleNext} />
            )
          }
        />
      }
    >
      <h1 className="mb-4 text-lg font-bold text-neutral-900">{questionSet.title}</h1>

      <p className="mb-6 whitespace-pre-wrap text-sm leading-relaxed text-neutral-800">
        {questionSet.passage}
      </p>

      <div className="mb-8 rounded border border-neutral-200 bg-neutral-50 p-3 text-sm">
        <MarkdownText content={questionSet.explanation} />
      </div>

      <div className="flex flex-col gap-10">
        {questionSet.questions.map((question) => {
          const isQuestionCorrect = answers[question.id] === question.correctChoiceId;

          return (
            <section key={question.id} className="flex flex-col gap-3">
              <h2 className="text-base font-bold text-neutral-900">
                {question.title}{' '}
                <span
                  className={
                    isQuestionCorrect ? 'font-bold text-blue-600' : 'font-bold text-red-600'
                  }
                >
                  {isQuestionCorrect ? '정답' : '오답'}
                </span>
              </h2>
              <p className="text-sm text-neutral-800">{question.passage}</p>
              <ul className="mt-1 flex flex-col gap-2">
                {question.choices.map((choice, index) => {
                  const isSelected = answers[question.id] === choice.id;
                  const isCorrect = choice.id === question.correctChoiceId;

                  return (
                    <li key={choice.id}>
                      <ChoiceOption
                        letter={getChoiceLetter(index)}
                        label={choice.label}
                        variant="review"
                        showAsWrong={isSelected && !isCorrect}
                        showAsCorrect={isCorrect}
                      />
                    </li>
                  );
                })}
              </ul>
              <div className="mt-2 border-t border-neutral-200 pt-3 text-sm text-neutral-800">
                <MarkdownText content={question.explanation} />
              </div>
            </section>
          );
        })}
      </div>
    </TestScreenLayout>
  );
}
