declare var require: any
var fs = require('fs');
const games2 = fs.readFileSync('input.txt', 'utf-8');
const gamesList2 = games2.split("\r\n")
var total = 0

for (var game of gamesList2) {
    var gameComponents = game.split(/[,;:]/)
    var minRed = 0
    var minGreen = 0
    var minBlue = 0
    for (var j = 1; j < gameComponents.length; j++) {
        var textComponent = gameComponents[j].match(/[A-Za-z]+/)
        var numberComponent = parseInt(gameComponents[j].match(/\d+/))
        if (textComponent == "red") {
            minRed = Math.max(minRed, numberComponent)
        } else if (textComponent == "green") {
            minGreen = Math.max(minGreen, numberComponent)
        } else if (textComponent == "blue") {
            minBlue = Math.max(minBlue, numberComponent)
        }
    }
    total += (minRed * minGreen * minBlue)
}

console.log("total = " + total)