// function Person(name, f, s) {
//     this.name = name;
//     this.first = f;
//     this.second = s;
//      
// }
// Person.prototype.sum = function () {
//     return this.first + this.second  
// }   

// var kim = new Person('kim', 10, 20)  // new:객체를 만드는 생성자(constructor)

// console.log('new', kim.sum())
// console.log('new', lee.sum())


class Person {  //객체를 만드는 공장
    constructor(name, first, second) {
        console.log('constrouctor')  //생성자로 객체(컨스트럭터)가 생성되는 과정에서 실행
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {   //프로토타입에 들어갈 메서드
        return this.first + this.second
    }
}

class PersonPlus extends Person {
    avg() {
        return (this.first + this.second) / 2
    }
}


var kim = new PersonPlus('kim', 10, 20)
var lee = new PersonPlus('lee', 10, 10)


console.log('kim', kim.avg())
console.log('lee', lee.avg())
