import { type TeenPattiHand } from '../constants/TeenPattiEnum'
import { type StandardCard } from './StandardCard'

/**
 * Represents a Hand in teen patti with combination of 3 standard playing cards
 * @interface Hand
 */
export interface Hand {
  /**
   * An array of three cards that make up the player's hand.
   *
   * @type {[StandardCard, StandardCard, StandardCard]}
   */
  cards: [StandardCard, StandardCard, StandardCard]
  /**
   * The type of hand the player has, such as "Trail", "pair", or "High".
   *
   * @type {keyof typeof TeenPattiHand}
   */
  hand: keyof typeof TeenPattiHand
}
