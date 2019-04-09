console.log('Math.PI', Math.PI)
console.log('Math.random', Math.random())
console.log('Math.floor(3.9)', Math.floor(3.9))

var MyMath = { //연관된 변수와 함수를 모아서 그룹핑하고 이름을 붙이는것.
    PI: Math.PI,
    random: function () {
        return Math.random()
    },
    floor: function (val) {
        return Math.floor(val)
    }
}

console.log('MyMath.PI', MyMath.PI)
console.log('MyMath.random()', MyMath.random())
console.log('MyMath.floor(3.9)', MyMath.floor(3.9))


//디렉토리를 배우기 싫은상황일때
var MyMath_PI = Math.PI;
function MyMath_random() {
    return Math.random()
}
function MyMath_floor(val) {
    return Math.floor(val)
}