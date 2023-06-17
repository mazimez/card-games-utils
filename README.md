<div align="center">
    <p><img src="cover.png" width=500 alt="card games utils"></p>
    <p>
    <img src="https://img.shields.io/github/issues/mazimez/card-games-utils">
    <img src="https://img.shields.io/github/forks/mazimez/card-games-utils">
    <img src="https://img.shields.io/github/stars/mazimez/card-games-utils">
</p>
</div>

# Card Games Utils
Card Games Utils is a comprehensive utility package designed to streamline the implementation of various card games, such as TeenPatti and Rummy. Our package offers a range of helpful methods and tools to facilitate the development of game logic for these popular card games.

At present, Card Games Utils features a TeenPatti game logic implementation. Rummy and other games will be added soon.

# Table of contents
- [Installation](#Installation)
- <b>TeenPatti</b>
    * [How to Use](#How-to-Use-teen-patti)
    * [StandardCard Interface](#StandardCard)
    * [StandardDeck](#StandardDeck)
    * [Hand Interface](#Hand)  
    * [CardDeck Model](#CardDeck)
    * [TeenPatti Model](#TeenPatti)  


# Installation
Install the package via npm:

`npm i card-games-utils`

# How-to-Use-teen-patti
- here is 1 basic example of how you can use `card-game-utils` to implement TeenPatti game's logic
- here we play the game between 3 players and log the result in console

```javascript
import {CardDeck, StandardDeck,TeenPatti} from 'card-games-utils'

//get the card deck(52 card)
let cardDeck = StandardDeck.getStandardDeck()

//shuffle the cards
cardDeck = CardDeck.shuffleCards(cardDeck)

//distribute the 3 cards into 3 different players
let distributedCards = CardDeck.distributeCards(cardDeck,3,3,true)[0]

//making hands for each player
let playerOneHand = TeenPatti.makeHand(distributedCards[0])
let playerTwoHand = TeenPatti.makeHand(distributedCards[1])
let playerThreeHand = TeenPatti.makeHand(distributedCards[2])

//assigning each player a name for easiness
playerOneHand.name = "Johns"
playerTwoHand.name = "Alex"
playerThreeHand.name = "Sam"

//logging some data about which player has which kind of hand(you can log the whole player variable if you want)
console.log(`------------------------------------------`);
console.log(`${playerOneHand.name} has ${playerOneHand.hand} hand`);
console.log(`${playerTwoHand.name} has ${playerTwoHand.hand} hand`);
console.log(`${playerThreeHand.name} has ${playerThreeHand.hand} hand`);
console.log(`------------------------------------------`);

//making players array
let players = [
    playerOneHand,
    playerTwoHand,
    playerThreeHand
]

//calculating the winner between the 3 players
let winnerIndexes = TeenPatti.calculateWinners(players)

//checking if we have 1 winner or it's a TIE
if(winnerIndexes.length==1){
    console.log(`the winner is ${players[winnerIndexes[0]].name}`);
}else{
    console.log("there is tie, winners are:");
    winnerIndexes.forEach(winnerIndex => {
        console.log(players[winnerIndex].name);
    });
}
```
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
- `StandardDeck` is a class to work with  [StandardCard](src/interfaces/StandardCard.ts) interface.
- it has several methods that will help you use the [StandardCard](src/interfaces/StandardCard.ts) as you do in real word.
- here are the methods inside this Class: 
    - `getStandardDeck`:  this will return an array of StandardCard containing each unique card that we usually have in 1 deck of 52 cards
    ```javascript
    import {StandardDeck} from 'card-games-utils'

    let cardDeck = StandardDeck.getStandardDeck(); 
    //print the first card of the array, it will alway be the Ace of Clubs
    console.log(cardDeck[0]);
    ```
    - `getSuite`:  this will return the suite of the given card name, the suite will be like `CLUBS`, `DIAMONDS` etc.
    ```javascript
    import {StandardDeck} from 'card-games-utils'

    let cardDeck = StandardDeck.getStandardDeck();
    console.log(StandardDeck.getSuite(cardDeck[0].name)); //logs CLUBS
    ```
    - `getColor`:  this will return the Colour of the given card name, the Colour will be either `RED` or `BLACK` etc.
    ```javascript
    import {StandardDeck} from 'card-games-utils'

    let cardDeck = StandardDeck.getStandardDeck();
    console.log(StandardDeck.getColor(cardDeck[0].name)); //logs BLACK
    ```
    - `getRank`:  this will return the Rank of the given card name, the Rank could be `ACE`,`TWO` and also `JACK`, `QUEEN` etc.
    ```javascript
    import {StandardDeck} from 'card-games-utils'

    let cardDeck = StandardDeck.getStandardDeck();
    console.log(StandardDeck.getColor(cardDeck[0].name)); //logs ACE
    ```
    - `getNumber`:  this will return the Number of the given card name, the Number could be between 1 to 13 based on card(Ace will be 1 and King will be 13)
    ```javascript
    import {StandardDeck} from 'card-games-utils'

    let cardDeck = StandardDeck.getStandardDeck();
    console.log(StandardDeck.getNumber(cardDeck[0].name)); //logs 1
    ```

# Hand
The `Hand` class represents a hand in Teen Patti, which is a combination of three standard playing cards. It is defined in the [Hand](src/interfaces/Hand.ts) interface.

A `Hand` object has the following properties:

- `cards`: An array of three [StandardCard](src/interfaces/StandardCard.ts) objects that make up the hand.
- `hand`: A string indicating the type of hand, such as `TRAIL`, `PURE_SEQUENCE`, and so on. This property represents the classification of the hand according to the rules of Teen Patti.

The `Hand` class is used to represent the real-world hand of cards in the Teen Patti game. It allows you to store and manipulate the cards within a hand, as well as determine the type of hand it represents based on the rules of the game.
# CardDeck
- [CardDeck](src/model/CardDeck.ts) is the class to perform normal operations on any kind of Deck of cards.
- this is not limited to TeenPatti but it can be used in any other game modules that has some kind of card (like Rummy, Poker etc)
- here are the methods inside this Class:
    - `shuffleCards`: this will shuffle the cards into random order.
    ```javascript
    import {StandardDeck,CardDeck} from 'card-games-utils'

    let cardDeck = StandardDeck.getStandardDeck();
    console.log(CardDeck.shuffleCards(cardDeck)); //logs the array of card in random order
    ```
    - `distributeCards`: this will Distribute the specified number of cards per player to given number of players.
        - you need to parse some parameters like `number of players` and how many cards you want per `player`. it has has 1 optional parameter that will decide how the cards should be distributed among the player
        - it can either give all card to 1 player first or it can give 1 card to 1 player and repeat it until all player has the enough cards(it's called dealing around)
        - it will return array of 2 elements, first will be the array of distributed cards for each player, and other will be the the array cards remaining after distributing it.
    ```javascript
    import {StandardDeck,CardDeck} from 'card-games-utils'

    let cardDeck = StandardDeck.getStandardDeck();
    //logs the array of distributed cards for each player
    console.log(CardDeck.distributeCards(cardDeck,3,3,true)[0]);
    ```
# TeenPatti
- [TeenPatti](src/model/TeenPatti.ts) is the class of perform the operations that a normal TeenPatti game needs
- here are the methods inside this Class:
    - `sortCards`: it will sort the given Array of Card in ascending order of it's number
    - here in example below, we pass the array of 4 cards in sortCards method and it will return those cards in proper ascending order.
    ```javascript
    import {StandardDeck,CardDeck,TeenPatti} from 'card-games-utils'

    let cardDeck = StandardDeck.getStandardDeck();
    //logs the card array in ascending order
    console.log(TeenPatti.sortCards([cardDeck[2],cardDeck[0],cardDeck[0],cardDeck[3]]));
    ```
    - `calculateHand`: it will Calculates the Teen Patti hand based on an array of three cards.
    - since TeenPatti hand should have 3 card, this methods only focus on first 3 element of given array.
    ```javascript
    import {StandardDeck,CardDeck,TeenPatti} from 'card-games-utils'

    let cardDeck = StandardDeck.getStandardDeck();
    //logs PURE_SEQUENCE since it's first 3 cards of deck.
    console.log(TeenPatti.calculateHand([cardDeck[0],cardDeck[1],cardDeck[2]]));
    ```
    - `makeHand`: it will convert the given array of 3 cards into Hand interface.
    - since TeenPatti hand should have 3 card, this methods only focus on first 3 element of given array.
    ```javascript
    import {StandardDeck,CardDeck,TeenPatti} from 'card-games-utils'

    let cardDeck = StandardDeck.getStandardDeck();
    //logs the Hand interface's info
    console.log(TeenPatti.makeHand([cardDeck[0],cardDeck[1],cardDeck[2]]));
    ```
    - `calculateWinners`: it will Calculates the winner from the given array of Hands.
    - each hands will belongs to a player and it will return the index of winner hand(player) in an Array
    - there can be a case where the TIE happens, means 2 or more players have cards with same value(ranking), in this case the returning array will have more then 1 index of winners.
    ```javascript
    import {StandardDeck,TeenPatti} from 'card-games-utils'


    let cardDeck = StandardDeck.getStandardDeck();
    //logs [0] since it's the highest of hands given
    console.log(TeenPatti.calculateWinners([
        TeenPatti.makeHand([cardDeck[0],cardDeck[1],cardDeck[2]]),
        TeenPatti.makeHand([cardDeck[3],cardDeck[4],cardDeck[5]]),
        TeenPatti.makeHand([cardDeck[6],cardDeck[7],cardDeck[8]]),
    ]));
    ```
    - `isRankHigher`: it will Calculates the higher ranking hand from given hands
    - it takes 2 hands as parameter and return true is first hand is ranked higher then second one, else it will return false
    - there can be a case where the TIE happens, means 2 or more players have cards with same value(ranking), in this case the returning array will have more then 1 index of winners.
    ```javascript
    import {StandardDeck,TeenPatti} from 'card-games-utils'


    let cardDeck = StandardDeck.getStandardDeck();
    //logs true since first card-hand is higher then other
    console.log(TeenPatti.isRankHigher(    
        TeenPatti.makeHand([cardDeck[0],cardDeck[1],cardDeck[2]]),    
        TeenPatti.makeHand([cardDeck[3],cardDeck[4],cardDeck[5]]),
    ));
    ```
