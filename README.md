### only openai

```ts
// 메인 목표: 리더십 있는 전문가, 서브 목표: 바른 몸과 마음
[ '운동하기', '명상하기', '지식 습득하기' ]
[ '운동', '식단 관리', '스트레스 관리' ]
[ '규칙적인 운동', '균형 잡힌 식사', '감정 관리 기법 연습' ]
```

### with langchain

```ts
// 메인 목표: 리더십 있는 전문가, 서브 목표: 바른 몸과 마음
[ '리더십 역량 강화하기', '특기를 갖추기 위해 열심히 공부하기', '올바른 생활 습관 연마하기' ]
[ '리더십 도입 방법 찾기', '자기관리 연습하기', '바른 몸과 마음 유지하기' ]
[ '리더십 스킬 강화하기', '건강한 몸과 마음 구축하기', '연구 및 읽기로 지식 배우기' ]
```

가끔씩 응답에 올바른 결과값이 있어도 파싱에 실패하는데, 이런 경우 OutputFixParser로 한 번 더 파싱하면 제대로 된 결과를 얻을 수 있음

```bash
OutputParserException [Error]: Failed to parse. Text: "
Here is the output:
```json
{"tasks":["운동하기","건강한 식사를 하기","자연과 산책하기"]}
``". Error: SyntaxError: Unexpected token ` in JSON at position 44
    at StructuredOutputParser.parse (/Users/study/mandalart-suggestion/node_modules/langchain/dist/output_parsers/structured.cjs:58:19)
    at createSuggestions (/Users/study/mandalart-suggestion/src/model/base-langchain.ts:29:39)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  output: '\nHere is the output:\n```json\n{"tasks":["운동하기","건강한 식사를 하기","자연과 산책하기"]}\n``'
} try to fix this output
[ '운동하기', '건강한 식사를 하기', '자연과 산책하기' ]

```
