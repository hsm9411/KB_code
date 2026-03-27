const { user1, user2 } = require("./users-1"); // user.js에서 user 가져오기
const hello = require("./hello2"); // hello2.js에서 hello 가져오기
console.log(user1);
console.log(user2);
console.log(hello);
hello(user1); // 모듈에서 가져온 user 변수와 hello 함수 사용하기
hello(user2);
