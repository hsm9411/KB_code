# Vue 2 → Vue 3 인스턴스 변화 과정

왜 이렇게 바뀌었는지의 "이유"를 이해하면 외울 필요가 없다.

---

## Vue 2: 전역 공유 문제

```js
// Vue 2 코드
Vue.component('my-btn', { template: '<button>버튼</button>' })

new Vue({ el: '#app1' })
new Vue({ el: '#app2' })
```

```
Vue (전역 객체)
├── component: my-btn     ← 전역 등록
├── directive: focus      ← 전역 등록
│
├── #app1 ← my-btn 사용 가능
└── #app2 ← my-btn 여기서도 사용됨 (원치 않아도)

문제:
app1에만 쓰려고 등록한 건데 app2에서도 보인다
→ 의도치 않은 충돌
→ 테스트 시 전역 상태가 남아서 오염
```

---

## Vue 3: 앱 단위 격리

```js
// Vue 3 코드
const app1 = createApp({...})
app1.component('my-btn', { template: '<button>버튼</button>' })
app1.mount('#app1')

const app2 = createApp({...})
// app2에는 my-btn이 없음 → 격리됨
app2.mount('#app2')
```

```
app1 (독립)               app2 (독립)
├── component: my-btn     ├── (없음)
├── #app1                 ├── #app2
└── 자기만의 설정           └── 자기만의 설정

→ 서로 영향 없음
→ 테스트할 때 createApp() 새로 하면 깨끗한 상태
```

---

## new Vue → createApp 변화 요약

```
Vue 2                        Vue 3
───────────────────────     ───────────────────────
new Vue({                   createApp({
  el: '#app',                 // el 없음
  data: { ... }               data() { return {...} }
})                          }).mount('#app')

Vue.component(...)          app.component(...)
Vue.directive(...)          app.directive(...)
Vue.use(router)             app.use(router)
Vue.mixin(...)              app.mixin(...)
```

```
핵심 변화:
Vue.xxx  (전역)  →  app.xxx  (앱 단위)
────────────────────────────────────────
이것이 Vue 3의 가장 큰 구조적 변화이다.
기능은 같지만, "어디에 등록하느냐"가 달라졌다.
```

---

## data가 함수인 이유

```js
// ❌ 객체로 쓰면 (Vue 2에서 가능했지만 위험)
data: { count: 0 }
// → 컴포넌트 재사용 시 모든 인스턴스가 같은 객체를 공유
// → A를 바꾸면 B도 바뀜

// ✅ 함수로 쓰면
data() { return { count: 0 } }
// → 호출될 때마다 새 객체 생성
// → 각 인스턴스가 독립된 데이터 보유
```

```
비유:
data: { ... }       →  원본 서류 1장을 여러 명이 공유
data() { return }   →  복사기로 각자 사본을 만들어 사용
```

---

## this가 가리키는 것

```js
createApp({
  data() {
    return { name: '홍길동' }
  },
  methods: {
    greet() {
      console.log(this.name)    // this = 컴포넌트 인스턴스 (vm)
      console.log(this.greet)   // this로 methods에도 접근
    }
  },
  mounted() {
    console.log(this.name)      // 라이프사이클 훅에서도 동일
    console.log(this.$el)       // $el = 마운트된 DOM 요소
  }
})
```

```
this 로 접근 가능한 것:
├── data의 모든 속성      → this.name
├── methods의 모든 함수   → this.greet()
├── computed의 모든 값    → this.fullName
├── $el                   → 마운트된 DOM
├── $refs                 → ref로 지정한 DOM
└── $emit                 → 부모에게 이벤트 전달
```

---

## 예제 파일

→ `01_basic.html` — app과 vm 확인
→ `02_multi_app.html` — 독립된 앱 2개
→ `03_app_config.html` — app에 컴포넌트/디렉티브 등록
