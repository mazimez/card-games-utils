# How to Use Rummy

- keep in mind that package provide only logical part of games, you still need to handle the user's card manipulation
- there can be many variations of Rummy game, this package allows you to configure the rules before starting the game
- there some rules that will stay same for any variation of rummy, specially for deciding the valid SET, SEQUENCE and PURE_SEQUENCE. those fixed rules are given below:
  - `SET` : set needs to have at least 3 cards in it.
    - JOKER/WILD-CARD is allowed in the SET
    - At least 1 card needs to be a normal card(no JOKER/WILD-CARD)
    - cards in `SET` must have same rank(number)
    - cards in `SET` must have different suites(except JOKER/WILD-CARD)
    - cards count can not be more then 4 and less then 3.
  - `SEQUENCE` : sequence needs to have at least 3 cards in it
    - JOKER/WILD-CARD is allowed in the SEQUENCE
    - At least 2 cards needs to be a normal cards(no JOKER/WILD-CARD)
    - cards in `SEQUENCE` must have same suites(except JOKER/WILD-CARD)
    - cards in `SEQUENCE` must be in sequence(except JOKER/WILD-CARD)(Q-K-A is also valid)
    - no limit on cards count/length
  - `PURE-SEQUENCE` : pure-sequence needs to have at least 3 cards in it
    - JOKER/WILD-CARD is `NOT` allowed in the PURE-SEQUENCE
    - cards in `PURE-SEQUENCE` must have same suites
    - cards in `PURE-SEQUENCE` must be in sequence(Q-K-A is also valid)
    - no limit on cards count/length

```javascript
import { CardDeck, Rummy, StandardDeck } from 'card-games-utils'

//get the card deck(52 card) - you can merge 2 deck if you want more cards
//adding the joker card in deck by passing true as a parameter
let cardDeck = StandardDeck.getStandardDeck(true)

//shuffle the cards
cardDeck = CardDeck.shuffleCards(cardDeck)

//distribute the 9 cards into 3 different players - you can change it based on your requirement
let distributedCardsSet = CardDeck.distributeCards(cardDeck, 3, 9, true)

//taking the distributed cards array into separate variable
let distributedCards = distributedCardsSet[0]

//taking the remaining cards from deck into another array
let remainingCards = distributedCardsSet[1]

//taking 1 card from remaining deck and setting it as a WildCard
let wildCard = remainingCards.pop()

//making the rummy config all the desired rules
const rummyConfig = Rummy.makeRummyConfig(true, true, true, true, true, 9)

//creating new instance of Rummy with desired rules
const rummyGame = new Rummy(rummyConfig)

//making melds for each player - you can define the groups any way you want
let playerOneMeld = rummyGame.makeMeld(distributedCards[0], [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
])
let playerTwoMeld = rummyGame.makeMeld(distributedCards[1], [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
])
let playerThreeMeld = rummyGame.makeMeld(distributedCards[2], [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
])

//assigning each player a name for easiness
playerOneMeld.name = 'Johns'
playerTwoMeld.name = 'Alex'
playerThreeMeld.name = 'Sam'

// you can change any groups or any player here or add/remove any cards from them in order to make a proper meld that can be declare

//making players array
let players = [playerOneMeld, playerTwoMeld, playerThreeMeld]

//checking if any player's meld is ready to declare - with wildcard
let isPlayerDeclared = false

players.forEach((playerMeld, index) => {
  if (rummyGame.isReadyToDeclare(playerMeld, wildCard.name).isValid) {
    console.log(`player ${players[index].name} has declared and won`)
    isPlayerDeclared = true
  }
})

//if not player is ready to declare, then logging each players points
if (!isPlayerDeclared) {
  console.log(`no player is ready to declare`)
  players.forEach((playerMeld, index) => {
    console.log(
      `player ${players[index].name} has ${
        rummyGame.isReadyToDeclare(playerMeld, wildCard.name).points
      } points`
    )
  })
}
```
