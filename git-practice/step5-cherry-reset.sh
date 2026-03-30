#!/bin/bash
# STEP 5: Cherry-pick & Reset

cd ~/KB_code

echo "=== feature/html-form의 커밋 해시 확인 ==="
git log --oneline feature/html-form -5

echo ""
echo "=== feature/vue-refactor 브랜치로 이동 ==="
git checkout feature/vue-refactor

echo ""
# html-form 브랜치의 마지막 커밋 해시 가져오기
HASH=$(git log --oneline feature/html-form -1 | awk '{print $1}')
echo "=== cherry-pick: html-form의 최신 커밋($HASH)을 가져옵니다 ==="
git cherry-pick $HASH

echo ""
echo "=== cherry-pick 후 히스토리 ==="
git log --oneline -5

echo ""
echo "⭐ Reset 실습"
echo "=== 테스트용 커밋 2개 만들기 ==="
echo "test1" >> 03_vue/test-reset.txt
git add . && git commit -m "test: reset 실습용 커밋 1"

echo "test2" >> 03_vue/test-reset.txt
git add . && git commit -m "test: reset 실습용 커밋 2"

echo ""
echo "=== 현재 히스토리 ==="
git log --oneline -5

echo ""
echo "--- soft reset: 커밋만 취소, 파일은 staged 상태 유지 ---"
git reset --soft HEAD~1
echo "reset --soft 후 상태:"
git status

echo ""
read -p "확인했으면 Enter..."

echo ""
echo "--- hard reset: 커밋 + 변경사항 모두 삭제 (주의!) ---"
git reset --hard HEAD~1
echo "reset --hard 후 히스토리:"
git log --oneline -5

echo ""
echo "✅ 모든 실습 완료!"
echo ""
echo "=== 최종 정리 ==="
echo "브랜치 목록:"
git branch
echo ""
echo "이슈 목록:"
gh issue list
echo ""
echo "PR 목록:"
gh pr list
