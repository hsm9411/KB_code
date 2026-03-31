# Sass + BEM 정리

## 1. Sass란?

CSS를 더 구조적으로 작성할 수 있게 해주는 **전처리기(preprocessor)**.
`.scss` 파일로 작성하면 컴파일러가 브라우저가 읽을 수 있는 `.css`로 변환해준다.

브라우저는 `.scss`를 직접 읽지 못한다 → 반드시 컴파일 필요.

---

## 2. 컴파일 흐름

```
style.scss  →  [컴파일러]  →  style.css + style.css.map
```

- **style.css** : 브라우저가 실제로 읽는 파일. HTML에서 이걸 link한다.
- **style.css.map** : 소스맵(source map). 브라우저 개발자도구에서 "이 CSS는 scss 몇 번째 줄에서 왔다"를 추적할 수 있게 해주는 메타 파일. 직접 건드릴 필요 없음.

HTML에서는 항상 `.css`를 연결한다:
```html
<link rel="stylesheet" href="style.css" />
```

---

## 3. 컴파일러 사용법

### VS Code에서 가장 간단한 방법 — Live Sass Compiler 확장

1. VS Code 확장에서 `Live Sass Compiler` 설치
2. 하단 상태바에 `Watch Sass` 클릭
3. `.scss` 파일 저장할 때마다 자동으로 `.css`와 `.css.map` 생성됨

### npm으로 직접 설치하는 방법 (실무)

```bash
npm install -g sass
sass --watch style.scss style.css
```

`--watch` 옵션 : 파일 변경 감지해서 자동으로 재컴파일.

---

## 4. Sass 주요 기능 (이 코드에서 쓴 것들)

### 변수 ($)
자주 쓰는 값을 변수로 빼서 한 곳에서 관리.

```scss
$primary: #4a6fa5;
$danger: #c24141;
$success: #4caf7d;
```

색상을 바꿀 때 변수 하나만 수정하면 전체에 반영됨 → 리팩토링이 쉬운 이유.

### 중첩 (&)
부모 선택자 안에 자식을 중첩해서 쓸 수 있다.
`&`는 부모 선택자를 의미한다.

```scss
// scss
.todo {
  padding: 16px;

  &__title {     // → .todo__title
    font-size: 16px;
  }

  &--done {      // → .todo--done
    opacity: 0.5;
  }
}
```

컴파일 결과:
```css
.todo { padding: 16px; }
.todo__title { font-size: 16px; }
.todo--done { opacity: 0.5; }
```

### mixin (@mixin / @include)
반복되는 CSS 묶음을 함수처럼 재사용.

```scss
@mixin button-base {
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

@mixin button-color($bg) {   // 인자 받기
  @include button-base;
  background: $bg;
  color: white;
}
```

사용:
```scss
&__button--complete {
  @include button-color($success);  // 버튼 기본 스타일 + 초록 배경
}
```

mixin 덕분에 버튼 3개(complete/edit/delete)가 padding, border 등 공통 스타일을 중복 없이 공유함.
실제 컴파일된 css를 보면 공통 속성이 각각 펼쳐져서 들어가 있는 걸 확인할 수 있다.

---

## 5. BEM 방법론

BEM = **Block / Element / Modifier**
클래스 이름 규칙으로, 어떤 역할인지 이름만 보고 파악할 수 있게 만드는 구조.

### 구조

| 종류 | 의미 | 구분자 | 예시 |
|------|------|--------|------|
| Block | 독립적인 컴포넌트 단위 | - | `.todo` |
| Element | Block의 구성 요소 | `__` (언더바 2개) | `.todo__title` |
| Modifier | 상태나 변형 | `--` (하이픈 2개) | `.todo--done` |

### 이 코드에서 적용된 BEM

```
.todo                     → Block (할일 카드 전체)
  .todo__content          → Element (내용 영역)
  .todo__title            → Element (제목)
  .todo__date             → Element (날짜)
  .todo__actions          → Element (버튼 묶음)
  .todo__button           → Element (버튼 기본)
    .todo__button--complete  → Modifier (완료 버튼 색상)
    .todo__button--edit      → Modifier (수정 버튼 색상)
    .todo__button--delete    → Modifier (삭제 버튼 색상)
  .todo--done             → Modifier (완료된 상태 → 흐리게)
  .todo--important        → Modifier (중요 상태 → 왼쪽 빨간 선)
```

HTML에서는 이렇게 사용:
```html
<!-- 기본 버튼 클래스 + 색상 Modifier 동시에 붙임 -->
<button class="todo__button todo__button--complete">완료</button>

<!-- 완료된 todo에 --done Modifier 추가 -->
<div class="todo todo--done">
```

### BEM의 장점

- 클래스 이름만 봐도 어디 소속인지 바로 파악 가능
- 다른 컴포넌트와 클래스 이름 충돌이 없음
- 팀 프로젝트에서 CSS 관리가 훨씬 수월해짐

---

## 6. Sass + BEM 조합이 좋은 이유

Sass의 `&` 중첩과 BEM 네이밍이 자연스럽게 맞아 떨어진다.

```scss
.todo {
  // Block 스타일

  &__title { }      // .todo__title
  &__actions { }    // .todo__actions
  &__button {
    &--complete { } // .todo__button--complete
    &--delete { }   // .todo__button--delete
  }

  &--done { }       // .todo--done
  &--important { }  // .todo--important
}
```

`.todo` 블록에 관련된 모든 스타일이 한 블록 안에 모여 있음 → 나중에 찾거나 수정할 때 한 곳만 보면 됨.
