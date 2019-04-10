// function Person(name, first, second) {
//     this.name = name;
//     this.first = first;
//     this.second = second;
// }

// Person.prototype.avg = function () {
//     return this.first + this.second
// }


// var lee = new Person('lee', 20, 10)
// console.log(lee.avg())

// var kim = new Person('kim', 10, 10)
// kim.sum = function () {
//     return 'modified : ' + (this.first + this.second)
// }

// console.log(kim.sum())


// var kim = {
//     name: 'kim',
//     age: 20,
//     address: 'seoul',

// }

// console.log(kim)

// var lee = Object.create(kim)
// lee.age = 30
// lee.nick = "SHI"
// console.log(lee.name)



var a = {
    aa: 'hi',
    test: function () {
        return this.aa
    }
}
var b = Object.create(a)
b.aa = "bye"

console.log(a.test())
console.log(a.test.call(b))