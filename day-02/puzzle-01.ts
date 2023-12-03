/*
TS Setup notes:
npm install -g ts-node typescript '@types/node'
ts-node file.ts
*/

declare var require: any
var fs = require('fs');
const games1 = fs.readFileSync('input.txt', 'utf-8');
const gamesList1 = games1.split("\r\n")
var total = 0

for (var game of gamesList1) {
    var gameComponents = game.split(/[,;:]/) // splits game by all chars contained in the []
    var gameIsValid = true
    for (var j = 1; j < gameComponents.length; j++) {
        var textComponent = gameComponents[j].match(/[A-Za-z]+/) // extracts all alpha chars
        var numberComponent = parseInt(gameComponents[j].match(/\d+/)) // extracts all numeric chars
        if ((textComponent == "red" && numberComponent > 12) ||
            (textComponent == "green" && numberComponent > 13) ||
            (textComponent == "blue" && numberComponent > 14)) {
            gameIsValid = false
            break
        }
    }
    if (gameIsValid == true) {
        total += parseInt(gameComponents[0].match(/\d+/))
    }
}

console.log("total = " + total)