class Person {
    constructor(n, f, s) {
        this.name = n;
        this.first = f;
        this.second = s;
    }
    sum() {
        return this.first + this.second
    }
}

// Person.prototype.avg = function () {
//     return (this.first + this.second) / 2
// }


class multiAgePerson extends Person {
    multiple() {
        return this.first * this.second
    }
}



var kim = new Person('kim', 10, 20)
console.log(kim.sum())
// console.log(kim.avg())

var b = new multiAgePerson('lee', 20, 30)
console.log(b.multiple())