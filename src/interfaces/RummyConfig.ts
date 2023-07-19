/**
 * Defines the rules for particular Rummy game.
 * @interface RummyConfig
 */
export interface RummyConfig {
  /**
   * is SET of card-group required for meld to be ready to declare?
   *
   * @type {boolean}
   */
  isSetRequired: boolean

  /**
   * is SEQUENCE of card-group required for meld to be ready to declare?
   *
   * @type {boolean}
   */
  isSequenceRequired: boolean

  /**
   * is PURE-SEQUENCE of card-group required for meld to be ready to declare?
   *
   * @type {boolean}
   */
  isPureSequenceRequired: boolean

  /**
   * is joker card allowed in meld or not
   *
   * @type {boolean}
   */
  isJokerAllowed: boolean

  /**
   * is wild card allowed in meld or not
   *
   * @type {boolean}
   */
  isWildAllowed: boolean
  /**
   * how many cards should there be in 1 meld
   *
   * @type {number}
   */
  numCardsPerMeld: number
}
