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
    constructor(name, first, second, third) {
        super(name, first, second)   // 부모것을 가져옴  , 괄호가있으면 부모의 constructor(객체)를 가르킴
        this.third = third
    }
    sum() {
        return super.sum() + this.third   //괄호가없으면 부모의 클래스를 자체를 뜻한다.
    }

    avg() {
        return (this.first + this.second + this.third) / 2
    }
}



var kim = new PersonPlus('kim', 10, 20, 30)

console.log('kim', kim.sum())
console.log('kim', kim.avg())
