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
