declare var require: any
var fs = require('fs');
const input13 = fs.readFileSync('input.txt', 'utf-8');

// splitting input into patterns, then each pattern into lines
var valleyMap = input13.split("\r\n\r\n")
for (var i = 0; i < valleyMap.length; i++) {
    valleyMap[i] = valleyMap[i].split("\r\n")
}

var total = 0
for (var i = 0; i < valleyMap.length; i++) {
    // checking for horizontal reflection
    for (var j = 0; j < valleyMap[i].length - 1; j++) {
        var hoizontalReflection = true
        var indexAbove = j
        var indexBelow = j + 1
        while (indexAbove >= 0 && indexBelow < valleyMap[i].length) {
            if (valleyMap[i][indexAbove] != valleyMap[i][indexBelow]) {
                hoizontalReflection = false
                break
            } else {
                indexAbove--
                indexBelow++
            }
        }
        if (hoizontalReflection) {
            total += (100 * (j+1))
            break
        }
    }
    // checking for vertical reflection
    for (var j = 0; j < valleyMap[i][0].length - 1; j++) {
        var verticalReflection = true
        for (var k = 0; k < valleyMap[i].length; k++) {
            var leftStr = valleyMap[i][k].slice(0,j+1)
            var rightStr = valleyMap[i][k].slice(j+1)
            var trimLength = Math.min(leftStr.length, rightStr.length)
            leftStr = leftStr.slice(-1 * trimLength)
            rightStr = rightStr.slice(0,trimLength).split("").reverse().join("") // rightStr is reversed
            if (leftStr != rightStr) {
                verticalReflection = false
                break
            }
        }
        if (verticalReflection) {
            total += (j+1)
            break
        }
    }
}
console.log("puzzle 1 total = " + total)