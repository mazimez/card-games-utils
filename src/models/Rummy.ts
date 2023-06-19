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
}
