#!/bin/bash
# STEP 2: 충돌(Conflict) 발생 & 해결

cd ~/KB_code

echo "=== feature/html-form 브랜치에서 README 수정 ==="
git checkout feature/html-form
echo "## HTML Form 예제 - 폼 유효성 검사 실습" >> README.md
git add README.md
git commit -m "docs: html-form 섹션 추가 (#1)"

echo ""
echo "=== feature/vue-refactor 브랜치에서 README 같은 부분 수정 ==="
git checkout feature/vue-refactor
echo "## Vue 리팩토링 계획 - App.vue 컴포넌트 분리" >> README.md
git add README.md
git commit -m "docs: vue-refactor 섹션 추가 (#2)"

echo ""
echo "=== main에 html-form 먼저 merge ==="
git checkout main
git merge feature/html-form

echo ""
echo "=== vue-refactor merge 시도 → 충돌 발생! ==="
git merge feature/vue-refactor

echo ""
echo "⚠️  충돌이 발생했습니다!"
echo "아래 명령어로 충돌난 파일을 확인하세요:"
echo "  cat README.md"
echo ""
echo "충돌 해결 후 아래 순서로 실행하세요:"
echo "  1. nano README.md  (또는 code README.md)"
echo "     <<<<<<< 와 >>>>>>> 사이를 원하는 내용으로 수정"
echo "  2. git add README.md"
echo "  3. git commit -m 'merge: conflict 해결'"
echo ""
echo "해결 완료 후: bash git-practice/step3-rebase.sh"
