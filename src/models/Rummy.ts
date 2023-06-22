import { StandardCardSuite } from '../constants/StandardDeckEnum'
import { type Meld } from '../interfaces/Meld'
import { type StandardCard } from '../interfaces/StandardCard'

/**
 * Class to handle operations of Rummy game
 * @class
 */
export class Rummy {
  /**
   * @method
   * @static
   * convert given array cards and groups into Meld interface
   *
   * @param {Meld} meld - generated meld
   */
  static makeMeld(
    cards: [
      StandardCard,
      StandardCard,
      StandardCard,
      StandardCard,
      StandardCard,
      StandardCard,
      StandardCard,
      StandardCard,
      StandardCard,
      StandardCard,
      StandardCard,
      StandardCard,
      StandardCard
    ],
    groups?: number[][]
  ): Meld {
    const meld: Meld = {
      cards,
      groups: groups ?? [],
    }
    return meld
  }

  /**
   * @method
   * @static
   * get the groups of card from the given Meld
   *
   * @param {Meld} meld - the meld who's groups should be returned
   */
  static getCardGroup(meld: Meld): StandardCard[][] {
    const cardGroups: StandardCard[][] = new Array(meld.groups.length).fill(null).map(() => [])
    meld.groups.forEach((group, index) => {
      group.forEach((cardIndex) => {
        cardGroups[index].push(meld.cards[cardIndex])
      })
    })
    return cardGroups
  }

  /**
   * @method
   * @static
   * sort the cards in meld and divide card into 4 groups with game suites
   *
   * @param {Meld} meld - the meld who's groups should be returned
   */
  static sortMeld(meld: Meld): Meld {
    meld.groups = new Array(5).fill(null).map(() => [])

    meld.cards.forEach((card, index) => {
      switch (card.suite) {
        case StandardCardSuite.CLUBS:
          meld.groups[0].push(index)
          break
        case StandardCardSuite.DIAMONDS:
          meld.groups[1].push(index)
          break
        case StandardCardSuite.HEARTS:
          meld.groups[2].push(index)
          break
        case StandardCardSuite.SPADES:
          meld.groups[3].push(index)
          break
        case StandardCardSuite.JOKER:
          meld.groups[4].push(index)
          break
        default:
          break
      }
    })

    meld.groups.forEach((group) => {
      group.sort(
        (currentCardIndex, nextCardIndex) =>
          meld.cards[currentCardIndex].number - meld.cards[nextCardIndex].number
      )
    })

    return meld
  }

  // TODO::add a method to check is meld has all required cards to declare
  // /**
  //  * @method
  //  * @static
  //  * decides if the given meld is ready to be declared
  //  *
  //  * @param {Meld} meld - the meld who is about to be declared
  //  * @param {StandardCard} [jokerCard] - optional joker card.
  //  */
  // static isReadyToDeclare(meld: Meld, jokerCard?: StandardCard): boolean {
  //   return true
  // }
}
