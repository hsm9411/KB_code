# Vue Router History Mode 동작 원리

## 핵심 오해 정리

> "SPA는 브라우저 뒤로가기/앞으로가기를 막고 흉내낸다"

이건 **절반만 맞는 말**이다.  
정확히는: **페이지 이동(서버 요청)은 막고, 브라우저 히스토리 스택 자체는 그대로 활용한다.**

---

## MPA vs SPA 비교

### MPA (전통 방식)
```
사용자 /about 클릭
  → 브라우저가 서버에 GET /about 요청
  → 서버가 about.html 응답
  → 브라우저 전체 페이지 새로고침
  → 히스토리 스택에 /about 추가됨
```

### SPA + History Mode (Vue Router)
```
사용자 /about 클릭
  → Vue Router가 클릭 이벤트 가로챔 (서버 요청 안 함)
  → JavaScript로 컴포넌트만 교체 (About.vue 렌더링)
  → window.history.pushState() 호출
  → 브라우저 주소창: /about 으로 바뀜
  → 히스토리 스택에 /about 추가됨  ← 이게 핵심!
```

**결과적으로 히스토리 스택 모양은 MPA와 동일하다.**

---

## HTML5 History API — 브라우저가 제공하는 핵심 도구

브라우저는 원래부터 이 기능을 내장하고 있다:

| API | 역할 |
|-----|------|
| `history.pushState(state, title, url)` | 스택에 새 항목 추가, 서버 요청 없이 URL만 바꿈 |
| `history.replaceState(state, title, url)` | 현재 항목을 교체 (스택 크기 변화 없음) |
| `window.popstate` 이벤트 | 뒤로/앞으로 버튼 눌렸을 때 발생 |

### 브라우저 히스토리 스택 시각화

```
사용자 이동 경로: / → /about → /courses → /courses/1

히스토리 스택:
┌─────────────┐  ← 현재 위치 (top)
│ /courses/1  │
├─────────────┤
│ /courses    │
├─────────────┤
│ /about      │
├─────────────┤
│ /           │
└─────────────┘

뒤로가기 누름:
┌─────────────┐
│ /courses    │  ← 현재 위치 이동
├─────────────┤
│ /about      │
├─────────────┤
│ /           │
└─────────────┘
  (popstate 이벤트 발생 → Vue Router가 /courses 컴포넌트 렌더링)
```

---

## Vue Router가 실제로 하는 일

### 1. `<RouterLink>` 클릭 — 서버 요청 차단
```html
<!-- 이 링크를 클릭하면 -->
<RouterLink to="/about">About</RouterLink>

<!-- Vue Router 내부 동작 -->
// 1. 기본 <a href> 동작(서버 요청) 차단: event.preventDefault()
// 2. JavaScript로 컴포넌트 교체
// 3. URL만 바꾸기: history.pushState({}, '', '/about')
```

### 2. 뒤로/앞으로 버튼 — Vue Router가 이벤트 감지
```javascript
// Vue Router 내부 (개념적으로 이런 코드가 있음)
window.addEventListener('popstate', (event) => {
  // 브라우저가 스택에서 꺼낸 URL 확인
  const path = window.location.pathname  // 예: '/about'
  
  // 해당 경로에 맞는 컴포넌트 렌더링
  router.push(path)
})
```

**뒤로/앞으로 버튼 자체를 막은 게 아니라,  
버튼이 눌렸을 때 발생하는 popstate 이벤트를 Vue Router가 가로채서  
알맞은 컴포넌트를 렌더링하는 것이다.**

---

## 이 프로젝트 코드로 보는 흐름

### router/index.js
```javascript
// createWebHistory() = HTML5 History API 사용 선언
const router = createRouter({
  history: createWebHistory(),
  routes: [ ... ]
})

// 네비게이션 가드: 이동 전에 실행됨
router.beforeEach((to, from, next) => {
  console.log("이동 전:", from.fullPath, "->", to.fullPath)
  next()  // 이동 허용
})
```

`createWebHistory()`를 선택한 순간,  
Vue Router는 모든 라우팅을 pushState/popstate 기반으로 처리한다.

### 실제 동작 흐름 예시

```
① 브라우저에서 / 접속
   → App.vue 렌더링, <RouterView>에 Home.vue 표시

② /students 링크 클릭
   → beforeEach 실행: "이동 전: / -> /students"
   → history.pushState 호출 (서버 요청 없음)
   → <RouterView>에 StudentList.vue 교체
   → 주소창: /students

③ /students/3 클릭
   → beforeEach 실행: "이동 전: /students -> /students/3"
   → history.pushState 호출
   → <RouterView>에 StudentDetail.vue 교체 (props: id=3)
   → 주소창: /students/3

④ 브라우저 뒤로가기 클릭
   → popstate 이벤트 발생
   → Vue Router: 스택에서 /students 꺼냄
   → <RouterView>에 StudentList.vue 다시 렌더링
   → 주소창: /students  ← 자연스럽게 이전으로!
```

---

## 그럼 뭘 "막는" 건가?

정확히 막는 것은 딱 하나:  
**`<RouterLink>` 클릭 시 브라우저가 서버에 요청 보내는 동작**

| 동작 | 막음? | 이유 |
|------|-------|------|
| `<RouterLink>` 클릭 → 서버 요청 | **막음** | JS로 컴포넌트 교체하면 되니까 |
| 뒤로/앞으로 버튼 | **안 막음** | popstate 이벤트로 처리 |
| 주소창 직접 입력 후 Enter | **처리 못함** | 서버 설정 필요 (아래 참고) |

---

## 함정: 주소창 직접 입력 (서버 설정 문제)

```
브라우저 주소창에 직접 /students/3 입력하고 Enter
→ 브라우저가 서버에 GET /students/3 요청
→ 서버에 /students/3 경로가 없으면 404 에러!
```

이게 History Mode의 유일한 단점이다.

**해결책**: 서버를 모든 경로를 `index.html`로 리다이렉트하도록 설정

```nginx
# Nginx 예시
location / {
  try_files $uri $uri/ /index.html;
}
```

```javascript
// Vite 개발 서버는 자동으로 이걸 처리해줌
// 그래서 개발 중에는 /students/3 직접 입력해도 잘 됨
```

---

## Hash Mode와 비교

History Mode 말고 `createWebHashHistory()`도 있다:

```
Hash Mode URL: http://localhost:5173/#/students/3
History Mode URL: http://localhost:5173/students/3
```

| | Hash Mode | History Mode |
|--|-----------|--------------|
| URL 모양 | `/#/about` | `/about` |
| 서버 설정 | 불필요 (# 뒤는 서버에 안 감) | 필요 |
| 뒤로가기 | 동일하게 작동 | 동일하게 작동 |
| SEO | 불리 | 유리 |

이 프로젝트는 `createWebHistory()`를 쓰므로 **History Mode**.

---

## 한 줄 요약

> Vue Router History Mode는 **서버 요청만 막고**,  
> 브라우저 히스토리 스택은 `pushState`로 그대로 쌓기 때문에  
> 뒤로/앞으로 버튼이 MPA와 똑같이 동작하는 것처럼 보인다.

---

## 깊이 이해하기 1 — index.html 리다이렉트가 뭔가?

### 먼저 서버가 파일을 찾는 방식 이해

웹 서버(Nginx, Apache 등)는 기본적으로 **URL 경로 = 파일 경로**로 동작한다.

```
요청: GET /students/3

서버가 하는 일:
  프로젝트 폴더에서 students/3 이라는 파일 또는 폴더를 찾는다
  없으면? → 404 Not Found 반환
```

SPA를 빌드하면 실제 파일 구조는 이렇다:

```
dist/
  index.html        ← 파일 있음
  assets/
    main.js         ← 파일 있음
    main.css        ← 파일 있음
  favicon.ico       ← 파일 있음

  students/         ← 폴더 없음!
  about/            ← 폴더 없음!
  courses/          ← 폴더 없음!
```

`/students/3`에 해당하는 파일이 물리적으로 존재하지 않는다.  
그래서 서버 설정 없이 `/students/3`을 직접 요청하면 **404**가 난다.

---

### index.html 리다이렉트 설정의 의미

서버에게 이렇게 지시하는 것이다:

> "어떤 경로로 요청이 와도, 실제 파일이 없으면 index.html을 돌려줘.  
> 나머지는 자바스크립트(Vue Router)가 알아서 처리할게."

```
요청 흐름 비교:

[설정 전]
브라우저: GET /students/3
서버: students/3 파일 없음 → 404 에러

[설정 후]
브라우저: GET /students/3
서버: students/3 파일 없음 → index.html 반환
브라우저: index.html 받음 → Vue 앱 실행
Vue Router: 주소창의 /students/3 을 읽음 → StudentDetail.vue 렌더링
```

---

### 도식으로 전체 구조 보기

```
[브라우저]                    [서버]                    [파일 시스템]
    |                           |                            |
    | GET /students/3           |                            |
    |-------------------------->|                            |
    |                           | students/3 있나?           |
    |                           |--------------------------->|
    |                           |       없음                 |
    |                           |<---------------------------|
    |                           |                            |
    |                           | (리다이렉트 설정 있음)      |
    |                           | index.html 찾기            |
    |                           |--------------------------->|
    |                           |       있음                 |
    |                           |<---------------------------|
    |    200 OK + index.html    |                            |
    |<--------------------------|                            |
    |                           |                            |
    | index.html 파싱           |                            |
    | main.js 실행              |                            |
    | Vue 앱 시작               |                            |
    | Vue Router 초기화         |                            |
    | 주소창 /students/3 읽기   |                            |
    | StudentDetail.vue 렌더링  |                            |
    |                           |                            |
```

---

### 실제 서버 설정 코드

```nginx
# Nginx
location / {
  try_files $uri $uri/ /index.html;
  # 해석: 요청 파일 있으면 그거 줘,
  #       폴더 있으면 그거 줘,
  #       둘 다 없으면 /index.html 줘
}
```

```apache
# Apache (.htaccess)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  # 해석: 파일/폴더가 실제로 없으면 index.html로 처리
</IfModule>
```

```javascript
// Vite 개발 서버 (vite.config.js)
// 별도 설정 없어도 자동으로 처리해줌
// → 개발 중에는 직접 입력해도 404가 안 나는 이유
export default defineConfig({
  plugins: [vue()],
  // historyApiFallback: true 가 내부적으로 켜져 있음
})
```

---

### 핵심 포인트

```
index.html 리다이렉트 = "모르는 경로는 일단 Vue 앱한테 넘겨라"

서버는 라우팅을 모른다  →  Vue Router가 라우팅을 안다
서버는 파일만 안다      →  Vue Router가 컴포넌트를 안다
```

---

## 깊이 이해하기 2 — 브라우저 새로고침(F5)은 어떻게 동작하나?

### 새로고침이 특별한 이유

`<RouterLink>` 클릭은 Vue Router가 가로채서 서버 요청을 막는다.  
뒤로/앞으로는 `popstate` 이벤트로 처리한다.

그런데 **새로고침(F5)은 Vue Router가 가로챌 수 없다.**  
새로고침은 브라우저가 직접 서버에 요청을 보내는 동작이기 때문이다.

---

### 새로고침 동작 흐름

```
현재 상태: 주소창이 /students/3 인 상태에서 F5

[서버 설정이 없을 때]

브라우저: 현재 주소가 /students/3 이네
브라우저: 서버에 GET /students/3 요청 (Vue Router 개입 불가)
서버: /students/3 파일 없음 → 404 에러
결과: 빈 오류 페이지

[서버 설정이 있을 때 (index.html 리다이렉트)]

브라우저: 현재 주소가 /students/3 이네
브라우저: 서버에 GET /students/3 요청
서버: 파일 없음 → index.html 반환
브라우저: index.html 파싱 → Vue 앱 실행
Vue Router: "주소창이 /students/3 이구나" → StudentDetail.vue 렌더링
결과: 새로고침 전과 동일한 화면
```

---

### 단계별 도식

```
F5 누름 (현재 주소: /students/3)
    |
    v
+-----------------------------------+
| 브라우저                          |
| "현재 URL로 서버에 요청 보내야지" |
+-----------------------------------+
    |
    | HTTP GET /students/3
    v
+-----------------------------------+
| 서버                              |
| "students/3 파일 있나?" → 없음    |
| "설정대로 index.html 줘야지"      |
+-----------------------------------+
    |
    | 200 OK
    | <html>...</html>  (index.html 내용)
    v
+-----------------------------------+
| 브라우저                          |
| index.html 받음                   |
| <script src="main.js"> 실행       |
+-----------------------------------+
    |
    v
+-----------------------------------+
| Vue 앱 초기화                     |
| createApp(App).use(router).mount  |
+-----------------------------------+
    |
    v
+-----------------------------------+
| Vue Router 초기화                 |
| window.location.pathname 확인     |
|   → "/students/3"                 |
| routes 배열에서 매칭 찾기         |
|   → { path: '/students/:id' }     |
|   → id = "3"                      |
+-----------------------------------+
    |
    v
+-----------------------------------+
| <RouterView>에 렌더링             |
| StudentDetail.vue (props: id="3") |
+-----------------------------------+
    |
    v
새로고침 전과 동일한 화면 표시
```

---

### 새로고침과 첫 방문의 차이

새로고침이 동작하는 원리를 이해하면, 첫 방문도 같은 원리임을 알 수 있다:

```
[첫 방문: /students/3 주소로 직접 접속]
= 새로고침과 완전히 동일한 흐름

서버 → index.html 반환
Vue Router → /students/3 읽어서 StudentDetail.vue 렌더링


[앱 내 링크 클릭으로 이동]
= 서버 요청 없이 처리

Vue Router → history.pushState('/students/3')
Vue Router → StudentDetail.vue 렌더링
```

---

### 새로고침 시 주의할 점

새로고침은 앱을 처음부터 다시 시작하는 것과 같다.

```
[잃어버리는 것들]
- Vuex/Pinia 에 저장된 상태 (메모리에 있던 데이터)
- 컴포넌트의 data() 값
- 로그인 상태 (localStorage/cookie 에 없는 경우)

[유지되는 것들]
- 현재 URL (주소창)
- localStorage, sessionStorage 데이터
- 쿠키
```

이 때문에 새로고침 후에도 유지해야 하는 상태는  
반드시 `localStorage`나 쿠키 등에 저장해야 한다.

---

### 전체 시나리오 비교 정리

```
시나리오 1: 앱 내 링크 클릭
  Vue Router 개입 → 서버 요청 없음 → 컴포넌트만 교체
  (빠름, 상태 유지)

시나리오 2: 뒤로/앞으로 버튼
  popstate 이벤트 → Vue Router 처리 → 컴포넌트 교체
  (빠름, 상태 유지)

시나리오 3: 새로고침 (F5)
  서버에 요청 → index.html 받음 → Vue 앱 처음부터 실행
  (느림, 메모리 상태 초기화)

시나리오 4: 주소창 직접 입력 후 Enter
  시나리오 3과 완전히 동일한 흐름
  (서버 설정 없으면 404)
```

---

## 최종 정리

```
Vue Router History Mode 전체 그림

[서버 역할]
  - 모든 요청에 index.html 반환
  - "라우팅은 몰라, 그냥 앱 파일만 줄게"

[Vue Router 역할]
  - 앱 내 클릭: 서버 요청 차단, 컴포넌트 교체
  - 뒤로/앞으로: popstate 감지, 컴포넌트 교체
  - 새로고침/직접입력: 서버가 준 index.html 기반으로 URL 읽어서 렌더링

[브라우저 히스토리 스택]
  - Vue Router가 pushState로 직접 쌓아줌
  - 뒤로/앞으로 버튼은 이 스택을 그대로 사용
  - MPA와 겉보기에 완전히 동일하게 동작
```

---

## 서버 설정은 프론트 코드로 할 수 있나?

**결론: 없다. 서버 설정은 서버에서 직접 해야 한다.**

프론트 코드(Vue, Vite 설정 등)는 브라우저 안에서만 동작한다.  
`index.html` 리다이렉트는 서버가 요청을 받는 순간 처리하는 일이라  
아직 Vue 앱이 실행되기도 전이다. 프론트가 개입할 수 없는 단계다.

---

### 배포 환경별 설정 방법

| 환경 | 설정 방법 | 직접 건드려야 하나? |
|------|-----------|-------------------|
| Vite 개발 서버 (`npm run dev`) | 자동 처리 | 필요 없음 |
| Nginx | `nginx.conf` 수정 | 서버에서 직접 |
| Apache | `.htaccess` 수정 | 서버에서 직접 |
| Netlify | 프로젝트에 `_redirects` 파일 추가 | 파일만 추가 |
| Vercel | 프로젝트에 `vercel.json` 추가 | 파일만 추가 |

---

### Netlify / Vercel — 예외적으로 프로젝트 파일로 설정

이 두 호스팅 서비스는 **프로젝트 폴더 안에 설정 파일을 추가**하는 방식이라  
프론트 작업처럼 느껴지지만, 실질적으로는 해당 서비스의 서버 동작을 지시하는 것이다.

```
# Netlify: 프로젝트 루트에 _redirects 파일 생성
/* /index.html 200
```

```json
// Vercel: 프로젝트 루트에 vercel.json 생성
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

### Nginx / Apache — 서버에 직접 접속해서 설정

```nginx
# Nginx: nginx.conf 또는 사이트 설정 파일
location / {
  try_files $uri $uri/ /index.html;
}
```

```apache
# Apache: .htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### 지금 이 프로젝트는?

```
npm run dev 로 실행 중
  → Vite 개발 서버가 index.html 리다이렉트를 자동으로 처리
  → 서버 설정 신경 안 써도 됨

나중에 실제 서버에 배포할 때
  → 배포 환경에 맞게 위 설정 중 하나 적용하면 됨
```
