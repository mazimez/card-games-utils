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
   * number of wildcards that are actually used.
   *
   * @type {number}
   */
  numOfFlexCardUsed?: number

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
