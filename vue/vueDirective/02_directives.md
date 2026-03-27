# Vue 디렉티브 총정리

디렉티브 = HTML 태그에 붙이는 `v-` 접두사 속성.
Vue가 이 속성을 보고 "이 태그를 어떻게 처리할지" 판단한다.

---

## 디렉티브 전체 지도

```
v-  디렉티브
├── 출력 ─────── v-text      텍스트 출력
│                v-html      HTML 렌더링
│                {{ }}       수염 문법 (텍스트 삽입)
│
├── 조건 ─────── v-if        조건부 렌더링 (DOM 제거)
│                v-else-if
│                v-else
│                v-show      조건부 표시 (display:none)
│
├── 반복 ─────── v-for       배열/객체 순회
│
├── 바인딩 ───── v-bind (:)  HTML 속성에 data 연결
│                v-model     양방향 바인딩 (input ↔ data)
│
├── 이벤트 ───── v-on (@)    이벤트 연결
│
└── 기타 ─────── v-once      최초 1회만 렌더링
                 v-pre       Vue 처리 안 함
                 v-cloak     로딩 깜빡임 방지
```

---

## v-if vs v-show

둘 다 "조건에 따라 보이고 안 보이게" 하지만 방식이 다르다.

```
v-if="false"
├── DOM에서 완전히 제거됨
├── 조건이 true가 되면 새로 생성
└── 토글 비용 높음 / 초기 비용 낮음

v-show="false"
├── DOM은 그대로, display:none만 적용
├── CSS만 토글
└── 토글 비용 낮음 / 초기 비용 높음
```

```
언제 뭘 쓰나?
─────────────────────────────────
자주 토글됨 (탭, 드롭다운)  → v-show
거의 안 바뀜 (권한 체크)    → v-if
조건 여러 개 (if/else)     → v-if
```

---

## v-for 핵심

```html
<li v-for="(item, index) in list" :key="item.id">

 item  = 현재 요소
 index = 순번 (0부터)
 :key  = Vue가 각 항목을 구분하는 고유값 (필수)
```

```
:key를 왜 써야 하나?
─────────────────────────────────
Vue는 목록이 바뀌면 최소한의 DOM만 업데이트하려 함
key가 없으면 → 순서 기반으로 비교 → 잘못 재사용할 수 있음
key가 있으면 → 고유값 기반으로 비교 → 정확한 업데이트
```

---

## v-bind 축약

```html
<!-- 풀 문법 -->
<img v-bind:src="imageUrl">
<div v-bind:class="{ active: isActive }">

<!-- 축약 (실무에서는 항상 이렇게) -->
<img :src="imageUrl">
<div :class="{ active: isActive }">
```

---

## v-on 축약

```html
<!-- 풀 문법 -->
<button v-on:click="handleClick">

<!-- 축약 -->
<button @click="handleClick">
```

---

## v-model 동작 원리

```
v-model은 축약이다:

<input v-model="name">

     ↓ 이것과 동일

<input :value="name" @input="name = $event.target.value">

  :value="name"    → data → input (단방향)
  @input="..."     → input → data (역방향)
  합치면            → 양방향
```

---

## 예제 파일

→ `02_vif_vshow.html` — v-if / v-show 비교
→ `02_vfor.html` — v-for 활용
→ `02_vmodel.html` — v-model 다양한 input
