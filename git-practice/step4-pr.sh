#!/bin/bash
# STEP 4: PR 생성 & 확인

cd ~/KB_code

echo "=== feature/html-form → main PR 생성 ==="
git checkout feature/html-form
git push origin feature/html-form

gh pr create \
  --title "feat: HTML 폼 유효성 검사 예제 추가" \
  --body "## 작업 내용
- login-form.html 생성
- 입력값 유효성 검사 추가

Closes #1" \
  --base main \
  --head feature/html-form

echo ""
echo "=== PR 목록 확인 ==="
gh pr list

echo ""
echo "=== 이슈 목록 확인 ==="
gh issue list

echo ""
echo "✅ STEP 4 완료! 다음: bash git-practice/step5-cherry-reset.sh"
