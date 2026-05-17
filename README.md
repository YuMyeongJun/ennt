# ennt

Socra AI Frontend Engineer 사전과제 — 영어 객관식 테스트 웹 서비스

## Requirements

- Node.js >= 20.9.0 (권장: 22 — `.nvmrc` 참고)
- Yarn

```bash
nvm use   # Node 22 활성화
```

## Install

```bash
yarn
```

## Development

```bash
yarn dev
```

http://localhost:3000 에서 확인합니다.

## Build & Production

```bash
yarn build
yarn start
```

## Lint

```bash
yarn lint
```

## Project Structure

```
src/app/          # Next.js App Router (4 screens + API)
src/components/   # UI components
src/hooks/        # React Query hooks
src/models/       # TypeScript interfaces
src/store/        # Zustand test state (persist)
src/lib/          # Utilities (formatTime MM:SS)
public/data/      # Static test content JSON
```

## Screens

1. `/` — Initial / Start test
2. `/test/solve` — Question set solving
3. `/test/review` — Per-set explanations
4. `/result` — Results analysis
