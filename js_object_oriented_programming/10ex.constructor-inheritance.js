class Person {
    constructor(name, first, second) { //초기화
        console.log('초기화')
        this.name = name;
        this.first = first;
        this.second = second
    }
    sum() { //prototype에 저장
        return this.first + this.second
    }
}

class PersonPlus extends Person {
    constructor(name, first, second, third) {
        super(name, first, second) //부모클래스가 가지고있는 constructor을 실행
        this.third = third
    }

    sum() {
        return super.sum() + this.third
    }

    avg() {
        return this.first + this.second + this.third
    }
}

var kim = new PersonPlus('kim', 10, 20, 30)
console.log(kim.sum())
console.log(kim.avg())