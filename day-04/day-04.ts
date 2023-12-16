declare var require: any
var fs = require('fs');
const allCards = fs.readFileSync('input.txt', 'utf-8');
const cards = allCards.split("\r\n")
var total1 = 0

var hasNonzeroLength = (str: string) => {
    return str.length > 0
}

var arraySum = (total: number, elem: number) => {
    return total + elem
}

// *** PUZZLE 1 ***
for (let i = 0; i < cards.length; i++) {
    let matchesCounter = 0
    let winningNumbers = cards[i].split("|")[0].split(":")[1].split(" ").filter(hasNonzeroLength)
    let cardNumbers = cards[i].split(/\|/)[1].split(" ").filter(hasNonzeroLength)
    for (let num of winningNumbers) {
        if (cardNumbers.includes(num)) {
            matchesCounter++
        }
    }
    total1 += matchesCounter == 0 ? 0 : 2 ** (matchesCounter-1)
}
console.log("puzzle 1 total: " + total1)

// *** PUZZLE 2 ***
var amountOfCards: number[] = Array(cards.length).fill(1)

for (let i = 0; i < cards.length; i++) {
    let matchesCounter = 0
    let winningNumbers = cards[i].split("|")[0].split(":")[1].split(" ").filter(hasNonzeroLength)
    let cardNumbers = cards[i].split(/\|/)[1].split(" ").filter(hasNonzeroLength)

    for (let num of winningNumbers) {
        if (cardNumbers.includes(num)) {
            matchesCounter++
        }
    }

    for (let j = i + 1; j < i + 1 + matchesCounter; j++) {
        amountOfCards[j] += amountOfCards[i]
    }
}
console.log("puzzle 2 total: " + amountOfCards.reduce(arraySum, 0))
