declare var require: any
var fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');
const galaxyMap = input.split("\r\n")
const galaxyMap2 = JSON.parse(JSON.stringify(galaxyMap))

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
        total += (Math.abs(galaxyCoords[i][0] - galaxyCoords[j][0]) + Math.abs(galaxyCoords[i][1] - galaxyCoords[j][1]))
    }
}
console.log("puzzle 1 total = " + total)

// *** PUZZLE 2 ***
// list empty rows
var emptyRowsList: number[] = []
for (var i = 0; i < galaxyMap2.length; i++) {
    if (galaxyMap2[i].indexOf("#") == -1) {
        emptyRowsList.push(i)
    }
}
// list empty columns#
var emptyColsList: number[] = []
for (var i = 0; i < galaxyMap2[0].length; i++) {
    var colIsEmpty = true
    for (var j = 0; j < galaxyMap2.length; j++) {
        if (galaxyMap2[j][i] == "#") {
            // console.log("column " + i + " NOT empty")
            colIsEmpty = false
            break
        }
    }
    if (colIsEmpty == true) {
        emptyColsList.push(i)
    }
}
// list coordinates of galaxies
var galaxyCoords2: number[][] = []
for (var i = 0; i < galaxyMap2.length; i++) {
    for (var j = 0; j < galaxyMap2[0].length; j++) {
        if (galaxyMap2[i][j] == "#") {
            galaxyCoords2.push([i,j])
        }
    }
}
// calculate sum of distances
var total2 = 0
for (var i = 0; i < galaxyCoords2.length; i++) {
    for (var j = i + 1; j < galaxyCoords2.length; j++) {
        // for each row in between the pair of galaxies,
        // if the row is not empty add 1 to the total distance, else add 1,000,000
        var minRow = Math.min(galaxyCoords2[i][0], galaxyCoords2[j][0])
        var maxRow = Math.max(galaxyCoords2[i][0], galaxyCoords2[j][0])
        for (var index = minRow; index < maxRow; index++){
            if (emptyRowsList.indexOf(index) == -1) {
                total2 += 1
            } else {
                total2 += 1000000
            }
        }
        // for each column in between the pair of galaxies,
        // if the column is not empty add 1 to the total distance, else add 1,000,000
        var minCol = Math.min(galaxyCoords2[i][1], galaxyCoords2[j][1])
        var maxCol = Math.max(galaxyCoords2[i][1], galaxyCoords2[j][1])
        for (var index = minCol; index < maxCol; index++){
            if (emptyColsList.indexOf(index) == -1) {
                total2 += 1
            } else {
                total2 += 1000000
            }
        }
    }
}
console.log("puzzle 2 total = " + total2)