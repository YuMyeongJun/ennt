/**
 * GET /api/test-content
 *
 * 실제 백엔드 대신 public JSON을 읽어 반환합니다.
 * 500ms 지연으로 비동기 로딩 UX를 시뮬레이션합니다 (선택 요구사항).
 */
import { readFile } from 'fs/promises';
import path from 'path';

import { NextResponse } from 'next/server';

const FETCH_DELAY_MS = 500;

export const GET = async () => {
  await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY_MS));

  const filePath = path.join(process.cwd(), 'public', 'data', 'test-content.json');
  const file = await readFile(filePath, 'utf-8');

  return NextResponse.json(JSON.parse(file));
};
