var memberArray = ['egoing', 'graphittie', 'leezhce'];

console.group('array loop')
var i = 0;
while (i < memberArray.length) {
    console.log(i, memberArray[i])
    i = i + 1;
}
console.group('array loop')


var memberObject = {
    manager: 'egoing',
    developer: 'graphittie',
    designner: 'leezhce'
}
console.group('object loop')
for (var key in memberObject) {
    console.log(key + ',' + memberObject[key])
}
console.group('object loop')