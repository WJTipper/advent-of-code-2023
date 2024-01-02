declare var require: any
var fs = require('fs');
const input14 = fs.readFileSync('input.txt', 'utf-8');
const rockMap = input14.split("\r\n")

// *** PUZZLE 1 ***
// moving rocks north if there is a empty space above them until no more rocks are moving
var rocksAreMoving = true
while (rocksAreMoving) {
    rocksAreMoving = false
    for (var i = 1; i < rockMap.length; i++) {
        for (var j = 0; j < rockMap[0].length; j++) {
            if (rockMap[i][j] == "O" && rockMap[i-1][j] == ".") {
                rockMap[i] = rockMap[i].slice(0,j) + "." + rockMap[i].slice(j + 1)
                rockMap[i - 1] = rockMap[i - 1].slice(0,j) + "O" + rockMap[i - 1].slice(j + 1)
                rocksAreMoving = true
            }
        }
    }
}
// calculating total load
var total = 0
for (var i = 0; i < rockMap.length; i++) {
    var rocksInRow = rockMap[i].match(/O/g)
    if (rocksInRow != null) {
        total += (rocksInRow.length * (rockMap.length - i))
    }
}
console.log("puzzle 1 total = " + total)