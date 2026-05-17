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

## Git

로컬 저장소는 `main` 브랜치로 초기화되어 있습니다.

```bash
# 상태 확인
git status
git log --oneline -5
```

### GitHub 원격 연결 (최초 1회)

1. [GitHub](https://github.com/new)에서 저장소 생성 (이름 예: `socra-ai`, Private 권장)
2. 아래 명령으로 원격 추가 후 푸시:

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/socra-ai.git
git push -u origin main
```

이미 원격이 있으면:

```bash
git remote -v
git push
```

### 과제 제출용 zip

```bash
# node_modules, .next/cache 제외 후 프로젝트 폴더 압축
zip -r fe-ennt-성함.zip . \
  -x "node_modules/*" -x ".next/cache/*" -x ".git/*"
```
