import { ErrorEnum } from '../constants/ErrorEnum'
import { StandardCardName, StandardCardSuite } from '../constants/StandardDeckEnum'
import { StandardDeck } from '../data/StandardDeck'
import { StandardCardHelper } from '../helpers/StandardCardHelper'
import { type Meld } from '../interfaces/Meld'
import { type RummyConfig } from '../interfaces/RummyConfig'
import { type RummyDeclareCheck } from '../interfaces/RummyDeclareCheck'
import { type StandardCard } from '../interfaces/StandardCard'

/**
 * Class to handle operations of Rummy game
 * @class
 */
export class Rummy {
  private readonly config: RummyConfig

  /**
   * Constructs a new instance of Rummy.
   * @param {RummyConfig} config the config for the rules of game.
   */
  constructor(config: RummyConfig) {
    this.config = config
  }

  /**
   * @method
   * @static
   * make the config for Rummy game
   *
   * @param {boolean} [isSetRequired = true] - is SET of card-group required for meld to be ready to declare?
   * @param {boolean} [isSequenceRequired = true] - is SEQUENCE of card-group required for meld to be ready to declare?
   * @param {boolean} [isPureSequenceRequired = true] - is PURE-SEQUENCE of card-group required for meld to be ready to declare?
   * @param {boolean} [isJokerAllowed = true] - is joker card allowed in meld or not
   * @param {boolean} [isWildAllowed = true] - is wild card allowed in meld or not
   * @param {boolean} [isDuplicateCardsAllowed = true] - is duplicate cards allowed in 1 meld(wild cards will be ignored)?
   * @param {number} [numCardsPerMeld = 13] - how many cards should there be in 1 meld
   * @param {number} [numFlexCardPerMeld = 3] - how many flexible cards(JOKER + WILD) should there be in 1 meld
   * @param {number} [numFlexCardPerGroup = 1] - how many flexible cards(JOKER + WILD) should there be in 1 group(SET, SEQUENCE, PURE-SEQUENCE)
   * @returns {RummyConfig} - instance of RummyConfig interface based on given data
   */
  static makeRummyConfig(
    isSetRequired: boolean = true,
    isSequenceRequired: boolean = true,
    isPureSequenceRequired: boolean = true,
    isJokerAllowed: boolean = true,
    isWildAllowed: boolean = true,
    numCardsPerMeld: number = 13
  ): RummyConfig {
    if (!isSetRequired && !isSequenceRequired && !isPureSequenceRequired) {
      throw new Error(ErrorEnum.AT_LEAST_ONE_RULE_IS_REQUIRED)
    }

    const config: RummyConfig = {
      isSetRequired,
      isSequenceRequired,
      isPureSequenceRequired,
      isJokerAllowed,
      isWildAllowed,
      numCardsPerMeld,
    }
    return config
  }

  /**
   * @method
   * verify the given meld with the config of the game.
   *
   *
   * @param {meld} meld meld to verify
   * @returns {boolean} return true if meld is correct
   * @throws {Error} throws error if there is something wrong with meld
   */
  public verifyMeld(meld: Meld): boolean {
    if (this.config.numCardsPerMeld !== meld.cards.length) {
      throw new Error(`numbers of cards in 1 meld must be ${this.config.numCardsPerMeld}`)
    }

    if (!this.config.isJokerAllowed) {
      if (StandardCardHelper.isInDeck(meld.cards, StandardCardName.JOKER) !== -1) {
        throw new Error(ErrorEnum.JOKER_NOT_ALLOWED)
      }
    }

    return true
  }

  /**
   * @method
   * convert given array cards and groups into Meld interface
   *
   * @param {StandardCard[]} cards - array of cards
   * @param {number[][]} groups - mutlidimenal array of numbers that make different groups in meld
   * @returns {Meld} - returns the generated meld
   */
  public makeMeld(cards: StandardCard[], groups?: number[][]): Meld {
    const meld: Meld = {
      cards,
      groups: groups ?? [],
    }
    this.verifyMeld(meld)
    return meld
  }

  /**
   * @method
   * get the groups of card from the given Meld
   *
   * @param {Meld} meld - the meld who's groups should be returned
   * @throws {Error} - if groups has any index that doesn't have card in it.
   */
  public getCardGroup(meld: Meld): StandardCard[][] {
    this.verifyMeld(meld)
    const cardGroups: StandardCard[][] = new Array(meld.groups.length).fill(null).map(() => [])
    meld.groups.forEach((group, index) => {
      group.forEach((cardIndex) => {
        if (meld.cards[cardIndex] === undefined) {
          throw new Error(`No card exist on ${cardIndex} index`)
        }
        cardGroups[index].push(meld.cards[cardIndex])
      })
    })
    return cardGroups
  }

  /**
   * @method
   * sort the cards in meld and divide card into 4 groups with game suites, and 1 for joker(if any)
   *
   * @param {Meld} meld - the meld who's groups should be returned
   */
  public sortMeld(meld: Meld): Meld {
    this.verifyMeld(meld)
    meld.groups = new Array(5).fill(null).map(() => [])

    meld.cards.forEach((card, index) => {
      switch (card.suite) {
        case StandardCardSuite.CLUBS:
          meld.groups[0].push(index)
          break
        case StandardCardSuite.DIAMONDS:
          meld.groups[1].push(index)
          break
        case StandardCardSuite.HEARTS:
          meld.groups[2].push(index)
          break
        case StandardCardSuite.SPADES:
          meld.groups[3].push(index)
          break
        case StandardCardSuite.JOKER:
          meld.groups[4].push(index)
          break
        default:
          break
      }
    })

    meld.groups.forEach((group) => {
      group.sort(
        (currentCardIndex, nextCardIndex) =>
          meld.cards[currentCardIndex].number - meld.cards[nextCardIndex].number
      )
    })

    return meld
  }

  /**
   * @method
   * @static
   * calculate the points for given array cards(joker wont be counted)
   *
   * @param {StandardCard[]} cards - the cards which's points are going to be calculated
   * @param {keyof typeof StandardCardName} [cardNameToIgnore] - the card that should be ignored(wildcard)
   * @returns {number} - total points for the given cards
   */
  static calculatePoints(
    cards: StandardCard[],
    cardNameToIgnore?: keyof typeof StandardCardName | undefined
  ): number {
    let points = 0
    cards.forEach((card) => {
      if (card.number === -1) {
        return
      }
      if (cardNameToIgnore !== undefined && card.name === cardNameToIgnore) {
        return
      }
      if (card.number >= 10) {
        points = points + 10
      } else {
        points = points + card.number
      }
    })
    return points
  }

  /**
   * @method
   * decides if the given meld is ready to be declared
   *
   * @param {Meld} meld - the meld who is about to be declared
   * @param {keyof typeof StandardCardName} [wildCardName] - optional wild card.
   * @returns {RummyDeclareCheck} - returns an instance of RummyDeclareCheck with proper value.
   */
  public isReadyToDeclare(
    meld: Meld,
    wildCardName?: keyof typeof StandardCardName | undefined
  ): RummyDeclareCheck {
    try {
      this.verifyMeld(meld)
    } catch (error) {
      if (error instanceof Error) {
        return {
          isValid: false,
          error: error.message,
          points: Rummy.calculatePoints(meld.cards, wildCardName),
        }
      } else {
        return {
          isValid: false,
          error: ErrorEnum.INVALID_DATA,
          points: Rummy.calculatePoints(meld.cards, wildCardName),
        }
      }
    }

    if (!this.config.isJokerAllowed) {
      if (StandardCardHelper.isInDeck(meld.cards, StandardCardName.JOKER) !== -1) {
        return {
          isValid: false,
          error: ErrorEnum.JOKER_NOT_ALLOWED,
          points: Rummy.calculatePoints(meld.cards, wildCardName),
        }
      }
    }
    if (!this.config.isWildAllowed) {
      if (wildCardName !== undefined) {
        return {
          isValid: false,
          error: ErrorEnum.WILD_NOT_ALLOWED,
          points: Rummy.calculatePoints(meld.cards, wildCardName),
        }
      }
    }

    const cardGroups = this.getCardGroup(meld)
    const usedIndexes: number[] = []
    let points = 0

    let isReadyToDeclare = true
    let errorMessage
    if (this.config.isSetRequired && isReadyToDeclare) {
      let isInSet = false
      cardGroups.forEach((cards, index) => {
        if (usedIndexes.includes(index)) {
          return
        }
        let temp
        if (wildCardName === undefined) {
          temp = this.isInSet(cards)
        } else {
          temp = this.isInSet(cards, wildCardName)
        }
        if (temp.isValid) {
          usedIndexes.push(index)
          isInSet = true
        }
      })
      if (!isInSet && isReadyToDeclare) {
        isReadyToDeclare = false
        errorMessage = ErrorEnum.SET_REQUIRED
      }
    }

    if (this.config.isPureSequenceRequired && isReadyToDeclare) {
      let isInPureSequence = false
      cardGroups.forEach((cards, index) => {
        if (usedIndexes.includes(index)) {
          return
        }
        if (!isInPureSequence) {
          if (this.isInPureSequence(cards).isValid) {
            usedIndexes.push(index)
            isInPureSequence = true
          }
        }
      })
      if (!isInPureSequence && isReadyToDeclare) {
        isReadyToDeclare = false
        errorMessage = ErrorEnum.PURE_SEQUENCE_REQUIRED
      }
    }

    if (this.config.isSequenceRequired && isReadyToDeclare) {
      let isInSequence = false
      cardGroups.forEach((cards, index) => {
        if (usedIndexes.includes(index)) {
          return
        }

        let temp
        if (wildCardName === undefined) {
          temp = this.isInSequence(cards)
        } else {
          temp = this.isInSequence(cards, wildCardName)
        }
        if (temp.isValid) {
          usedIndexes.push(index)
          isInSequence = true
        }
      })
      if (!isInSequence && isReadyToDeclare) {
        isReadyToDeclare = false
        errorMessage = ErrorEnum.SEQUENCE_REQUIRED
      }
    }
    if (this.config.isPureSequenceRequired && isReadyToDeclare) {
      cardGroups.forEach((cards, index) => {
        if (usedIndexes.includes(index)) {
          return
        }
        if (this.isInPureSequence(cards).isValid) {
          usedIndexes.push(index)
        }
      })
    }
    cardGroups.forEach((cards, index) => {
      if (usedIndexes.includes(index)) {
        return
      }
      points = points + Rummy.calculatePoints(cards, wildCardName)
    })

    if (!isReadyToDeclare) {
      return {
        isValid: false,
        error: errorMessage,
        points,
      }
    } else {
      return {
        isValid: true,
        points,
      }
    }
  }

  /**
   * @method
   * decides if the given array of cards are in sequence or not
   *
   * @param {StandardCard[]} cards - array of cards that needs be checked
   * @param {keyof typeof StandardCardName} [wildCardName] - optional wild card.
   * @returns {RummyDeclareCheck} - returns an instance of RummyDeclareCheck with proper value.
   */
  public isInSequence(
    cards: StandardCard[],
    wildCardName?: keyof typeof StandardCardName | undefined
  ): RummyDeclareCheck {
    if (cards.length < 3) {
      return {
        isValid: false,
        error: ErrorEnum.AT_LEAST_THREE_CARDS_NEEDED_FOR_SEQUENCE,
      }
    }

    if (!this.config.isJokerAllowed) {
      if (StandardCardHelper.isInDeck(cards, StandardCardName.JOKER) !== -1) {
        return {
          isValid: false,
          error: ErrorEnum.JOKER_NOT_ALLOWED,
        }
      }
    }

    if (!this.config.isWildAllowed) {
      if (wildCardName !== undefined) {
        return {
          isValid: false,
          error: ErrorEnum.WILD_NOT_ALLOWED,
        }
      }
    }

    let tempCards = [...cards]
    let sequenceNumber
    let suite
    let isInSequence = true
    let isAllCardCheck = false
    let jokerCardCount = 0
    let wildCardCount = 0

    while (StandardCardHelper.isInDeck(tempCards, StandardCardName.JOKER) !== -1) {
      tempCards.splice(StandardCardHelper.isInDeck(tempCards, StandardCardName.JOKER), 1)
      jokerCardCount++
    }
    if (wildCardName !== undefined) {
      while (
        StandardCardHelper.isNumberInDeck(
          tempCards,
          StandardCardHelper.makeStandardCard(wildCardName).number
        ) !== -1
      ) {
        tempCards.splice(
          StandardCardHelper.isNumberInDeck(
            tempCards,
            StandardCardHelper.makeStandardCard(wildCardName).number
          ),
          1
        )
        wildCardCount++
      }
    }

    let shouldSkipOnce = false
    if (StandardCardHelper.isNumberInDeck(cards, 1) !== -1) {
      if (StandardCardHelper.isNumberInDeck(cards, 13) !== -1) {
        shouldSkipOnce = true
      }
    }
    tempCards = StandardCardHelper.sortCards(tempCards)

    if (tempCards.length < 2) {
      return {
        isValid: false,
        error: ErrorEnum.AT_LEAST_TWO_NORMAL_CARDS_NEEDED_FOR_SEQUENCE,
      }
    }

    if (tempCards.length === 2) {
      if (tempCards[0].suite === tempCards[1].suite) {
        if (tempCards[0].number + 1 === tempCards[1].number) {
          return {
            isValid: true,
            points: 0,
          }
        } else {
          if (tempCards[1].number - tempCards[0].number - 1 <= jokerCardCount + wildCardCount) {
            return {
              isValid: true,
              points: 0,
            }
          } else {
            if (tempCards[1].number !== tempCards[0].number) {
              if (
                (tempCards[1].number === 1 && tempCards[0].number === 13) ||
                (tempCards[0].number === 1 && tempCards[1].number === 13)
              ) {
                return {
                  isValid: true,
                  points: 0,
                }
              }
            }

            return {
              isValid: false,
              error: ErrorEnum.NOT_VALID_SEQUENCE,
            }
          }
        }
      } else {
        return {
          isValid: false,
          error: ErrorEnum.NOT_VALID_SEQUENCE,
        }
      }
    }

    let index = 0
    while (isInSequence && !isAllCardCheck) {
      if (sequenceNumber === undefined || suite === undefined) {
        sequenceNumber = tempCards[index].number
        suite = tempCards[index].suite
      } else {
        if (tempCards[index].number === sequenceNumber + 1 && tempCards[index].suite === suite) {
          sequenceNumber = tempCards[index].number
        } else if (Math.abs(sequenceNumber - tempCards[index].number) > 1 && shouldSkipOnce) {
          shouldSkipOnce = false
          sequenceNumber = tempCards[index].number
        } else if (
          wildCardName !== undefined &&
          wildCardCount > 0 &&
          StandardDeck.getNumber(wildCardName) === sequenceNumber + 1
          // &&
          // StandardDeck.getSuite(wildCardName) === suite
        ) {
          wildCardCount--
          sequenceNumber++
        } else if (jokerCardCount > 0) {
          jokerCardCount--
          sequenceNumber++
        } else if (wildCardCount > 0) {
          wildCardCount--
          sequenceNumber++
        } else {
          isInSequence = false
        }
      }
      if (tempCards.length - 1 <= index) {
        isAllCardCheck = true
      }
      index++
    }

    if (isInSequence) {
      return {
        isValid: true,
        points: 0,
      }
    } else {
      return {
        isValid: false,
        error: ErrorEnum.NOT_VALID_SEQUENCE,
      }
    }
  }

  /**
   * @method
   * decides if the given array of cards are in sets or not
   *
   * @param {StandardCard[]} cards - array of cards that needs be checked
   * @param {keyof typeof StandardCardName} [wildCardName] - optional wild card.
   * @returns {RummyDeclareCheck} - returns an instance of RummyDeclareCheck with proper value.
   */
  public isInSet(
    cards: StandardCard[],
    wildCardName?: keyof typeof StandardCardName | undefined
  ): RummyDeclareCheck {
    if (cards.length < 3) {
      return {
        isValid: false,
        error: ErrorEnum.AT_LEAST_THREE_CARDS_NEEDED_FOR_SET,
      }
    }
    if (cards.length > 4) {
      return {
        isValid: false,
        error: ErrorEnum.MAX_FOUR_CARDS_ALLOWED_FOR_SET,
      }
    }

    if (!this.config.isJokerAllowed) {
      if (StandardCardHelper.isInDeck(cards, StandardCardName.JOKER) !== -1) {
        return {
          isValid: false,
          error: ErrorEnum.JOKER_NOT_ALLOWED,
        }
      }
    }

    if (!this.config.isWildAllowed) {
      if (wildCardName !== undefined) {
        return {
          isValid: false,
          error: ErrorEnum.WILD_NOT_ALLOWED,
        }
      }
    }

    if (StandardCardHelper.hasSameNumber(cards) && !StandardCardHelper.hasPairSuite(cards)) {
      return {
        isValid: true,
        points: 0,
      }
    }
    const tempCards = [...cards]
    while (StandardCardHelper.isInDeck(tempCards, StandardCardName.JOKER) !== -1) {
      tempCards.splice(StandardCardHelper.isInDeck(tempCards, StandardCardName.JOKER), 1)
    }
    if (wildCardName !== undefined) {
      while (
        StandardCardHelper.isNumberInDeck(
          tempCards,
          StandardCardHelper.makeStandardCard(wildCardName).number
        ) !== -1
      ) {
        tempCards.splice(
          StandardCardHelper.isNumberInDeck(
            tempCards,
            StandardCardHelper.makeStandardCard(wildCardName).number
          ),
          1
        )
      }
    }

    if (tempCards.length <= 0) {
      return {
        isValid: false,
        error: ErrorEnum.AT_LEAST_ONE_NORMAL_CARD_NEEDED_FOR_SET,
      }
    }

    if (
      StandardCardHelper.hasSameNumber(tempCards) &&
      !StandardCardHelper.hasPairSuite(tempCards)
    ) {
      return {
        isValid: true,
        points: 0,
      }
    }

    return {
      isValid: false,
      error: ErrorEnum.NOT_VALID_SET,
    }
  }

  /**
   * @method
   * decides if the given array of cards are in pure sequence or not
   *
   * @param {StandardCard[]} cards - array of cards that needs be checked
   * @returns {RummyDeclareCheck} - returns an instance of RummyDeclareCheck with proper value.
   */
  public isInPureSequence(cards: StandardCard[]): RummyDeclareCheck {
    if (cards.length < 3) {
      return {
        isValid: false,
        error: ErrorEnum.AT_LEAST_THREE_CARDS_NEEDED_FOR_PURE_SEQUENCE,
      }
    }
    if (StandardCardHelper.isInDeck(cards, StandardCardName.JOKER) !== -1) {
      return {
        isValid: false,
        error: ErrorEnum.JOKER_NOT_ALLOWED_IN_PURE_SEQUENCE,
      }
    }
    if (!StandardCardHelper.hasSameSuite(cards)) {
      return {
        isValid: false,
        error: ErrorEnum.SAME_SUITE_NEEDED_FOR_PURE_SEQUENCE,
      }
    }
    let tempCards = [...cards]

    let shouldSkipOnce = false
    if (StandardCardHelper.isNumberInDeck(cards, 1) !== -1) {
      if (StandardCardHelper.isNumberInDeck(cards, 13) !== -1) {
        shouldSkipOnce = true
      }
    }
    tempCards = StandardCardHelper.sortCards(tempCards)
    let isInSequence = true
    let isAllCardCheck = false
    let sequenceNumber
    let index = 0
    while (isInSequence && !isAllCardCheck) {
      if (sequenceNumber === undefined) {
        sequenceNumber = tempCards[index].number
      } else {
        if (tempCards[index].number === sequenceNumber + 1) {
          sequenceNumber = tempCards[index].number
        } else if (shouldSkipOnce) {
          shouldSkipOnce = false
          sequenceNumber = tempCards[index].number
        } else {
          isInSequence = false
        }
      }
      if (tempCards.length - 1 === index) {
        isAllCardCheck = true
      }
      index++
    }
    if (isInSequence) {
      return {
        isValid: true,
        points: 0,
      }
    } else {
      return {
        isValid: false,
        error: ErrorEnum.NOT_VALID_PURE_SEQUENCE,
      }
    }
  }
}
