declare var require: any
var fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');
const galaxyMap = input.split("\r\n")

// *** PUZZLE 1 ***
// expand empty rows
const emptyRow = ".".repeat(galaxyMap[0].length)
for (var i = 0; i < galaxyMap.length; i++) {
    if (galaxyMap[i].indexOf("#") == -1) {
        galaxyMap.splice(i,0,emptyRow)
        i++
    }
}
// expand empty columns
for (var i = 0; i < galaxyMap[0].length; i++) {
    var colIsEmpty = true
    for (var j = 0; j < galaxyMap.length; j++) {
        if (galaxyMap[j][i] == "#") {
            // console.log("column " + i + " NOT empty")
            colIsEmpty = false
            break
        }
    }
    if (colIsEmpty == true) {
        // console.log("column " + i + " IS empty")
        for (var j = 0; j < galaxyMap.length; j++) {
            galaxyMap[j] = [galaxyMap[j].slice(0,i) + "." + galaxyMap[j].slice(i)].join("")
        }
        i++
    }
}
// list coordinates of galaxies
var galaxyCoords: number[][] = []
for (var i = 0; i < galaxyMap.length; i++) {
    for (var j = 0; j < galaxyMap[0].length; j++) {
        if (galaxyMap[i][j] == "#") {
            galaxyCoords.push([i,j])
        }
    }
}
// calculate sum of distances
var total = 0
for (var i = 0; i < galaxyCoords.length; i++) {
    for (var j = i + 1; j < galaxyCoords.length; j++) {
        // console.log("i: " + galaxyCoords[i] + ", j: " + galaxyCoords[j])
        total += (Math.abs(galaxyCoords[i][0] - galaxyCoords[j][0]) + Math.abs(galaxyCoords[i][1] - galaxyCoords[j][1]))
    }
}
console.log("puzzle 1 total = " + total)
