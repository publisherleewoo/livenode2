var memberArray = ['egoing', 'graphittie', 'leezhce'];
// console.log('memberArray[2]', memberArray[2])

//create
var memberObject = {  //연관된 변수와 함수를 모아서 그룹핑하고 이름을 붙이는것.
    manager: 'egoing',
    developer: 'graphittie',
    designner: 'leezhce'
}

//update
memberObject.designner = "test"

//read
console.log('after update memberObject', memberObject)

//delete
delete memberObject.manager
console.log('after delete memberObject', memberObject)