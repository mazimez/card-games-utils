/**
 * Defines the rules for particular Rummy game.
 * @interface RummyDeclareCheck
 */
export interface RummyDeclareCheck {
  /**
   * boolean to indicate that given cards are valid or not
   *
   * @type {boolean}
   */
  isValid: boolean

  /**
   * points calculated from given cards
   *
   * @type {number}
   */
  points?: number

  /**
   * error message if there is any
   *
   * @type {string}
   */
  error?: string
}
