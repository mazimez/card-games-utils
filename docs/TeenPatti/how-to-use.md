# How To Use TeenPatti

- here is 1 basic example of how you can use `card-game-utils` to implement TeenPatti game's logic
- here we play the game between 3 players and log the result in console

```javascript
import { CardDeck, StandardDeck, TeenPatti } from 'card-games-utils'

//get the card deck(52 card)
let cardDeck = StandardDeck.getStandardDeck()

//shuffle the cards
cardDeck = CardDeck.shuffleCards(cardDeck)

//distribute the 3 cards into 3 different players
let distributedCards = CardDeck.distributeCards(cardDeck, 3, 3, true)[0]

//making hands for each player
let playerOneHand = TeenPatti.makeHand(distributedCards[0])
let playerTwoHand = TeenPatti.makeHand(distributedCards[1])
let playerThreeHand = TeenPatti.makeHand(distributedCards[2])

//assigning each player a name for easiness
playerOneHand.name = 'Johns'
playerTwoHand.name = 'Alex'
playerThreeHand.name = 'Sam'

//logging some data about which player has which kind of hand(you can log the whole player variable if you want)
console.log(`------------------------------------------`)
console.log(`${playerOneHand.name} has ${playerOneHand.hand} hand`)
console.log(`${playerTwoHand.name} has ${playerTwoHand.hand} hand`)
console.log(`${playerThreeHand.name} has ${playerThreeHand.hand} hand`)
console.log(`------------------------------------------`)

//making players array
let players = [playerOneHand, playerTwoHand, playerThreeHand]

//calculating the winner between the 3 players
let winnerIndexes = TeenPatti.calculateWinners(players)

//checking if we have 1 winner or it's a TIE
if (winnerIndexes.length == 1) {
  console.log(`the winner is ${players[winnerIndexes[0]].name}`)
} else {
  console.log('there is tie, winners are:')
  winnerIndexes.forEach((winnerIndex) => {
    console.log(players[winnerIndex].name)
  })
}
```
