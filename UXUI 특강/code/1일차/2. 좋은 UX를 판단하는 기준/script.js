const loginBtn = document.getElementById("loginBtn");
const errorBox = document.getElementById("errorBox");
const successBox = document.getElementById("successBox");
const helperLink = document.getElementById("helperLink");
const userId = document.getElementById("userId");
const userPw = document.getElementById("userPw");

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
  resetMessages();

  const id = userId.value.trim();
  const pw = userPw.value.trim();

  if (id === "" && pw === "") {
    errorBox.textContent = "아이디와 비밀번호를 입력해주세요.";
    errorBox.classList.remove("hidden");
  } else if (id === "") {
    errorBox.textContent = "아이디를 입력해주세요.";
    errorBox.classList.remove("hidden");
  } else if (pw === "") {
    errorBox.textContent = "비밀번호를 입력해주세요.";
    errorBox.classList.remove("hidden");
  } else if (id !== "admin" || pw !== "1234") {
    errorBox.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
    errorBox.classList.remove("hidden");
    helperLink.classList.remove("hidden");
  } else {
    successBox.textContent = "로그인 성공!";
    successBox.classList.remove("hidden");
  }
});
