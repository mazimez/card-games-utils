import { type StandardCardName } from '../constants/StandardDeckEnum'
import { StandardDeck } from '../data/StandardDeck'
import { type StandardCard } from '../interfaces/StandardCard'

/**
 * Class for helper methods related to Standard card.
 * @class
 */
export class StandardCardHelper {
  /**
   * @method
   * @static
   * generate the StandardCard interface instance based on the card name given
   *
   * @param {keyof typeof StandardCardName} cardName name of card
   * @returns {StandardCard} - instance of StandardCard interface based on given cardName
   */
  static makeStandardCard(cardName: keyof typeof StandardCardName): StandardCard {
    const card: StandardCard = {
      name: cardName,
      color: StandardDeck.getColor(cardName),
      number: StandardDeck.getNumber(cardName),
      rank: StandardDeck.getRank(cardName),
      suite: StandardDeck.getSuite(cardName),
    }
    return card
  }

  /**
   * @method
   * @static
   * sort the given Array of Card in ascending order of it's number
   *
   * @param {StandardCard[]} cards - the array of cards to be sorted
   * @returns {StandardCard[]} - the sorted array of cards
   */
  static sortCards(cards: StandardCard[]): StandardCard[] {
    const tempCards = [...cards]
    return tempCards.sort((currentCard, nextCard) => currentCard.number - nextCard.number)
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
    return cards.some((card, index) => {
      return cards.some((otherCard, otherIndex) => {
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

  /**
   * @method
   * @static
   * decide if the given array has the card of given NUMBER in other parameter
   *
   * @param {StandardCard[]} cards the array of cards to be checked
   * @param {number} cardNumberToFind the number that's card needs to be found
   * @returns {number} the index of the card in array, -1 if it doesn't exist
   */
  static isNumberInDeck(cards: StandardCard[], cardNumberToFind: number): number {
    return cards.findIndex((card) => card.number === cardNumberToFind)
  }

  /**
   * @method
   * @static
   * returns the count of particular card from the given cards
   *
   * @param {StandardCard[]} cards the array of cards to be checked
   * @param {StandardCardName} cardToFind the StandardCardName that needs to be found
   * @returns {number} the count indicating how many times does that card appear in the given cards(0 if it doesn't exist)
   */
  static getCountFromDeck(
    cards: StandardCard[],
    cardToFind: keyof typeof StandardCardName
  ): number {
    return cards.reduce((count, card) => {
      if (card.name === cardToFind) {
        return count + 1
      }
      return count
    }, 0)
  }

  /**
   * @method
   * @static
   * checks if the given cards has any duplicate cards or not
   *
   * @param {StandardCard[]} cards the array of cards to be checked
   * @param {StandardCardName} cardToFind the StandardCardName that needs to be found
   * @param {StandardCard[]} cardsToIgnore array of cards that should be ignored
   * @returns {boolean} indicate that is card has duplicate card or not.
   */
  static hasDuplicates(cards: StandardCard[], cardsToIgnore: StandardCard[] = []): boolean {
    return cards.some((card, index) => {
      return cards.some((otherCard, otherIndex) => {
        if (cardsToIgnore.some((obj) => obj.name === otherCard.name)) {
          return false
        } else {
          return index !== otherIndex && card.name === otherCard.name
        }
      })
    })
  }
}
