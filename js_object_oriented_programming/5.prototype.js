function Person(name, f, s, t) {
    this.name = name;
    this.first = f;
    this.second = s;
    this.third = t;
    this.sum = function () {
        return this.first + this.second + this.third
    }  // 생성자함수로 객체를 생성할때마다 메모리 낭비가된다. 해결법은 prototype
}


var kim = new Person('kim', 10, 20, 30)  // 생성자 new로 객체(constructor)를 만든다.

kim.sum = function () {
    return 'modified : ' + (this.first + this.second + this.third)
}
var lee = new Person('lee', 10, 10, 10)
lee.sum = function () {
    return 'modified : ' + (this.first + this.second + this.third)
}

console.log('new', kim.sum())
console.log('new', lee.sum())

