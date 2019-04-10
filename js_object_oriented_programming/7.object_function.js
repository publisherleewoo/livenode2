// var kim = { name: 'kim', first: 10, second: 20 };
// var lee = { name: 'lee', first: 10, second: 10 };

// function sum() {
//     return this.first + this.second
// }

// console.log('sum.call(kim)', sum.call(kim))
// console.log('sum.call(lee)', sum.call(lee))

var kim = { name: 'kim', first: 10, second: 20 };
var lee = { name: 'lee', first: 10, second: 10 };

function sum(prefix) {
    return prefix + (this.first + this.second)
}

console.log('sum.call(kim)', sum.call(kim, '=>'))
console.log('sum.call(lee)', sum.call(lee, ':'))

//함수.call(this가바인드될객체,함수로 넘어갈 매개변수). 함수실행할떄 컨텍스트(this의값)을 바꾼다

var kimSum = sum.bind(kim, '->')  //sum에 영향을 주지 않는다. 영구적으로 바꾼것을 담은 변수를 생성
console.log('kimSum()', kimSum())