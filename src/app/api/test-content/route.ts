import { readFile } from 'fs/promises';
import path from 'path';

import { NextResponse } from 'next/server';

export const GET = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const filePath = path.join(process.cwd(), 'public', 'data', 'test-content.json');
  const file = await readFile(filePath, 'utf-8');

  return NextResponse.json(JSON.parse(file));
};
