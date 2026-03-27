# v-bind 심화: class와 style 바인딩

HTML 속성을 data에 연결하는 `v-bind(:)`의 핵심 활용.

---

## 속성 바인딩 기본

```html
<img :src="imageUrl">           ← 이미지 경로를 data로
<a :href="link">                ← 링크를 data로
<button :disabled="isLoading">  ← 비활성화를 data로
<input :placeholder="hint">     ← placeholder를 data로
```

---

## class 바인딩

### 객체 문법 — 조건에 따라 클래스 ON/OFF

```html
<div :class="{ active: isActive, error: hasError }">

isActive = true, hasError = false
→ class="active"

isActive = true, hasError = true
→ class="active error"
```

```
:class="{ 클래스명: 조건 }"

조건이 true  → 클래스 추가
조건이 false → 클래스 제거
```

### 배열 문법 — 여러 클래스를 나열

```html
<div :class="[classA, classB]">

classA = 'text-bold'
classB = 'bg-blue'
→ class="text-bold bg-blue"
```

### 혼합

```html
<div :class="[{ active: isActive }, 'base-class']">
```

### 고정 class + 동적 :class 공존

```html
<div class="card" :class="{ selected: isSelected }">
→ class="card selected"  (isSelected가 true일 때)
```

---

## style 바인딩

```html
<div :style="{ color: textColor, fontSize: size + 'px' }">
```

```
주의: CSS 속성명은 camelCase로 쓴다
───────────────────────────────
CSS              Vue :style
font-size    →   fontSize
background-color → backgroundColor
margin-top   →   marginTop
```

### 객체로 분리

```js
data() {
  return {
    myStyle: {
      color: 'red',
      fontSize: '20px',
      fontWeight: 'bold'
    }
  }
}
```
```html
<p :style="myStyle">스타일 적용</p>
```

---

## 예제 파일

→ `06_bind_class_style.html`
