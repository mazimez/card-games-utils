# StandardDeck Interface

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

  - `getColor`: this will return the Color of the given card name, the Color will be either `RED` or `BLACK` etc.

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
