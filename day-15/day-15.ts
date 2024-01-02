declare var require: any
var fs = require('fs');
const input15 = fs.readFileSync('input.txt', 'utf-8');
const initSequence = input15.replaceAll("\r\n", "").split(",")

var calcHash = (str: string) => {
    var currentValue = 0
    for (var i = 0; i < str.length; i++) {
        currentValue += str.charCodeAt(i)
        currentValue *= 17
        currentValue %= 256
    }
    return currentValue
}

// *** PUZZLE 1 ***
var total1 = 0
for (var i = 0; i < initSequence.length; i++) {
    total1 += calcHash(initSequence[i])
}
console.log("puzzle 1 total = " + total1)

// *** PUZZLE 2 ***
const boxes: string[][] = [[]]
while (boxes.length < 256) {
    boxes.push([])
}
for (var i = 0; i < initSequence.length; i++) {
    if (initSequence[i].indexOf("=") != -1) {
        var label = initSequence[i].slice(0,initSequence[i].indexOf("="))
        var boxNum = calcHash(label)
        if (boxes[boxNum].length > 0) {
            var lensAlreadyInBox = false
            for (var j = 0; j < boxes[boxNum].length; j++) {
                if (boxes[boxNum][j].indexOf(label) != -1) {
                    // replacing a lens in the box
                    boxes[boxNum][j] = initSequence[i]
                    lensAlreadyInBox = true
                }
            }
            if (lensAlreadyInBox == false) {
                // adding a lens to the box
                boxes[boxNum].push(initSequence[i])
            }
        } else {
            boxes[boxNum].push(initSequence[i])
        }
    } else {
        // removing the specified lens
        var label = initSequence[i].slice(0,initSequence[i].indexOf("-"))
        var boxNum = calcHash(label)
        for (var j = 0; j < boxes[boxNum].length; j++) {
            if (boxes[boxNum][j].indexOf(label) != -1) {
                boxes[boxNum].splice(j,1)
                break
            }
        }
    }
}
// calculating total focussing power
var total2 = 0
for (var i = 0; i < boxes.length; i++) {
    for (var j = 0; j < boxes[i].length; j++) {
        total2 += ((i+1) * (j+1) * parseInt(boxes[i][j].slice(-1)))
    }
}
console.log("puzzle 2 total = " + total2)