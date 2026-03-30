#!/bin/bash
# GitHub CLI 설치 스크립트

echo "=== 1/3 GPG keyring 추가 ==="
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg

echo "=== 2/3 apt 소스 등록 ==="
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

echo "=== 3/3 설치 ==="
sudo apt update && sudo apt install gh -y

echo ""
echo "설치 완료! 이제 로그인하세요:"
echo "  gh auth login"
