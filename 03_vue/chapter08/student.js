class Student {
  constructor(name, age) {
    this._name = name;
    this.age = age;
  }
  printProfile() {
    console.log(`이름 : ${this.name}, 나이 : ${this.age}`);
  }
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
}
let s1 = new Student("홍길동", 20);
console.log(s1.name);
s1.name = "고길동";
console.log(s1.name);
console.log(s1);
