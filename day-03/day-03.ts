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

    // checking the line above and below for numbers adjacent to the *
    for (let index of [i - 1, i + 1]) {
        let numsToCheck = lines[index].slice(Math.max(j - 3, 0), Math.min(j + 4, lineLength))
        if (!numsToCheck.charAt(1).match(/[0-9]+/)) {
            numsToCheck = numsToCheck.slice(2)
        } else if (!numsToCheck.charAt(2).match(/[0-9]+/)) {
            numsToCheck = numsToCheck.slice(3)
        }
        if (!numsToCheck.charAt(numsToCheck.length - 2).match(/[0-9]+/)) {
            numsToCheck = numsToCheck.slice(0, -2)
        } else if (!numsToCheck.charAt(numsToCheck.length - 3).match(/[0-9]+/)) {
            numsToCheck = numsToCheck.slice(0, -3)
        }
        numsToCheck = numsToCheck.split(/[-!$#@%.^&*()_+|~=`{}\[\]:";'<>?,\/]/).filter(hasNonzeroLength)
        for (let num of numsToCheck) {
            adjacentNums.push(parseInt(num))
        }
    }

    // checking the current line to the left for numbers adjacent to the *
    let leftNumsToCheck = lines[i].slice(Math.max(j - 3, 0), j)
    if (!leftNumsToCheck.charAt(2).match(/[0-9]+/)) {
        leftNumsToCheck = ""
    } else if (!leftNumsToCheck.charAt(1).match(/[0-9]+/)) {
        leftNumsToCheck = leftNumsToCheck.slice(1, 3)
    }
    leftNumsToCheck = leftNumsToCheck.split(/[-!$#@%.^&*()_+|~=`{}\[\]:";'<>?,\/]/).filter(hasNonzeroLength)
    for (let num of leftNumsToCheck) {
        adjacentNums.push(parseInt(num))
    }

    // checking the current line to the right for numbers adjacent to the *
    let rightNumsToCheck = lines[i].slice(j + 1, Math.min(Math.min(j + 4, lineLength - 1)))
    if (!rightNumsToCheck.charAt(0).match(/[0-9]+/)) {
        rightNumsToCheck = ""
    } else if (!rightNumsToCheck.charAt(1).match(/[0-9]+/)) {
        rightNumsToCheck = rightNumsToCheck.slice(0, 2)
    }
    rightNumsToCheck = rightNumsToCheck.split(/[-!$#@%.^&*()_+|~=`{}\[\]:";'<>?,\/]/).filter(hasNonzeroLength)
    for (let num of rightNumsToCheck) {
        adjacentNums.push(parseInt(num))
    }
    
    // if there are exactly 2 adjacent numbers then return their product, else return zero
    if (adjacentNums.length == 2) {
        return adjacentNums.reduce((a,b) => a*b, 1)
    } else {
        return 0
    }
}

// main loop
for (let i = 0; i < numberOfLines; i++) {
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
                    total2 += calcGearRatio(i,j)
                    break
                }
            }
        }
    }
}
console.log("puzzle 2 total: " + total2)
