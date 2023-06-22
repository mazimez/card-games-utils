import {
  StandardCardColor,
  StandardCardName,
  StandardCardRank,
  StandardCardSuite,
} from '../constants/StandardDeckEnum'
import { type StandardCard } from '../interfaces/StandardCard'
/**
 * Class for Standard Deck of Standard Playing cards
 * @class
 */
export class StandardDeck {
  /**
   * @method
   *  get an Array of standard playing cards
   *
   * @static
   *
   * @param {boolean} withJoker - boolean to decide should the deck include Joker card or not
   * @returns {StandardCard[]} The array of standard playing cards.
   */
  static getStandardDeck(withJoker: boolean = false): StandardCard[] {
    const cards: StandardCard[] = []
    for (const card of Object.keys(StandardCardName)) {
      if (card === StandardCardName.JOKER) {
        if (!withJoker) {
          continue
        }
      }
      cards.push({
        name: card as keyof typeof StandardCardName,
        color: this.getColor(card as keyof typeof StandardCardName),
        rank: this.getRank(card as keyof typeof StandardCardName),
        number: this.getNumber(card as keyof typeof StandardCardName),
        suite: this.getSuite(card as keyof typeof StandardCardName),
      })
    }
    return cards
  }

  /**
   * @method
   * @static
   * Returns the suite of a given card.
   *
   * @param {StandardCardName} card - The name of the card whose suite is being retrieved.
   * @returns {StandardCardSuite} The suite of the card.
   * @throws {Error} - when suite not found
   */
  static getSuite(card: keyof typeof StandardCardName): keyof typeof StandardCardSuite {
    switch (card.split('_')[0]) {
      case StandardCardSuite.CLUBS:
        return StandardCardSuite.CLUBS
      case StandardCardSuite.DIAMONDS:
        return StandardCardSuite.DIAMONDS
      case StandardCardSuite.HEARTS:
        return StandardCardSuite.HEARTS
      case StandardCardSuite.SPADES:
        return StandardCardSuite.SPADES
      case StandardCardSuite.JOKER:
        return StandardCardSuite.JOKER
      default:
        throw new Error('Suite not found')
    }
  }

  /**
   * @method
   * @static
   * Returns the color of a given card.
   *
   * @param {StandardCardName} card - The name of the card whose color is being retrieved.
   * @returns {StandardCardColor} The color of the card.
   * @throws {Error} - when color not found
   */
  static getColor(card: keyof typeof StandardCardName): keyof typeof StandardCardColor {
    switch (card.split('_')[0]) {
      case StandardCardSuite.CLUBS:
        return StandardCardColor.BLACK
      case StandardCardSuite.DIAMONDS:
        return StandardCardColor.RED
      case StandardCardSuite.HEARTS:
        return StandardCardColor.RED
      case StandardCardSuite.SPADES:
        return StandardCardColor.BLACK
      case StandardCardSuite.JOKER:
        return StandardCardColor.JOKER
      default:
        throw new Error('Color not found')
    }
  }

  /**
   * @method
   * @static
   * Returns the rank of a given card.
   *
   * @param {StandardCardName} card - The name of the card whose rank is being retrieved.
   * @returns {StandardCardRank} The rank of the card.
   * @throws {Error} - when rank not found
   */
  static getRank(card: keyof typeof StandardCardName): keyof typeof StandardCardRank {
    if (card.split('_').length === 1) {
      if (card.split('_')[0] === StandardCardName.JOKER) {
        return StandardCardName.JOKER
      }
    }
    switch (card.split('_')[1]) {
      case StandardCardRank.ACE:
        return StandardCardRank.ACE
      case StandardCardRank.TWO:
        return StandardCardRank.TWO
      case StandardCardRank.THREE:
        return StandardCardRank.THREE
      case StandardCardRank.FOUR:
        return StandardCardRank.FOUR
      case StandardCardRank.FIVE:
        return StandardCardRank.FIVE
      case StandardCardRank.SIX:
        return StandardCardRank.SIX
      case StandardCardRank.SEVEN:
        return StandardCardRank.SEVEN
      case StandardCardRank.EIGHT:
        return StandardCardRank.EIGHT
      case StandardCardRank.NINE:
        return StandardCardRank.NINE
      case StandardCardRank.TEN:
        return StandardCardRank.TEN
      case StandardCardRank.JACK:
        return StandardCardRank.JACK
      case StandardCardRank.QUEEN:
        return StandardCardRank.QUEEN
      case StandardCardRank.KING:
        return StandardCardRank.KING

      default:
        throw new Error('Rank not found')
    }
  }

  /**
   * @method
   * @static
   * Returns the number of a given card.
   *
   * @param {StandardCardName} card - The name of the card whose number is being retrieved.
   * @returns {number} The number of the card.
   * @throws {Error} - when number not found
   */
  static getNumber(card: keyof typeof StandardCardName): number {
    if (card.split('_').length === 1) {
      if (card.split('_')[0] === StandardCardName.JOKER) {
        return -1
      }
    }
    switch (card.split('_')[1]) {
      case StandardCardRank.ACE:
        return 1
      case StandardCardRank.TWO:
        return 2
      case StandardCardRank.THREE:
        return 3
      case StandardCardRank.FOUR:
        return 4
      case StandardCardRank.FIVE:
        return 5
      case StandardCardRank.SIX:
        return 6
      case StandardCardRank.SEVEN:
        return 7
      case StandardCardRank.EIGHT:
        return 8
      case StandardCardRank.NINE:
        return 9
      case StandardCardRank.TEN:
        return 10
      case StandardCardRank.JACK:
        return 11
      case StandardCardRank.QUEEN:
        return 12
      case StandardCardRank.KING:
        return 13

      default:
        throw new Error('Number not found')
    }
  }
}
