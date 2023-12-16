/*
// REGEX TESTING:
let symbols: string[] = []
let numbers: string[] = []
let everythingElse: string[] = []
let symbolAndNumber: string[] = []
let pushCounter = 0
for (var char of engineSchematic) {
    pushCounter = 0
    if (char.match(/[-!$#@%^&*()_+|~=`{}\[\]:";'<>?,\/]/)) {
        symbols.push(char)
        pushCounter++
    }
    if (char.match(/[0-9]+/)) {
        numbers.push(char)
        pushCounter++
    }
    if (pushCounter == 0) {everythingElse.push(char)}
    if (pushCounter == 2) {symbolAndNumber.push(char)}
}
function onlyUnique(value: string, index: number, array: string[]) {
    return array.indexOf(value) === index;
}
var uniqueSym = symbols.filter(onlyUnique);
var uniqueNum = numbers.filter(onlyUnique);
var uniqueEe = everythingElse.filter(onlyUnique);
var uniqueSAN = symbolAndNumber.filter(onlyUnique);
console.log("symbols:")
console.log(uniqueSym)
console.log("numbers:")
console.log(uniqueNum)
console.log("everythingElse:")
console.log(uniqueEe)
console.log("symbolAndNumber:")
console.log(uniqueSAN)

// FINAL REGEXS
// .match(/[-!$#@%^&*()_+|~=`{}\[\]:";'<>?,\/]/)
// .match(/[0-9]+/)

// REGEX TESTING END
*/

declare var require: any
var fs = require('fs');
const engineSchematic = fs.readFileSync('input.txt', 'utf-8');
const lines = engineSchematic.split("\r\n")
var total1 = 0
var total2 = 0
const numberOfLines = lines.length
const lineLength = lines[0].length

// *** PUZZLE 1 ***
var checkNum = (lineIndex: number, startIndex: number, endIndex: number): boolean => {
    const indicesToCheck = [
        [lineIndex - 1, startIndex - 1],
        [lineIndex, startIndex - 1],
        [lineIndex + 1, startIndex - 1],
        [lineIndex - 1, endIndex + 1],
        [lineIndex, endIndex + 1],
        [lineIndex + 1, endIndex + 1],
    ]
    // check corners & char directly to the left/right
    for (var indexPair of indicesToCheck) {
        if (indexPair[0] >= 0 && indexPair[0] < numberOfLines && indexPair[1] >= 0 && indexPair[1] < lineLength) {
            if (lines[indexPair[0]][indexPair[1]].match(/[-!$#@%^&*()_+|~=`{}\[\]:";'<>?,\/]/)) {
                return true
            }
        }
    }
    // check line above & below
    for (let i = startIndex; i < endIndex + 1; i++) {
        if (lineIndex > 0) {
            // check prev line between start & end index inclusive
            if (lines[lineIndex - 1][i].match(/[-!$#@%^&*()_+|~=`{}\[\]:";'<>?,\/]/)) {
                return true
            }
        }
        if (lineIndex < numberOfLines - 1) {
            // check next line between start & end index inclusive
            if (lines[lineIndex + 1][i].match(/[-!$#@%^&*()_+|~=`{}\[\]:";'<>?,\/]/)) {
                return true
            }
        }
    }
    return false
}

for (let i = 0; i < numberOfLines; i++) {
    let startIndex = 0
    for (let j = 0; j < lineLength; j++) {
        // if current char is not a number then continue
        if (!lines[i][j].match(/[0-9]+/)) {
            continue
        }

        // if current char is the start of a new number then record start index
        // ie if char is num && (prev char is not num || j = 0)
        if (lines[i][j].match(/[0-9]+/) && (j == 0 || !lines[i][j - 1].match(/[0-9]+/))) {
            startIndex = j
        }

        // if current char is the end of a number then call checkNum & add to total if valid
        // ie if char is num & (next char is not num or j >= linelength - 1)
        if (lines[i][j].match(/[0-9]+/) && (j >= lineLength - 1 || !lines[i][j + 1].match(/[0-9]+/))) {
            if (checkNum(i, startIndex, j)) {
                total1 += parseInt(lines[i].slice(startIndex, j + 1))
            }
        }
    }
}
console.log("puzzle 1 total: " + total1)

// *** PUZZLE 2 ***
var hasNonzeroLength = (str: string) => {
    return str.length > 0
}

var calcGearRatio = (i: number, j: number): number => {
    let adjacentNums: number[] = []

    for (let index of [i - 1, i + 1]) {
        let numsToCheck = lines[index].slice(Math.max(j - 3, 0), Math.min(j + 4, lineLength - 1))
        if (!numsToCheck.charAt(1).match(/[0-9]+/)) {
            // console.log("before " + numsToCheck)
            numsToCheck = numsToCheck.slice(2)
            // console.log("after " + numsToCheck)
        } else if (!numsToCheck.charAt(2).match(/[0-9]+/)) {
            // console.log("here1")
            numsToCheck = numsToCheck.slice(3)
        }
        if (!numsToCheck.charAt(numsToCheck.length - 2).match(/[0-9]+/)) {
            // console.log("before " + numsToCheck)
            numsToCheck = numsToCheck.slice(0, -2)
            // console.log("after " + numsToCheck)
        } else if (!numsToCheck.charAt(numsToCheck.length - 3).match(/[0-9]+/)) {
            // console.log("here2")
            numsToCheck = numsToCheck.slice(0, -3)
        }
        numsToCheck = numsToCheck.split(/[-!$#@%.^&*()_+|~=`{}\[\]:";'<>?,\/]/).filter(hasNonzeroLength)
        // console.log(numsToCheck)
        for (let num of numsToCheck) {
            adjacentNums.push(parseInt(num))
        }
        console.log("numsToCheck @index " + index + " = " + numsToCheck)
    }

    // left: if num then step left to find start
    let leftNumsToCheck = lines[i].slice(Math.max(j - 3, 0), j)
    if (!leftNumsToCheck.charAt(2).match(/[0-9]+/)) {
        leftNumsToCheck = ""
    } else if (!leftNumsToCheck.charAt(1).match(/[0-9]+/)) {
        // console.log("before " + numsToCheck)
        leftNumsToCheck = leftNumsToCheck.slice(1, 3)
        // console.log("after " + numsToCheck)
    }
    leftNumsToCheck = leftNumsToCheck.split(/[-!$#@%.^&*()_+|~=`{}\[\]:";'<>?,\/]/).filter(hasNonzeroLength)
    for (let num of leftNumsToCheck) {
        adjacentNums.push(parseInt(num))
    }
    console.log("leftNumsToCheck: " + leftNumsToCheck)

    // right: if num then step right to find end
    let rightNumsToCheck = lines[i].slice(j + 1, Math.min(Math.min(j + 4, lineLength - 1)))
    if (!rightNumsToCheck.charAt(0).match(/[0-9]+/)) {
        rightNumsToCheck = ""
    } else if (!rightNumsToCheck.charAt(1).match(/[0-9]+/)) {
        // console.log("before " + numsToCheck)
        rightNumsToCheck = rightNumsToCheck.slice(0, 2)
        // console.log("after " + numsToCheck)
    }
    // else if () {

    // }
    rightNumsToCheck = rightNumsToCheck.split(/[-!$#@%.^&*()_+|~=`{}\[\]:";'<>?,\/]/).filter(hasNonzeroLength)
    for (let num of rightNumsToCheck) {
        adjacentNums.push(parseInt(num))
    }
    console.log("rightNumsToCheck: " + rightNumsToCheck)

    
    // calc product of nums in array
    console.log(adjacentNums)
    if (adjacentNums.length != 2) {
        return 0
    } else {
        return adjacentNums.reduce((a,b) => a*b, 1)
    }
}
// calcGearRatio(6,26)
// console.log(calcGearRatio(4,46))

// let i = 1
for (let i = 6; i < 9; i++) {
    for (let j = 0; j < lineLength; j++) {
        if (lines[i][j] == "*") {
            const charToCheck = [
                lines[i - 1][j - 1],
                lines[i][j - 1],
                lines[i + 1][j - 1],
                lines[i + 1][j],
                lines[i - 1][j],
                lines[i - 1][j + 1],
                lines[i][j + 1],
                lines[i + 1][j + 1],
            ]
            for (let char of charToCheck) {
                if (char.match(/[0-9]+/)) {
                    // console.log("digit found: " + char)
                    // total2 += calcGearRatio(i,j)
                    let tempVal = calcGearRatio(i,j)
                    total2 += tempVal
                    console.log("ratio = " + tempVal)
                    console.log("total = " + total2)
                    break
                }
            }
        }
    }
}
console.log("puzzle 2 total: " + total2)
