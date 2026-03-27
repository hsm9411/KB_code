const c = require("ansi-colors");

function hello(name) {
  console.log(c.green(name) + " 님, 안녕하세요?");
}

hello("홍길동");
// 코드러너로 실행 편하게dir
