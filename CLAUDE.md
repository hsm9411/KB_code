# 프로젝트 개요

다양한 주제의 학습 코드를 모아놓은 레포지토리.

## 폴더 구조

```
/
├── 01_HTML/      # HTML/CSS/JS 기초 연습
├── 02_nodejs/    # Node.js 연습
└── 03_vue/       # Vue.js 연습 (Bootstrap 포함)
```

## 커밋 규칙

### 형식
```
<타입>(<범위>): <한 줄 요약>
```

### 타입
| 타입 | 용도 |
|------|------|
| `study` | 새 개념 학습, 예제 따라하기 |
| `practice` | 직접 코드 작성 |
| `fix` | 오류 수정 |
| `refactor` | 코드 정리/개선 |
| `add` | 파일/리소스 추가 |

### 범위
`html` / `nodejs` / `vue`

### 예시
```
study(vue): slot 기본 개념 및 ProductList 컴포넌트 실습
study(html): flexbox 레이아웃 챕터9 실습
practice(vue): todolist-app provide 방식으로 리팩토링
fix(nodejs): 파일 읽기 비동기 처리 오류 수정
```

### 커밋 단위
- 하루 한 번 또는 주제가 바뀔 때마다 커밋
- `git add .` 대신 작업한 폴더 단위로 add
- 주제가 다르면 커밋을 나눠서 올리기
