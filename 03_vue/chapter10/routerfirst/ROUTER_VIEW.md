# RouterView 동작 원리와 동적 컴포넌트

## RouterView가 뭔가?

한 줄로: **"지금 URL에 맞는 컴포넌트를 여기에 그려라"는 자리표시자**다.

```html
<!-- App.vue -->
<template>
  <div class="container py-4">
    <Header />          <!-- 항상 고정으로 표시 -->
    <div class="mt-4">
      <RouterView />    <!-- URL에 따라 내용이 바뀌는 자리 -->
    </div>
  </div>
</template>
```

`<RouterView />`는 비어있는 액자 프레임이다.  
URL이 바뀔 때마다 Vue Router가 맞는 컴포넌트를 꺼내서 이 액자 안에 끼워 넣는다.

---

## 전체 구조 한눈에 보기

```
파일 관계도:

main.js
  └── App.vue (최상위 레이아웃)
        ├── Header.vue (고정 — 항상 표시)
        └── <RouterView /> (가변 — URL에 따라 교체)
              |
              | URL에 따라 아래 중 하나가 들어옴
              |
              ├── Home.vue         (/)
              ├── About.vue        (/about)
              ├── CourseList.vue   (/courses)
              ├── CourseDetail.vue (/courses/:id)
              ├── StudentList.vue  (/students)
              ├── StudentDetail.vue(/students/:id)
              ├── Search.vue       (/search)
              └── NotFound.vue     (그 외 모든 경로)
```

---

## URL → 화면 연결 흐름

### 연결 고리: router/index.js

```javascript
// router/index.js
const router = createRouter({
  routes: [
    { path: '/',           component: Home },
    { path: '/about',      component: About },
    { path: '/courses',    component: CourseList },
    { path: '/courses/:id', component: CourseDetail, props: true },
    { path: '/students',   component: StudentList },
    { path: '/students/:id', component: StudentDetail, props: true },
  ]
})
```

이 파일이 **URL과 컴포넌트의 매핑표**다.  
`<RouterView />`는 이 매핑표를 보고 무엇을 렌더링할지 결정한다.

---

### 실제 흐름: /students 접속할 때

```
① 브라우저 주소창: /students

② Vue Router가 routes 배열 순서대로 매칭 시도
   { path: '/' }          → /students 와 다름, 패스
   { path: '/about' }     → /students 와 다름, 패스
   { path: '/courses' }   → /students 와 다름, 패스
   { path: '/courses/:id' }→ /students 와 다름, 패스
   { path: '/students' }  → 일치! StudentList 컴포넌트 선택

③ App.vue 의 <RouterView /> 자리에 StudentList.vue 렌더링

④ 화면에 표시되는 구조:
   +----------------------------------+
   | Header.vue (네비게이션 바)        |
   +----------------------------------+
   | StudentList.vue                  |
   |  - Student List 제목             |
   |  - 1번 - 김학생 / Vue.js         |
   |  - 2번 - 이학생 / Spring Boot    |
   |  - 3번 - 박학생 / Docker         |
   +----------------------------------+
```

---

## 동적 라우트 — `:id` 가 뭔가?

### 개념: URL의 일부를 변수처럼 받는 것

```
정적 경로: /students        → 항상 StudentList
동적 경로: /students/:id    → :id 자리에 뭐가 오든 StudentDetail

/students/1  → StudentDetail (id = "1")
/students/2  → StudentDetail (id = "2")
/students/3  → StudentDetail (id = "3")
```

`:id`는 "이 자리에는 어떤 값이 와도 된다, 그 값을 id라는 이름으로 받겠다"는 뜻이다.

### 왜 이게 필요한가?

학생이 100명이라면 라우트를 100개 만들어야 할까?

```javascript
// 이렇게 하면 안 된다
{ path: '/students/1', component: StudentDetail },
{ path: '/students/2', component: StudentDetail },
{ path: '/students/3', component: StudentDetail },
// ... 100개?
```

동적 라우트를 쓰면:
```javascript
// 이것 하나로 /students/어떤숫자든 처리
{ path: '/students/:id', component: StudentDetail, props: true },
```

---

## props: true — id 값을 컴포넌트에 전달하는 방법

### props: true 없을 때 vs 있을 때

```javascript
// router/index.js
{ path: '/students/:id', component: StudentDetail, props: true }
//                                                  ^^^^^^^^^^
//                                      URL 파라미터를 props로 넘겨줘
```

```
props: true 없을 때:
  URL: /students/3
  StudentDetail.vue 에서 id를 쓰려면 useRoute()로 직접 꺼내야 함
  const route = useRoute()
  const id = route.params.id  // "3"

props: true 있을 때:
  URL: /students/3
  Vue Router가 자동으로 id="3" 을 props로 전달
  defineProps({ id: String })  // 바로 사용 가능
```

### 이 프로젝트 StudentDetail.vue

```javascript
// StudentDetail.vue
defineProps({
  id: String,   // props: true 덕분에 URL의 :id 가 여기로 들어옴
})

// 화면에서 바로 사용
// <p>학생 번호: {{ id }}</p>
```

---

## 실제 클릭 → 렌더링 전체 흐름

### StudentList.vue에서 학생 클릭 → StudentDetail.vue 표시

```
[1단계] StudentList.vue 에서 링크 클릭

  <RouterLink :to="{ name: 'student-detail', params: { id: student.id } }">
    3번 - 박학생 / Docker
  </RouterLink>

  클릭 대상: 박학생 (id: 3)


[2단계] Vue Router 처리

  name: 'student-detail' 로 routes 배열에서 찾기
    → { path: '/students/:id', name: 'student-detail', component: StudentDetail, props: true }
    → :id 자리에 3 대입
    → 이동할 경로: /students/3

  history.pushState({}, '', '/students/3')
  → 서버 요청 없이 주소창만 /students/3 으로 변경


[3단계] RouterView 업데이트

  App.vue 의 <RouterView />:
    이전: StudentList.vue 표시 중
    이제: StudentDetail.vue 로 교체
    (Header.vue 는 그대로 유지)


[4단계] props 전달

  props: true 설정 → URL 파라미터 자동 변환
    route.params.id = "3"
    → StudentDetail.vue 의 props.id = "3"


[5단계] 화면 표시

  +----------------------------------+
  | Header.vue (그대로 유지)          |
  +----------------------------------+
  | StudentDetail.vue                |
  |  - Student Detail 제목           |
  |  - 학생 번호: 3                  |
  |  - 현재 fullPath: /students/3    |
  |  - [Home으로 이동] [뒤로 가기]   |
  +----------------------------------+
```

---

## RouterLink — 클릭 가능한 이동 수단

`<RouterLink>`는 HTML의 `<a>` 태그와 비슷하지만,  
클릭 시 서버 요청 대신 Vue Router를 통해 이동한다.

### 두 가지 작성 방식

```html
<!-- 방식 1: 경로 문자열로 직접 -->
<RouterLink to="/courses">Courses</RouterLink>

<!-- 방식 2: 이름(name) + 파라미터 객체로 -->
<RouterLink :to="{ name: 'student-detail', params: { id: student.id } }">
  박학생
</RouterLink>
```

| | 방식 1 (경로 문자열) | 방식 2 (name + params) |
|--|---------------------|------------------------|
| 용도 | 고정 경로 이동 | 동적 경로 이동 |
| 변경에 강한가? | 경로 바꾸면 전부 수정 | name만 맞으면 경로 바꿔도 OK |
| 예시 | `to="/courses"` | `to="{ name: 'courses' }"` |

---

## useRoute vs useRouter — 헷갈리는 두 훅

컴포넌트 내부에서 라우터 관련 정보를 쓸 때 두 가지를 import한다:

```javascript
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()   // 현재 URL 정보를 읽는 용도
const router = useRouter() // 이동 명령을 내리는 용도
```

### useRoute — 현재 URL 정보 읽기

```javascript
const route = useRoute()

route.path        // "/students/3"
route.fullPath    // "/students/3"  (쿼리스트링 포함 시 "/search?keyword=vue")
route.params.id   // "3"            (동적 파라미터)
route.query.keyword // "vue"        (쿼리스트링 ?keyword=vue)
route.name        // "student-detail"
```

### useRouter — 이동 명령 내리기

```javascript
const router = useRouter()

router.push('/') // / 로 이동 (히스토리 스택에 추가)
router.push({ path: '/search', query: { keyword: 'vue' } }) // 쿼리 포함 이동
router.go(-1)    // 뒤로가기 (히스토리 스택 -1)
router.go(1)     // 앞으로가기
router.replace('/') // 이동 (스택에 추가 안 하고 현재 항목 교체)
```

### 이 프로젝트에서 쓰인 예시

```javascript
// StudentDetail.vue
const route = useRoute()
const router = useRouter()

// route: 현재 URL 표시용
<p>현재 fullPath: {{ route.fullPath }}</p>  // "/students/3"

// router: 버튼 클릭 시 이동 명령
const goHome = () => router.push('/')
const goBack = () => router.go(-1)
```

```javascript
// CourseDetail.vue
const goSearch = () => {
  router.push({
    path: '/search',
    query: { keyword: `course-${props.id}` }  // /search?keyword=course-1
  })
}
```

---

## 전체 파일 역할 정리

```
main.js
  역할: Vue 앱 생성, router 등록, #app 에 마운트
  핵심: app.use(router) → 앱 전체에서 RouterView/RouterLink 사용 가능해짐

router/index.js
  역할: URL ↔ 컴포넌트 매핑표
  핵심: routes 배열, createWebHistory(), beforeEach 가드

App.vue
  역할: 전체 레이아웃 틀
  핵심: <Header /> 고정 + <RouterView /> 가변 자리

Header.vue
  역할: 네비게이션 바 (항상 표시)
  핵심: <RouterLink> 로 각 페이지 이동

pages/*.vue
  역할: 각 경로에 해당하는 화면
  Home.vue          → /
  About.vue         → /about
  CourseList.vue    → /courses
  CourseDetail.vue  → /courses/:id  (props: id)
  StudentList.vue   → /students
  StudentDetail.vue → /students/:id (props: id)
  Search.vue        → /search
  NotFound.vue      → 그 외 모든 경로
```

---

## 렌더링 결과 구조 비교

### / 접속 시

```
+--------------------------------------------+
| [routerfirst] Home About Courses Students  |  <- Header.vue
+--------------------------------------------+
| Home                                       |
| 이 프로젝트는 Vue Router의...              |  <- Home.vue
| [강의 목록 보기] [수강생 목록 보기]        |
+--------------------------------------------+
```

### /students 접속 시

```
+--------------------------------------------+
| [routerfirst] Home About Courses Students  |  <- Header.vue (동일)
+--------------------------------------------+
| Student List                               |
| 학생을 클릭하면 상세 페이지로 이동합니다.  |  <- StudentList.vue
| 1번 - 김학생 / Vue.js                      |     (Home.vue 와 교체됨)
| 2번 - 이학생 / Spring Boot                 |
| 3번 - 박학생 / Docker                      |
+--------------------------------------------+
```

### /students/3 접속 시

```
+--------------------------------------------+
| [routerfirst] Home About Courses Students  |  <- Header.vue (동일)
+--------------------------------------------+
| Student Detail                             |
| 학생 번호: 3                               |  <- StudentDetail.vue
| 현재 fullPath: /students/3                 |     (StudentList.vue 와 교체됨)
| [Home으로 이동] [뒤로 가기]                |
+--------------------------------------------+
```

**Header.vue는 URL이 뭐가 되든 항상 그 자리에 있다.**  
**RouterView 자리만 URL에 따라 바뀐다.**

---

## 핵심 개념 한 줄 요약

| 개념 | 한 줄 설명 |
|------|-----------|
| `<RouterView />` | URL에 맞는 컴포넌트가 들어오는 자리 |
| `<RouterLink>` | 서버 요청 없이 Vue Router로 이동하는 링크 |
| `routes` 배열 | URL과 컴포넌트를 연결하는 매핑표 |
| `:id` (동적 라우트) | URL의 일부를 변수처럼 받는 문법 |
| `props: true` | URL 파라미터를 컴포넌트 props로 자동 전달 |
| `useRoute()` | 현재 URL 정보(params, query 등)를 읽는 훅 |
| `useRouter()` | push/go 등 이동 명령을 내리는 훅 |
