import { type StandardCard } from './StandardCard'

/**
 * Represents a Meld in Rummy with 13 cards and information about it's different group(Set, Run etc.)
 * @interface Meld
 */
export interface Meld {
  /**
   * An array of cards that can make up the player's Meld.
   *
   * @type {StandardCard[]}
   */
  cards: StandardCard[]

  /**
   * array of arrays of indexes from cards array from meld that can have different combination like SET or sequence
   *
   * @type {number[][]}
   */
  groups: number[][]
}
