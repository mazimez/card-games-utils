# Rummy Model

- [Rummy](src/models/Rummy.ts) is the class to perform the operations that a normal Rummy game needs
- here are the methods inside this Class:

  - `makeMeld`: this will return the meld object from the given array of card and groups of index
  - it takes 2 parameters, first is the array of cards which represent the real-world cards and second is the multidimensional array that determines the different groups among that array of cards
  - once that `meld` is created, you can change any card from the array and also update the groups array in order to prepare the meld for declare.

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'

  const rummyConfig = Rummy.makeRummyConfig(true, true, true, true, true, 9)
  const rummyGame = new Rummy(rummyConfig)

  let meld = rummyGame.makeMeld(
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

  const rummyConfig = Rummy.makeRummyConfig(true, true, true, true, true, 9)
  const rummyGame = new Rummy(rummyConfig)

  let meld = rummyGame.makeMeld(
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
  console.log(rummyGame.getCardGroup(meld))
  ```

  - `sortMeld`: this will rearrange the groups from given meld to separate all the cards from same suite into separate group

  - it takes meld object as parameter and rearrange it's groups and return that meld
  - the new group of meld will have 5 elements(each element for 1 suite like CLUB, HEART, SPADES etc. and 1 for JOKER)

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'
  const rummyConfig = Rummy.makeRummyConfig(true, true, true, true, true, 9)
  const rummyGame = new Rummy(rummyConfig)
  let meld = rummyGame.makeMeld(
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
  //logs the RummyDeclareCheck object
  console.log(rummyGame.isReadyToDeclare(meld))
  ```

  - `isInSequence`: this method checks is the given cards are in sequence.
  - it takes cards array(StandardCard[]) and also 1 more optional parameter of `wildCardName` that's the name of wildCard that will considered as JOKER if needed.
  - the if the cards array contains real joker then that would be considered too.

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'
  const rummyConfig = Rummy.makeRummyConfig(true, true, true, true, true, 9)
  const rummyGame = new Rummy(rummyConfig)
  let cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  ]
  //logs RummyDeclareCheck object as false(since this cards are not in sequence)
  console.log(rummyGame.isInSequence(cards))
  cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  ]
  //logs RummyDeclareCheck object as true(since CLUBS_FIVE is used as wild card)
  console.log(rummyGame.isInSequence(cards, StandardCardName.CLUBS_FIVE))
  cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  ]
  //logs RummyDeclareCheck object as false(since at least 2 normal card is required for sequence)
  console.log(rummyGame.isInSequence(cards, StandardCardName.CLUBS_FIVE))
  ```

  - `isInPureSequence`: this method checks is the given cards are in pure sequence.
  - it takes cards array(StandardCard[]) and since it's pure sequence, any JOKER or wildcard wont work here, it needs to be PURE sequence

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'
  const rummyConfig = Rummy.makeRummyConfig(true, true, true, true, true, 9)
  const rummyGame = new Rummy(rummyConfig)
  let cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
  ]
  //logs RummyDeclareCheck object as true since the cards are in pur sequence
  console.log(rummyGame.isInPureSequence(cards))
  ```

  - `isInSet`: this method checks is the given cards are in SET.
  - it takes cards array(StandardCard[]) and also 1 more optional parameter of `wildCardName` that's the name of wildCard that will considered as JOKER if needed.

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'
  const rummyConfig = Rummy.makeRummyConfig(true, true, true, true, true, 9)
  const rummyGame = new Rummy(rummyConfig)
  let cards = [
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.SPADES_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
  ]
  //logs RummyDeclareCheck object as true
  console.log(rummyGame.isInSet(cards))
  ```

  - `isReadyToDeclare`: decide if given meld is ready to declare. it just check in all the groups from meld and if it satisfied the requirement with the configured rules then is returns `RummyDeclareCheck` object as true, otherwise it returns false.
  - if takes `meld` as the first parameter and a `WildCard` as second parameter. this `WildCard` is to make a `SET` or `SEQUENCE` with that wild-card
  - it returns the `RummyDeclareCheck` indicating that is this meld ready for declaring or not, thus deciding this is a winner or not.
  - the logic is based on the other 3 functions explained above.

  ```javascript
  import { Rummy, StandardCardHelper, StandardCardName } from 'card-games-utils'

  const rummyConfig = Rummy.makeRummyConfig(true, true, true, true, true, 9)
  const rummyGame = new Rummy(rummyConfig)

  const meld = rummyGame.makeMeld(
    [
      // SET
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
      // SEQUENCE
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_THREE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_SEVEN),
      // PURE SEQUENCE
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

  //logs RummyDeclareCheck object as true.
  console.log(rummyGame.isReadyToDeclare(meld, StandardCardName.DIAMONDS_THREE))
  ```
