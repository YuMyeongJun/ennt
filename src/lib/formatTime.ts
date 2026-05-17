/**
 * 초 단위 시간을 과제 명세 형식 MM:SS 로 변환
 * @example formatTime(89) → "01:29"
 */
export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
