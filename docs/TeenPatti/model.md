# TeenPatti Model

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
