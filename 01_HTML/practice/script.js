document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault(); // 폼 제출 방지

  // 필드 가져오기
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  // 오류 메시지 초기화
  const errorMsgs = document.querySelectorAll(".error-msg");
  errorMsgs.forEach((msg) => (msg.textContent = ""));

  let isValid = true; // 유효성 검사 결과

  // 이름 검사
  if (username.value.trim() === "") {
    showError(username, "이름을 입력해주세요.");
    isValid = false;
  }

  /*
정규 표현식 (emailRegex)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
^와 $: 문자열의 시작과 끝을 의미합니다.
[^\s@]+:
^ 뒤에 오는 \s는 공백을 의미하고, @는 @ 기호입니다.
[^\s@]: 공백(\s)과 @를 제외한 문자들을 뜻합니다.
+: 하나 이상 있어야 합니다.
@: @ 기호는 반드시 포함되어야 합니다.
[^\s@]+: @ 다음에도 공백과 @를 제외한 문자가 하나 이상 와야 합니다.
\.: 점(.)이 포함되어야 합니다.
[^\s@]+: 마지막 부분(도메인 확장자)도 공백과 @를 제외한 문자가 하나 이상 있어야 합니다.
*/

  // 이메일 검사 (정규 표현식 사용)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    showError(email, "올바른 이메일 형식을 입력해주세요.");
    isValid = false;
  }

  // 비밀번호 검사
  if (password.value.length < 6) {
    showError(password, "비밀번호는 최소 6자 이상이어야 합니다.");
    isValid = false;
  }

  // 비밀번호 확인 검사
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "비밀번호가 일치하지 않습니다.");
    isValid = false;
  }

  // 최종 유효성 검사
  if (isValid) {
    alert("회원가입이 완료되었습니다!");
    // 여기에 서버로 데이터 전송 등의 로직을 추가할 수 있습니다.
  }
});

// 오류 표시 함수
function showError(input, message) {
  const errorMsg = input.nextElementSibling; // small 태그 선택
  errorMsg.textContent = message;
  input.style.borderColor = "red";
  input.addEventListener("input", () => {
    errorMsg.textContent = "";
    input.style.borderColor = "#ccc";
  });
}
