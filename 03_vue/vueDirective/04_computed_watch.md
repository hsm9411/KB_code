# computed vs methods vs watch

셋 다 "data를 가지고 뭔가 한다"는 점은 같지만 목적이 다르다.

---

## 한눈에 비교

```
              methods          computed          watch
───────────  ───────────────  ───────────────  ───────────────
언제 실행?    호출할 때마다     의존 data 변경시   감시 data 변경시
캐싱?         없음 (매번 실행)  있음 (결과 재사용)  해당 없음
반환값?       있어도 되고 없어도  반드시 return     없어도 됨
용도          이벤트 처리       data 가공/파생값   사이드이펙트
```

---

## 비유

```
data     = 재료 (밀가루, 설탕, 계란)
computed = 레시피 결과 (케이크) ← 재료가 바뀌면 자동으로 다시 만듦
methods  = 요리 행위 ← "만들어!" 할 때만 실행
watch    = 감시 카메라 ← 재료가 바뀌는 순간 알림 보냄
```

---

## computed가 methods보다 나은 경우

```
{{ 복잡한계산() }}   ← methods: 화면이 다시 그려질 때마다 매번 실행
{{ 복잡한계산 }}     ← computed: 의존 data가 안 바뀌면 캐시된 결과 재사용

화면 렌더링이 자주 일어나는 경우 computed가 성능상 유리
```

---

## watch는 언제 쓰나?

computed와 달리 **return 없이 동작만 수행**할 때

```
검색어 변경 → API 호출
언어 변경   → 페이지 새로고침
데이터 변경 → 로컬스토리지 저장
```

```
watch: {
  keyword(newVal) {
    // 값이 바뀔 때마다 API 호출
    fetch(`/api/search?q=${newVal}`)
  }
}
```

---

## 판단 흐름

```
data를 가공해서 화면에 보여줄 건가?
├── YES → computed
│
data가 바뀔 때 API/저장 등 부가 동작이 필요한가?
├── YES → watch
│
사용자 동작(클릭 등)에 반응해야 하나?
└── YES → methods
```

---

## 예제 파일

→ `04_computed_watch.html`
