# Vue 인스턴스 & 애플리케이션 인스턴스

---

## 왜 "인스턴스"라는 개념이 필요한가?

### 문제: 일반 JS로 화면을 만들면

```js
// 변수 따로
let name = '홍길동'

// DOM 조작 따로
document.getElementById('name').innerText = name

// 이벤트 따로
document.getElementById('btn').addEventListener('click', () => {
  name = '김영희'
  document.getElementById('name').innerText = name  // 또 수동
})
```

**변수, 화면, 이벤트가 각각 흩어져 있다.**
규모가 커지면 어디서 뭘 바꿨는지 추적이 불가능해진다.

### 해결: Vue 인스턴스로 묶는다

```js
createApp({
  data()    { return { name: '홍길동' } },   // 변수
  methods   { changeName() { ... } },         // 동작
  // → 화면은 HTML 쪽에서 {{ name }}으로 자동 연결
}).mount('#app')
```

**하나의 객체(인스턴스) 안에 변수 + 동작 + 화면 연결이 모두 들어간다.**
이것이 "인스턴스"를 쓰는 이유다.

---

## Vue 2 vs Vue 3: 용어 변화

```
Vue 2                          Vue 3
────────────────────           ────────────────────
new Vue({...})                 createApp({...})
  ↓                              ↓
"Vue 인스턴스"                  "애플리케이션 인스턴스"
(하나가 모든 걸 관리)            (앱 단위로 분리 가능)
```

### Vue 2의 방식

```js
// Vue 2: 전역 Vue 객체 하나에 모든 걸 등록
Vue.component('my-btn', {...})     // 전역 등록
Vue.directive('focus', {...})      // 전역 등록
Vue.filter('currency', {...})      // 전역 등록

const vm = new Vue({               // "Vue 인스턴스"
  el: '#app',
  data: { name: '홍길동' }
})
```

```
문제점:
├── 전역 오염: 어디서든 Vue.component 하면 모든 곳에 영향
├── 테스트 어려움: 전역 상태가 테스트 간 공유됨
└── 여러 앱 불가: 한 페이지에 독립된 Vue 앱 2개 만들기 어려움
```

### Vue 3의 해결

```js
// Vue 3: 앱마다 독립된 인스턴스
const app1 = createApp({...})
app1.component('my-btn', {...})   // app1에만 등록
app1.mount('#app1')

const app2 = createApp({...})
app2.component('my-btn', {...})   // app2에만 등록 (다른 컴포넌트 가능)
app2.mount('#app2')
```

```
해결:
├── 앱 단위 격리: 등록한 것이 해당 앱에서만 유효
├── 테스트 용이: 앱 인스턴스를 새로 만들면 깨끗한 상태
└── 다중 앱 가능: 한 페이지에 독립된 앱 여러 개 운영
```

---

## 핵심 용어 정리

```
createApp({ 옵션 })
    │
    │  반환값 = "애플리케이션 인스턴스" (= app)
    │  → 앱 전체 설정을 담당
    │  → component, directive 등 등록
    │
    ▼
 app.mount('#app')
    │
    │  반환값 = "루트 컴포넌트 인스턴스" (= vm)
    │  → 실제 data, methods 등에 접근 가능
    │  → vm.name, vm.count 등
    │
    ▼
  화면 렌더링 시작
```

```js
// 코드로 보면
const app = createApp({         // app = 애플리케이션 인스턴스
  data() { return { count: 0 } }
})

app.component('my-btn', {...})  // app에 컴포넌트 등록
app.directive('focus', {...})   // app에 디렉티브 등록

const vm = app.mount('#app')    // vm = 루트 컴포넌트 인스턴스

console.log(vm.count)           // 0  (data에 접근)
```

---

## app vs vm 차이

```
                app (애플리케이션)          vm (컴포넌트 인스턴스)
──────────────  ──────────────────────    ──────────────────────
생성 시점        createApp() 호출 시       .mount() 호출 시
역할             앱 전체 설정/등록          실제 data, methods 사용
접근 가능한 것    .component()              vm.count
                .directive()              vm.someMethod()
                .use() (플러그인)           vm.$el (DOM)
                .mount()
비유             회사 설립 (사업자등록)       직원이 실제로 일 시작
```

---

## 동작 전체 흐름

```
① createApp({ 옵션 })
   └→ 앱 설계도 생성 (아직 아무 동작 없음)

② app.component() / app.use() 등
   └→ 앱에 필요한 부품 등록 (선택사항)

③ app.mount('#app')
   └→ HTML과 연결
   └→ data를 반응형으로 등록
   └→ 라이프사이클 시작 (beforeCreate → created → mounted)
   └→ 디렉티브/{{ }} 스캔 → 화면 렌더링
   └→ vm(루트 컴포넌트 인스턴스) 반환

④ 사용자 상호작용
   └→ data 변경 → 화면 자동 업데이트

⑤ app.unmount()
   └→ 앱 종료, 정리
```

---

## 예제 파일

→ `01_basic.html` — app과 vm의 기본 확인
→ `02_multi_app.html` — 한 페이지에 독립된 앱 2개
→ `03_app_config.html` — 애플리케이션 인스턴스에 컴포넌트/디렉티브 등록
