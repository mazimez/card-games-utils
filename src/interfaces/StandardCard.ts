import {
  type StandardCardColor,
  type StandardCardName,
  type StandardCardRank,
  type StandardCardSuite,
} from '../constants/StandardDeckEnum'

/**
 * Represents a standard playing card.
 * @interface StandardCard
 */
export interface StandardCard {
  /**
   * The name of the card, e.g. "CLUBS_ACE".
   *
   * @type {keyof typeof StandardCardName}
   */
  name: keyof typeof StandardCardName
  /**
   * The color of the card, either "RED" or "BLACK".
   *
   * @type {keyof typeof StandardCardColor}
   */
  color: keyof typeof StandardCardColor
  /**
   * The rank of the card, e.g. "ACE".
   *
   * @type {keyof typeof StandardCardRank}
   */
  rank: keyof typeof StandardCardRank
  /**
   * The suite of the card, e.g. "CLUBS".
   *
   * @type {keyof typeof StandardCardSuite}
   */
  suite: keyof typeof StandardCardSuite
  /**
   *  The number assigned to the card, it will be between 1-13(can go to 14 while calculating ACE
   *
   * @type {number}
   */
  number: number
}
