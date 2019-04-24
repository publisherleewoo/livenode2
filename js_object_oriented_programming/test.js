// var a = ['a', 'b', 'c']

// var b = {
//     a: 'hi',
//     b: 'bye',
//     d: 'dd',
//     e: 'ee'
// }

// b.c = "hello"
// delete b.b
// console.log(b)


// for (var i = 0, len = a.length; i < len; i += 1) {
//     console.log(a[i])
// }

// var bkey = Object.keys(b);
// for (var i = 0, len = bkey.length; i < len; i += 1) {
//     console.log(b[bkey[i]])
// }

// for (var key in b) {
//     console.log(b[key])
// }


/*
var kim = {
    name: 'kim',
    age: 20,
    address: 'seoul',
    intr: function () {
        return this.name + ',' + this.age + ',' + this.address
    }
}

var lee = {
    name: 'lee',
    age: 30,
    address: 'busan',
    intr: function () {
        return this.name + ',' + this.age + ',' + this.address
    }
}

console.log(kim.intr())
console.log(lee.intr())


function Person(name, age, address) {   //factory
    this.name = name;
    this.age = age;
    this.address = address;

}

Person.prototype.intr = function () {
    return this.name + ',' + this.age + ',' + this.address
}

function plusFunc(mf) {
    return this.intr() + ',' + mf
}


var park = new Person('park', 25, 'jeju')
var hwang = new Person('hwang', 40, 'deagu')
console.log(park.intr())
console.log(hwang.intr())

var tom = new Person('tom', 37, 'united');
console.log(plusFunc.call(tom, 'male'))
*/


// var superObj = {
//     superVal: 'superObj Value'
// }

// var subObj = Object.create(superObj)
// subObj.subVal = 'superObj Value';
// console.log('superObj.superVal=>', superObj.superVal)
// console.log('subObj.superVal=>', subObj.superVal)

// console.log('subObj.subVal=> ', subObj.subVal)


// var kim = {
//     name: 'kim',
//     age: 20,
//     address: 'seoul',
//     intr: function () {
//         return this.name + ',' + this.age + ',' + this.address
//     }
// }


// var park = Object.create(kim)
// console.log(park)

function Person(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
}
Person.prototype.intr = function () {
    return this.name + ',' + this.age + ',' + this.address
}

var lee = new Person('lee', 20, 'seoul')
var kim = Object.create(lee)  //함수가 실행되면서 객체가 만들어짐.  설탕 문법
/*var kim ={}; kim.__proto__ = lee로 해도되나 비권장*/

kim.name = 'kim';
kim.age = 25;
kim.address = "busan";
kim.sumint = function () {
    return this.name + this.address
}
console.log('lee', lee)

console.log('kim', kim)


// console.log(lee.intr())
// console.log(lee.sumint())