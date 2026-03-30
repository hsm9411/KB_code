const loginBtn = document.getElementById("loginBtn");
const errorBox = document.getElementById("errorBox");

// 메시지 초기화 함수
// 로그인 시도 전에 기존 메시지를 모두 숨기고 초기화
function resetMessages() {
  // 메시지 영역 숨기기
  errorBox.classList.add("hidden");
  successBox.classList.add("hidden");
  helperLink.classList.add("hidden");

  // 메시지 내용 초기화
  errorBox.textContent = "";
  successBox.textContent = "";
}

loginBtn.addEventListener("click", () => {
  errorBox.textContent = "오류가 발생했습니다.";
  errorBox.classList.remove("hidden");
});
