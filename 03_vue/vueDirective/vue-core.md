# Vue 3 핵심 정리

---

## 1. Vue의 기본 동작 원리

```
[ HTML 작성 ]  +  [ Vue 앱 정의 ]
       ↓                ↓
    <div id="app">   createApp({...})
       ↓                ↓
              .mount('#app')
                    ↓
         Vue가 #app 내부를 스캔
                    ↓
         디렉티브 / {{ }} 발견
                    ↓
         data 값과 연결 (반응형 등록)
                    ↓
              화면에 렌더링
                    ↓
         data 변경 → 화면 자동 업데이트
```

> Vue는 HTML을 직접 건드리지 않는다.
> data가 바뀌면 Vue가 알아서 필요한 부분만 다시 그린다.

---

## 2. createApp 옵션 구조

```js
createApp({
  data()     {},   // 반응형 변수
  methods    {},   // 함수
  computed   {},   // 계산된 값
  watch      {},   // 변수 감시
  // + 라이프사이클 훅들
}).mount('#app')
```

### data
```js
data() {
  return {
    username: '홍길동',
    count: 0
  }
}
```
- 화면에 표시할 상태값 보관소
- 함수가 return한 객체만 Vue가 반응형으로 등록
- 값이 바뀌면 연결된 화면이 자동 업데이트

### methods
```js
methods: {
  increase() {
    this.count++        // this로 data 접근
  }
}
```
- 이벤트 처리, 로직 수행용 함수 모음
- 호출될 때마다 실행 (캐싱 없음)

### computed
```js
computed: {
  doubleCount() {
    return this.count * 2   // count 바뀌면 자동 재계산
  }
}
```
- data를 가공한 파생값
- 의존하는 data가 바뀔 때만 재계산 (캐싱 있음)
- methods와 차이: methods는 매번 실행, computed는 캐싱

### watch
```js
watch: {
  count(newVal, oldVal) {
    console.log(`${oldVal} → ${newVal}`)
  }
}
```
- 특정 data 변화를 감지해서 사이드이펙트 처리
- API 호출, 로컬스토리지 저장 등에 활용

---

## 3. 라이프사이클

```
createApp() 호출
      ↓
  [setup]          ← 컴포지션 API 초기화
      ↓
  beforeCreate     ← data, methods 등록 전
      ↓
  created          ← data, methods 사용 가능 / 아직 화면 없음
      ↓
  beforeMount      ← HTML 렌더링 직전
      ↓
  mounted          ← HTML 렌더링 완료 ★ 가장 많이 쓰임
      ↓
  (data 변경 발생)
      ↓
  beforeUpdate     ← 화면 다시 그리기 직전
      ↓
  updated          ← 화면 다시 그리기 완료
      ↓
  (앱 종료 / 컴포넌트 제거)
      ↓
  beforeUnmount
      ↓
  unmounted        ← 타이머, 이벤트 리스너 정리
```

```js
mounted() {
  // 화면이 준비된 직후 실행
  // → API 데이터 불러오기, DOM 직접 접근 등
  fetch('/api/user').then(...)
}

unmounted() {
  // 컴포넌트가 사라질 때 실행
  // → setInterval, addEventListener 등 정리
  clearInterval(this.timer)
}
```

---

## 4. 디렉티브 (v-)

디렉티브 = HTML 태그에 붙이는 Vue 전용 속성. 모두 `v-`로 시작.

### 텍스트 출력

| 디렉티브 | 설명 |
|----------|------|
| `{{ }}` | 텍스트 삽입 (수염 문법) |
| `v-text` | 태그 내용 전체를 텍스트로 교체 |
| `v-html` | 태그 내용 전체를 HTML로 렌더링 |

```html
<p>이름: {{ username }}</p>
<p v-text="username"></p>
<p v-html="'<b>굵게</b>'"></p>
```

### 조건부 렌더링

```html
<!-- v-if: 조건이 false면 DOM에서 완전히 제거 -->
<p v-if="count > 0">카운트 있음</p>
<p v-else>카운트 없음</p>

<!-- v-show: 조건이 false면 display:none 처리 (DOM은 유지) -->
<p v-show="isVisible">보임/숨김</p>
```

> v-if vs v-show
> 자주 토글되면 → v-show (DOM 유지라 빠름)
> 거의 안 바뀌면 → v-if (조건 불충족 시 DOM 자체 없음)

### 반복 렌더링

```html
<!-- v-for: 배열을 순회하며 반복 출력 -->
<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
</ul>
```

```js
data() {
  return {
    items: [
      { id: 1, name: '사과' },
      { id: 2, name: '바나나' }
    ]
  }
}
```

### 속성 바인딩

```html
<!-- v-bind: HTML 속성에 data 연결 -->
<img v-bind:src="imageUrl">
<a :href="link">링크</a>          <!-- v-bind 축약형 : -->

<!-- 클래스 / 스타일 바인딩 -->
<div :class="{ active: isActive }"></div>
<div :style="{ color: textColor }"></div>
```

### 이벤트 바인딩

```html
<!-- v-on: 이벤트 연결 -->
<button v-on:click="increase">클릭</button>
<button @click="increase">클릭</button>   <!-- v-on 축약형 @ -->

<input @keyup.enter="submit">             <!-- 키 수식어 -->
```

### 양방향 바인딩

```html
<!-- v-model: input 값과 data를 양방향 동기화 -->
<input v-model="username">
<p>입력값: {{ username }}</p>
```

```
사용자 입력 → data 업데이트 → 화면 업데이트
                 ↑                    ↓
                 ←←←←←←←←←←←←←←←←←←
```

### 기타

```html
<!-- v-once: 최초 1회만 렌더링, 이후 data 변경 무시 -->
<p v-once>{{ username }}</p>

<!-- v-pre: Vue 처리 없이 {{ }} 그대로 출력 -->
<p v-pre>{{ 이건 그대로 출력됨 }}</p>
```

---

## 5. 전체 구조 한눈에 보기

```
createApp({
  │
  ├── data()          → 상태 (State)
  │     └── 변경되면 → 화면 자동 업데이트
  │
  ├── methods         → 동작 (Action)
  │     └── 이벤트(@click 등)에서 호출
  │
  ├── computed        → 파생값 (Derived State)
  │     └── data 기반 자동 계산
  │
  ├── watch           → 사이드이펙트 (Side Effect)
  │     └── data 변화 감지 → API 호출 등
  │
  └── 라이프사이클
        ├── created   → 초기 데이터 처리
        ├── mounted   → API 호출, DOM 접근 ★
        └── unmounted → 정리 작업

HTML (template)
  ├── {{ }}           → 텍스트 출력
  ├── v-if / v-show  → 조건부 표시
  ├── v-for          → 반복 출력
  ├── v-model        → 양방향 바인딩
  ├── :attr          → 속성 바인딩 (v-bind)
  └── @event         → 이벤트 연결 (v-on)
```

---

## 6. 실전 최소 예시

```html
<div id="app">
  <input v-model="keyword" placeholder="검색어 입력">
  <ul>
    <li v-for="item in filtered" :key="item">{{ item }}</li>
  </ul>
  <p v-if="filtered.length === 0">결과 없음</p>
</div>

<script>
  createApp({
    data() {
      return {
        keyword: '',
        list: ['사과', '바나나', '포도', '수박']
      }
    },
    computed: {
      filtered() {
        return this.list.filter(item => item.includes(this.keyword))
      }
    }
  }).mount('#app')
</script>
```

> input에 입력 → keyword 변경 → computed filtered 재계산 → v-for 화면 업데이트
> 이 흐름이 Vue의 핵심이다.
