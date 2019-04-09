var kim = {
    name: 'kim',
    first: 10,
    second: 20,
    third: 30,
    sum: function () {
        return this.first + this.second + this.third;
    }
}

var lee = {
    name: 'lee',
    first: 10,
    second: 10,
    third: 10,
    sum: function () {
        return this.first + this.second + this.third;
    }
}

console.log(kim.sum())
console.log(lee.sum())




function Person(name, f, s, t) {
    this.name = name;
    this.first = f;
    this.second = s;
    this.third = t;
    this.sum = function () {
        return this.first + this.second + this.third
    }
}


var kim = new Person('kim', 10, 20, 30)  // new:객체를 만드는 생성자(constructor)
var lee = new Person('lee', 10, 10, 10)
console.log('new', kim.sum())
console.log('new', lee.sum())

