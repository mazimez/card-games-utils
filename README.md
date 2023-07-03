<div align="center">
    <p><img src="cover.png" width=500 alt="card games utils"></p>
    <p>
    <img src="https://img.shields.io/github/issues/mazimez/card-games-utils">
    <img src="https://img.shields.io/github/forks/mazimez/card-games-utils">
    <img src="https://img.shields.io/github/stars/mazimez/card-games-utils">
    <img src="https://img.shields.io/npm/v/card-games-utils.svg?style=flat-square">
</p>
</div>

# Card Games Utils

Card Games Utils is a comprehensive utility package designed to streamline the implementation of various card games, such as TeenPatti and Rummy. Our package offers a range of helpful methods and tools to facilitate the development of game logic for these popular card games.

At present, Card Games Utils features a TeenPatti game logic and Rummy game logic implementation. other games will be added soon.

# Table of contents

- [Installation](#Installation)
- [StandardCard Interface](#StandardCard)
- [StandardDeck](#StandardDeck)
- [CardDeck Model](#CardDeck)
- [StandardCardHelper](#StandardCardHelper)
- <b>TeenPatti</b>

  - [How to Use](#How-to-Use-teen-patti)
  - [Hand Interface](#Hand)
  - [TeenPatti Model](#TeenPatti)

- <b>Rummy</b>
  - [How to Use](#How-to-Use-rummy)
  - [Meld Interface](#Meld)
  - [Rummy Model](#Rummy)

# Installation

Install the package via npm:

`npm i card-games-utils`

# StandardCard

The [StandardCard](src/interfaces/StandardCard.ts) class represents a standard playing card. It has the following properties:

- `name`: The name of the card.
- `color`: The color of the card.
- `rank`: The rank of the card.
- `suite`: The suite of the card.
- `number`: The number value of the card.

This class is used to represent a real card in the real world, and it is returned by most of the methods in the package, either as an array or as an individual element.

By utilizing the `StandardCard` class, you can work with playing cards in a standardized and convenient manner.

# StandardDeck

- `StandardDeck` is a class to work with [StandardCard](src/interfaces/StandardCard.ts) interface.
- it has several methods that will help you use the [StandardCard](src/interfaces/StandardCard.ts) as you do in real word.
- here are the methods inside this Class:

  - `getStandardDeck`: this will return an array of StandardCard containing each unique card that we usually have in 1 deck of 52 cards

  ```javascript
  import { StandardDeck } from 'card-games-utils'

  let cardDeck = StandardDeck.getStandardDeck()
  //print the first card of the array, it will alway be the Ace of Clubs
  console.log(cardDeck[0])
  ```

  - `getSuite`: this will return the suite of the given card name, the suite will be like `CLUBS`, `DIAMONDS` etc.

  ```javascript
  import { StandardDeck } from 'card-games-utils'

  let cardDeck = StandardDeck.getStandardDeck()
  console.log(StandardDeck.getSuite(cardDeck[0].name)) //logs CLUBS
  ```

  - `getColor`: this will return the Colour of the given card name, the Colour will be either `RED` or `BLACK` etc.

  ```javascript
  import { StandardDeck } from 'card-games-utils'

  let cardDeck = StandardDeck.getStandardDeck()
  console.log(StandardDeck.getColor(cardDeck[0].name)) //logs BLACK
  ```

  - `getRank`: this will return the Rank of the given card name, the Rank could be `ACE`,`TWO` and also `JACK`, `QUEEN` etc.

  ```javascript
  import { StandardDeck } from 'card-games-utils'

  let cardDeck = StandardDeck.getStandardDeck()
  console.log(StandardDeck.getColor(cardDeck[0].name)) //logs ACE
  ```

  - `getNumber`: this will return the Number of the given card name, the Number could be between 1 to 13 based on card(Ace will be 1 and King will be 13)

  ```javascript
  import { StandardDeck } from 'card-games-utils'

  let cardDeck = StandardDeck.getStandardDeck()
  console.log(StandardDeck.getNumber(cardDeck[0].name)) //logs 1
  ```

# CardDeck

- [CardDeck](src/model/CardDeck.ts) is the class to perform normal operations on any kind of Deck of cards.
- this is not limited to TeenPatti but it can be used in any other game modules that has some kind of card (like Rummy, Poker etc)
- here are the methods inside this Class:

  - `shuffleCards`: this will shuffle the cards into random order.

  ```javascript
  import { StandardDeck, CardDeck } from 'card-games-utils'

  let cardDeck = StandardDeck.getStandardDeck()
  console.log(CardDeck.shuffleCards(cardDeck)) //logs the array of card in random order
  ```

  - `distributeCards`: this will Distribute the specified number of cards per player to given number of players.
    - you need to parse some parameters like `number of players` and how many cards you want per `player`. it has has 1 optional parameter that will decide how the cards should be distributed among the player
    - it can either give all card to 1 player first or it can give 1 card to 1 player and repeat it until all player has the enough cards(it's called dealing around)
    - it will return array of 2 elements, first will be the array of distributed cards for each player, and other will be the the array cards remaining after distributing it.

  ```javascript
  import { StandardDeck, CardDeck } from 'card-games-utils'

  let cardDeck = StandardDeck.getStandardDeck()
  //logs the array of distributed cards for each player
  console.log(CardDeck.distributeCards(cardDeck, 3, 3, true)[0])
  ```

# StandardCardHelper

- [StandardCardHelper](src/helpers/StandardCardHelper.ts) is a class to help you with [StandardCard](src/interfaces/StandardCard.ts) interface.
- It has several helper methods that's getting used at multiple places in whole package.
- you can also use any helper methods as you see fit.
- here are some helper methods in it:

  - `makeStandardCard`: it will generate the StandardCard object for given card name.
  - here in example below, we pass the name of card from [StandardDeckEnum](src/constants/StandardDeckEnum.ts), and it returns the StandardCard object.

  ```javascript
  import { StandardCardHelper, StandardCardName } from 'card-games-utils'

  let card = StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE)
  //logs the card with all info like color, number, rank etc.
  console.log(card)
  ```

  - `sortCards`: it will sort the given Array of Card in ascending order of it's number
  - here in example below, we pass the array of 4 cards in sortCards method and it will return those cards in proper ascending order.

  ```javascript
  import { StandardCardHelper, StandardCardName } from 'card-games-utils'

  let cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FOUR),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
  ]
  //logs the sorted array
  console.log(StandardCardHelper.sortCards(cards))
  ```

  - `hasSameSuite`: it will check on the given Array of Card that does all cards have same suite or not
  - here in example below, we first pass the array of 4 cards with same suite and then 4 cards from different suites. the helper method will return Boolean to indicate that suite is same or not
  - there is 1 more method called `hasSameNumber` that does the same thing just instead of suites, it checks for numbers.

  ```javascript
  import { StandardCardHelper, StandardCardName } from 'card-games-utils'

  let cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FOUR),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
  ]
  //logs true
  console.log(StandardCardHelper.hasSameSuite(cards))
  cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FOUR),
    StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_EIGHT),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
  ]
  //logs false
  console.log(StandardCardHelper.hasSameSuite(cards))
  ```

  - `hasPairSuite`: it will check is there is any pair of cards with same suite in the given array.
  - here in example below, we first pass the cards with all different suites and then pass the cards that has 1 pair of same suite. the helper method will return Boolean to indicate that there is any pair of suite exist or not.
  - there is 1 more method called `hasPairNumber` that does the same thing just instead of suites, it checks for numbers.

  ```javascript
  import { StandardCardHelper, StandardCardName } from 'card-games-utils'

  let cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.SPADES_ACE),
  ]
  //logs false
  console.log(StandardCardHelper.hasPairSuite(cards))
  cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FOUR),
    StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_EIGHT),
    StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
  ]
  //logs true
  console.log(StandardCardHelper.hasPairSuite(cards))
  ```

# How-to-Use-teen-patti

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

# Hand

The `Hand` represents a hand in Teen Patti, which is a combination of three standard playing cards. It is defined in the [Hand](src/interfaces/Hand.ts) interface.

A `Hand` object has the following properties:

- `cards`: An array of three [StandardCard](src/interfaces/StandardCard.ts) objects that make up the hand.
- `hand`: A string indicating the type of hand, such as `TRAIL`, `PURE_SEQUENCE`, and so on. This property represents the classification of the hand according to the rules of Teen Patti.

The `Hand` is used to represent the real-world hand of cards in the Teen Patti game. It allows you to store and manipulate the cards within a hand, as well as determine the type of hand it represents based on the rules of the game.

# TeenPatti

- [TeenPatti](src/model/TeenPatti.ts) is the class to perform the operations that a normal TeenPatti game needs
- here are the methods inside this Class:

  - `calculateHand`: it will Calculates the Teen Patti hand based on an array of three cards.
  - since TeenPatti hand should have 3 card, this methods only focus on first 3 element of given array.

  ```javascript
  import { StandardDeck, CardDeck, TeenPatti } from 'card-games-utils'

  let cardDeck = StandardDeck.getStandardDeck()
  //logs PURE_SEQUENCE since it's first 3 cards of deck.
  console.log(TeenPatti.calculateHand([cardDeck[0], cardDeck[1], cardDeck[2]]))
  ```

  - `makeHand`: it will convert the given array of 3 cards into Hand interface.
  - since TeenPatti hand should have 3 card, this methods only focus on first 3 element of given array.

  ```javascript
  import { StandardDeck, CardDeck, TeenPatti } from 'card-games-utils'

  let cardDeck = StandardDeck.getStandardDeck()
  //logs the Hand interface's info
  console.log(TeenPatti.makeHand([cardDeck[0], cardDeck[1], cardDeck[2]]))
  ```

  - `calculateWinners`: it will Calculates the winner from the given array of Hands.
  - each hands will belongs to a player and it will return the index of winner hand(player) in an Array
  - there can be a case where the TIE happens, means 2 or more players have cards with same value(ranking), in this case the returning array will have more then 1 index of winners.

  ```javascript
  import { StandardDeck, TeenPatti } from 'card-games-utils'

  let cardDeck = StandardDeck.getStandardDeck()
  //logs [0] since it's the highest of hands given
  console.log(
    TeenPatti.calculateWinners([
      TeenPatti.makeHand([cardDeck[0], cardDeck[1], cardDeck[2]]),
      TeenPatti.makeHand([cardDeck[3], cardDeck[4], cardDeck[5]]),
      TeenPatti.makeHand([cardDeck[6], cardDeck[7], cardDeck[8]]),
    ])
  )
  ```

  - `isRankHigher`: it will Calculates the higher ranking hand from given hands
  - it takes 2 hands as parameter and return true is first hand is ranked higher then second one, else it will return false
  - there can be a case where the TIE happens, means 2 or more players have cards with same value(ranking), in this case the returning array will have more then 1 index of winners.

  ```javascript
  import { StandardDeck, TeenPatti } from 'card-games-utils'

  let cardDeck = StandardDeck.getStandardDeck()
  //logs true since first card-hand is higher then other
  console.log(
    TeenPatti.isRankHigher(
      TeenPatti.makeHand([cardDeck[0], cardDeck[1], cardDeck[2]]),
      TeenPatti.makeHand([cardDeck[3], cardDeck[4], cardDeck[5]])
    )
  )
  ```

# How-to-Use-rummy

- here is 1 example of how 1 Rummy game can be handled by this package.
- keep in mind that package provide only logical part of games, you still need to handle the user's card manipulation
- since Rummy's rules has lot of variations, new updates will make this Rummy Module configurable with different rules so it can meet your needs.

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

//making melds for each player - you can define the groups any way you want
let playerOneMeld = Rummy.makeMeld(distributedCards[0], [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
])
let playerTwoMeld = Rummy.makeMeld(distributedCards[1], [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
])
let playerThreeMeld = Rummy.makeMeld(distributedCards[2], [
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
  if (Rummy.isReadyToDeclare(playerMeld, wildCard.name)) {
    console.log(`player ${index + 1} has declared and won`)
    isPlayerDeclared = true
  }
})
if (!isPlayerDeclared) {
  console.log(`no player is ready to declare`)
}
```

# Meld

The `Meld` represents a meld in Teen Patti, which is a combination of 13 or more standard playing cards. It is defined in the [Meld](src/interfaces/Meld.ts) interface.

A `Meld` object has the following properties:

- `cards`: An array of 13 or more [StandardCard](src/interfaces/StandardCard.ts) objects that make up the Meld.
- `groups`: A Multidimensional array dividing the cards array into different groups by it's indexes. this different group of indexes is used to make different set(like Sequence, pure Sequence).

The `Meld` is used to represent the real-world meld of cards in the Rummy game. It allows you to store and manipulate the cards within a meld, you can change the position of card just by changing it from group array and also transfer it into different group and you can also add/remove card from the `cards` array just like the real-word Rummy game.

# Rummy

- [Rummy](src/models/Rummy.ts) is the class to perform the operations that a normal Rummy game needs
- here are the methods inside this Class:

  - `makeMeld`: this will return the meld object from the given array of card and groups of index
  - it takes 2 parameters, first is the array of cards which represent the real-world cards and second is the multidimensional array that determines the different groups among that array of cards
  - once that `meld` is created, you can change any card from the array and also update the groups array in order to prepare the meld for declare.

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'

  let meld = Rummy.makeMeld(
    [
      //SET
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
      //SEQUENCE
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_SIX),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
      //PURE SEQUENCE
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
    ],
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ]
  )

  //changing the 3rd card from the cards arrays
  meld.cards[2] = StandardCardHelper.makeStandardCard(StandardCardName.SPADES_ACE)

  //replacing the 0th and 2nd index of the 2nd group of groups variable
  let tempIndex = meld.groups[1][0]
  meld.groups[1][0] = meld.groups[1][2]
  meld.groups[1][2] = tempIndex

  //logs the meld with updated values
  console.log(meld)
  ```

  - `getCardGroup`: this will return the multidimensional array of StandardCard[][] that's generated from the cards and groups array from the given meld
  - it takes meld object as parameter and generate the StandardCard[][] array according to meld's cards and returns it

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'

  let meld = Rummy.makeMeld(
    [
      //SET
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
      //SEQUENCE
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_SIX),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
      //PURE SEQUENCE
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
    ],
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ]
  )

  //prints the array of card divided into 3 parts based on groups array of meld
  console.log(Rummy.getCardGroup(meld))
  ```

  - `sortMeld`: this will rearrange the groups from given meld to separate all the cards from same suite into separate group

  - it takes meld object as parameter and rearrange it's groups and return that meld
  - the new group of meld will have 5 elements(each element for 1 suite like CLUB, HEART, SPADES etc and 1 for JOKER)

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'
  let meld = Rummy.makeMeld(
    [
      //SET
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
      //SEQUENCE
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_SIX),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
      //PURE SEQUENCE
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
    ],
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ]
  )
  //logs true
  console.log(Rummy.isReadyToDeclare(meld))
  ```

  - `isInSequence`: this method checks is the given cards are in sequence.
  - it takes cards array(StandardCard[]) and also 1 more optional parameter of `wildCardName` that's the name of wildCard that will considered as JOKER if needed.
  - the if the cards array contains real joker then that would be considered too.
  - keep in mind that 1 group of cards can only have 1 Real joker and 1 WildCard, if there are more then that then it would not be considered as a valid sequence.
  - in future update, these rule will be `configurable` then you can decide how this logic will work

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'
  let cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  ]
  //logs false(since this cards are not in sequence)
  console.log(Rummy.isInSequence(cards))
  cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  ]
  //logs true(since CLUBS_FIVE is used as wild card)
  console.log(Rummy.isInSequence(cards, StandardCardName.CLUBS_FIVE))
  cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  ]
  //logs true(since CLUBS_FIVE is used as wild card and JOKER will work as real joker)
  console.log(Rummy.isInSequence(cards, StandardCardName.CLUBS_FIVE))
  ```

  - `isInPureSequence`: this method checks is the given cards are in pure sequence.
  - it takes cards array(StandardCard[]) and since it's pure sequence, any JOKER or wildcard wont work here, it needs to be PURE sequence
  - in future update, these rule will be `configurable` then you can decide how this logic will work

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'
  let cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
  ]
  //logs true since the cards are in pur sequence
  console.log(Rummy.isInPureSequence(cards))
  ```

  - `isInSet`: this method checks is the given cards are in SET.
  - it takes cards array(StandardCard[]) and also 1 more optional parameter of `wildCardName` that's the name of wildCard that will considered as JOKER if needed.
  - in future update, these rule will be `configurable` then you can decide how this logic will work

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'
  let cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.SPADES_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
  ]
  //logs true
  console.log(Rummy.isInSet(cards))
  ```

  - `isReadyToDeclare`: decide if given meld is ready to declare. it just check in all the groups from meld and if there is 1 group with 1 Set, 1 Sequence and 1 pure Sequence.
  - if takes `meld` as the first parameter and a `WildCard` as second parameter. this `WildCard` is to make a `SET` or `SEQUENCE` with that wild-card
  - it returns the Boolean indicating that is this meld ready for declaring or not, thus deciding this is a winner or not.
  - the logic is based on the other 3 functions explained above, so this method does not require any configuration.

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'
  let cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.SPADES_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
  ]
  //logs true
  console.log(Rummy.isInSet(cards))
  ```
