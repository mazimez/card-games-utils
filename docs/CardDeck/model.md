# CardDeck Model

- [CardDeck](/src/models/CardDeck.ts) is the class to perform normal operations on any kind of Deck of cards.
- this is not limited to TeenPatti but it can be used in any other game modules that has some kind of card (like Rummy, Poker etc.)
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
