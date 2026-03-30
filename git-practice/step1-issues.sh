#!/bin/bash
# STEP 1: 이슈 발급 & feature 브랜치 생성

cd ~/KB_code

echo "=== 이슈 3개 발급 ==="
gh issue create --title "feat: HTML 폼 유효성 검사 예제 추가" --body "login form 입력값 검증 실습"
gh issue create --title "feat: Vue 컴포넌트 리팩토링" --body "App.vue 분리 작업"
gh issue create --title "docs: README 업데이트" --body "프로젝트 설명 보완"

echo ""
echo "=== 이슈 목록 확인 ==="
gh issue list

echo ""
echo "=== feature 브랜치 2개 생성 ==="
git checkout -b feature/html-form
git checkout main
git checkout -b feature/vue-refactor
git checkout main

echo ""
echo "=== 브랜치 목록 ==="
git branch

echo ""
echo "✅ STEP 1 완료! 다음: bash git-practice/step2-conflict.sh"
