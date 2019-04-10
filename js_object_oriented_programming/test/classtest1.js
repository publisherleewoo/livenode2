class Person {
    constructor(name, first, second) { //초기화
        console.log('초기화')
        this.name = name;
        this.first = first;
        this.second = second
    }

    sum() { //prototype에 저장
        return 'Person method sum is => ' + Number(this.first + this.second)
    }
}


class PersonPlus extends Person {
    constructor(name, first, second, third) {
        super(name, first, second) //부모클래스가 가지고있는 constructor을 실행
        this.third = third
    }

    sum() {
        return 'PersonPlus method sum is => ' + Number(this.first + this.second + this.third) // 위에 클래스와 중복이 있기때문에, super.sum() + this.third로 해야한다
    }

    avg() {
        return 'PersonPlus method sum is => ' + (Number(this.first + this.second + this.third) / 3)
    }
}


var kim = new Person('kim', 20, 30)
console.log(kim.sum())

var Lee = new PersonPlus('lee', 3, 6, 9)
console.log(Lee.sum())
console.log(Lee.avg())