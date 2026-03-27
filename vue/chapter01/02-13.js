let obj = { result: 0 };
obj.add = function (x, y) {
  function inner() {
    this.result = x + y;
  }
  inner(); // inner 내부 함수는 일반 함수임(메서드가 아님)
};
obj.add(3, 4);
console.log(obj); // { result: 0 }
console.log(result); // 7
