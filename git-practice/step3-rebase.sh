#!/bin/bash
# STEP 3: Rebase & Squash

cd ~/KB_code

echo "=== feature/html-form 브랜치로 이동 ==="
git checkout feature/html-form

echo ""
echo "=== 커밋 3개 만들기 (나중에 squash할 재료) ==="
mkdir -p 01_HTML
echo "<form><!-- 초안 --></form>" > 01_HTML/login-form.html
git add . && git commit -m "wip: 로그인 폼 초안"

echo "<form><!-- 입력 필드 추가 --><input type='text'/></form>" > 01_HTML/login-form.html
git add . && git commit -m "wip: 입력 필드 추가"

echo "<form><!-- 유효성 검사 추가 --><input type='text' required/></form>" > 01_HTML/login-form.html
git add . && git commit -m "wip: 유효성 검사 완성"

echo ""
echo "=== 현재 커밋 히스토리 ==="
git log --oneline -5

echo ""
echo "⭐ 위 wip 커밋 3개를 1개로 squash합니다"
echo "에디터가 열리면:"
echo "  - 첫 번째 줄: pick 그대로 유지"
echo "  - 두 번째, 세 번째 줄: pick → s 로 변경 후 저장"
echo ""
read -p "준비되면 Enter를 누르세요..."

git rebase -i HEAD~3

echo ""
echo "=== squash 후 히스토리 ==="
git log --oneline -5

echo ""
echo "=== main 기준으로 rebase (깔끔한 히스토리) ==="
git rebase main

echo ""
echo "=== 최종 히스토리 ==="
git log --oneline -6

echo ""
echo "✅ STEP 3 완료! 다음: bash git-practice/step4-pr.sh"
