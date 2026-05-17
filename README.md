# ennt

영어 객관식 테스트 웹앱. Next.js App Router + TypeScript + Tailwind.

## 실행

Node 20.9+ (로컬은 22 쓰는 중, `.nvmrc` 참고)

```bash
nvm use
yarn
yarn dev
```

http://localhost:3000

```bash
yarn build
yarn start
yarn lint
```

## 구현 메모

- 문제 데이터: `public/data/test-content.json`, `/api/test-content`로 fetch (로딩 체감용 500ms 딜레이)
- 진행 상태: zustand + `localStorage` (`ennt-test-storage`) — 새로고침해도 이어서 풀 수 있게
- 타이머: 풀이 중에만 증가, 해설·결과에서는 멈춤. 결과 화면 세트별 시간은 `정답 확인` 때 저장

## 제출 zip

```bash
zip -r fe-ennt-성함.zip . \
  -x "node_modules/*" -x ".next/*" -x ".git/*" -x ".cursor/*"
```
