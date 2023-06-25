import { type StandardCardName } from '../constants/StandardDeckEnum'
import { type StandardCard } from '../interfaces/StandardCard'

/**
 * Class for helper methods related to Standard card.
 * @class
 */
export class StandardCardHelper {
  /**
   * @method
   * @static
   * sort the given Array of Card in ascending order of it's number
   *
   * @param {StandardCard[]} cards - the array of cards to be sorted
   * @returns {StandardCard[]} - the sorted array of cards
   */
  static sortCards(cards: StandardCard[]): StandardCard[] {
    return cards.sort((currentCard, nextCard) => currentCard.number - nextCard.number)
  }

  /**
   * @method
   * @static
   * decide if all the cards has same suite or not
   *
   * @param {StandardCard[]} cards - the array of cards to be checked
   * @returns {boolean} - the boolean indicating that cards has same suite or not
   */
  static hasSameSuite(cards: StandardCard[]): boolean {
    return cards.every((card) => {
      return cards.every((otherCard) => {
        return card.suite === otherCard.suite
      })
    })
  }

  /**
   * @method
   * @static
   * decide if there is any pair in the given cards that has same suite or not
   *
   * @param {StandardCard[]} cards - the array of cards to be checked
   * @returns {boolean} - the boolean indicating that cards has pair of same suite or not
   */
  static hasPairSuite(cards: StandardCard[]): boolean {
    return cards.some((card, index) => {
      return cards.some((otherCard, otherIndex) => {
        return index !== otherIndex && card.suite === otherCard.suite
      })
    })
  }

  /**
   * @method
   * @static
   * decide if all the cards has same number or not
   *
   * @param {StandardCard[]} cards the array of cards to be checked
   * @returns {boolean} the boolean indicating that cards has same number or not
   */
  static hasSameNumber(cards: StandardCard[]): boolean {
    return cards.every((card) => {
      return cards.every((otherCard) => {
        return card.number === otherCard.number
      })
    })
  }

  /**
   * @method
   * @static
   * decide if there is any pair in the given cards that has same number or not
   *
   * @param {StandardCard[]} cards the array of cards to be checked
   * @returns {boolean} the boolean indicating that cards has pair of same number or not
   */
  static hasPairNumber(cards: StandardCard[]): boolean {
    return cards.every((card, index) => {
      return cards.every((otherCard, otherIndex) => {
        return index !== otherIndex && card.number === otherCard.number
      })
    })
  }

  /**
   * @method
   * @static
   * decide if the given array has the card given in other parameter
   *
   * @param {StandardCard[]} cards the array of cards to be checked
   * @param {StandardCardName} cardToFind the StandardCardName that needs to be found
   * @returns {number} the index of the card in array, -1 if it doesn't exist
   */
  static isInDeck(cards: StandardCard[], cardToFind: keyof typeof StandardCardName): number {
    return cards.findIndex((card) => card.name === cardToFind)
  }
}
