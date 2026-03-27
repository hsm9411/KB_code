# Vue 이벤트 처리

---

## 기본 구조

```html
<button @click="메서드명">          ← 클릭 시 메서드 실행
<button @click="count++">          ← 인라인 표현식도 가능
<button @click="handle($event)">   ← 원본 이벤트 객체 접근
```

---

## 이벤트 종류

```
마우스        키보드         폼
──────────   ──────────    ──────────
@click       @keyup        @submit
@dblclick    @keydown      @input
@mouseover   @keypress     @change
@mouseout                  @focus
@mousemove                 @blur
```

---

## 이벤트 수식어 (modifier)

수식어 = 이벤트 동작을 제어하는 접미사

```
@click.prevent     →  e.preventDefault()   폼 제출 막기
@click.stop        →  e.stopPropagation()  이벤트 버블링 막기
@click.once        →  한 번만 실행
@click.self        →  자기 자신 클릭 시만 (자식 클릭 무시)
@submit.prevent    →  폼 기본 동작 막기 (가장 많이 씀)
```

```
흐름 (이벤트 버블링):

  <div @click="외부">          ← ③ 여기까지 올라옴
    <p @click="중간">          ← ② 여기도 실행
      <button @click="내부">   ← ① 클릭 시작
      </button>
    </p>
  </div>

  @click.stop을 쓰면 버블링 차단
```

---

## 키 수식어

```html
@keyup.enter     →  Enter 키
@keyup.tab       →  Tab 키
@keyup.esc       →  Esc 키
@keyup.space     →  Space 키
@keyup.delete    →  Delete 키
@keyup.up        →  ↑ 방향키
@keyup.down      →  ↓ 방향키

조합:
@keyup.ctrl.enter  →  Ctrl + Enter
@click.ctrl        →  Ctrl + 클릭
```

---

## 예제 파일

→ `03_event.html`
