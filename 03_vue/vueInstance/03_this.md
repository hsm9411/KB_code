# Vue에서 this 이해하기

---

## this = 컴포넌트 인스턴스

Vue 옵션 안에서 `this`는 항상 **해당 컴포넌트 인스턴스(vm)**를 가리킨다.

```js
createApp({
  data() { return { count: 0 } },

  methods: {
    increase() {
      this.count++          // this = vm → data 접근
    }
  },

  computed: {
    doubled() {
      return this.count * 2  // this = vm → data 접근
    }
  },

  watch: {
    count(newVal) {
      console.log(this.doubled)  // this = vm → computed 접근
    }
  },

  mounted() {
    this.increase()          // this = vm → methods 접근
  }
})
```

```
this 하나로 모든 곳에 접근 가능:

this
├── .count        ← data
├── .increase()   ← methods
├── .doubled      ← computed
├── .$el          ← 마운트된 DOM 요소
├── .$refs        ← ref로 지정한 DOM
└── .$emit()      ← 이벤트 발생 (컴포넌트 간 통신)
```

---

## 주의: 화살표 함수에서 this

```js
methods: {
  // ✅ 일반 함수: this = vm
  increase() {
    this.count++
  },

  // ❌ 화살표 함수: this = vm이 아님 (상위 스코프)
  increase: () => {
    this.count++   // TypeError! this가 vm이 아님
  }
}
```

```
규칙:
Vue 옵션(methods, computed, watch, 라이프사이클)에서는
반드시 일반 함수를 사용한다. 화살표 함수 쓰지 않는다.

단, 콜백 내부에서는 화살표 함수 OK:
methods: {
  fetchData() {                    // ← 일반 함수 (this = vm)
    fetch('/api').then(res => {    // ← 화살표 함수 OK (this 유지)
      this.data = res              // this = vm (화살표 함수가 바깥 this 유지)
    })
  }
}
```

---

## 예제 파일

→ `04_this.html`
