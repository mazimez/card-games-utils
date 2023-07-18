import { StandardCardName, StandardCardSuite } from '../constants/StandardDeckEnum'
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
    numCardsPerMeld: number = 13,
    numFlexCardPerMeld: number = 3,
    numFlexCardPerGroup: number = 1
  ): RummyConfig {
    if (!isSetRequired && !isSequenceRequired && !isPureSequenceRequired) {
      throw new Error(
        'At least one of the three variables must be true: isSetRequired, isSequenceRequired, or isPureSequenceRequired.'
      )
    }
    if (numFlexCardPerMeld >= numCardsPerMeld) {
      throw new Error('flex cards can not same or more then total card in meld')
    }
    if (numFlexCardPerGroup >= numCardsPerMeld) {
      throw new Error('flex cards can not same or more then total card in meld')
    }

    const config: RummyConfig = {
      isSetRequired,
      isSequenceRequired,
      isPureSequenceRequired,
      isJokerAllowed,
      isWildAllowed,
      numCardsPerMeld,
      numFlexCardPerMeld,
      numFlexCardPerGroup,
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
        throw new Error('Joker is not allowed in meld')
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
    // TODO::calculate points properly for each return
    this.verifyMeld(meld)
    if (!this.config.isJokerAllowed) {
      if (StandardCardHelper.isInDeck(meld.cards, StandardCardName.JOKER) !== -1) {
        return {
          isValid: false,
          error: 'Joker is not allowed in meld',
          points: Rummy.calculatePoints(meld.cards, wildCardName),
        }
      }
    } else {
      if (
        this.config.numFlexCardPerMeld <
        StandardCardHelper.getCountFromDeck(meld.cards, StandardCardName.JOKER)
      ) {
        return {
          isValid: false,
          error: `numbers of jokers/flex cards in 1 meld can not be more then ${this.config.numFlexCardPerMeld}`,
          points: Rummy.calculatePoints(meld.cards, wildCardName),
        }
      }
    }
    if (!this.config.isWildAllowed) {
      if (wildCardName !== undefined) {
        return {
          isValid: false,
          error: 'Wild card is not allowed in this game',
          points: Rummy.calculatePoints(meld.cards, wildCardName),
        }
      }
    }

    const cardGroups = this.getCardGroup(meld)
    const usedIndexes: number[] = []
    let points = 0

    let isReadyToDeclare = true
    let errorMessage
    let flexCardsInMeld = 0
    if (this.config.isSetRequired && isReadyToDeclare) {
      let isInSet = false
      cardGroups.forEach((cards, index) => {
        if (usedIndexes.includes(index)) {
          return
        }
        const temp = this.isInSet(cards)
        if (temp.isValid) {
          flexCardsInMeld = flexCardsInMeld + (temp.numOfFlexCardUsed ?? 0)
          usedIndexes.push(index)
          isInSet = true
        }
      })
      if (!isInSet && isReadyToDeclare) {
        isReadyToDeclare = false
        errorMessage = 'SET is required to declare'
      }
    }

    if (this.config.isSequenceRequired && isReadyToDeclare) {
      let isInSequence = false
      cardGroups.forEach((cards, index) => {
        if (usedIndexes.includes(index)) {
          return
        }
        const temp = this.isInSet(cards)
        if (temp.isValid) {
          usedIndexes.push(index)
          flexCardsInMeld = flexCardsInMeld + (temp.numOfFlexCardUsed ?? 0)
          isInSequence = true
        }
      })
      if (!isInSequence && isReadyToDeclare) {
        isReadyToDeclare = false
        errorMessage = 'SEQUENCE is required to declare'
      }
    }

    if (this.config.isPureSequenceRequired && isReadyToDeclare) {
      let isInPureSequence = false
      cardGroups.forEach((cards, index) => {
        if (usedIndexes.includes(index)) {
          return
        }
        if (this.isInPureSequence(cards).isValid) {
          usedIndexes.push(index)
          isInPureSequence = true
        }
      })
      if (!isInPureSequence && isReadyToDeclare) {
        isReadyToDeclare = false
        errorMessage = 'SEQUENCE is required to declare'
      }
    }

    if (flexCardsInMeld > this.config.numFlexCardPerMeld) {
      isReadyToDeclare = false
      errorMessage = `only ${this.config.numFlexCardPerMeld} flex cards are allowed, you have ${flexCardsInMeld} flex cards`
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
        error: 'At least 3 cards needed to make a SEQUENCE',
      }
    }

    if (!this.config.isJokerAllowed) {
      if (StandardCardHelper.isInDeck(cards, StandardCardName.JOKER) !== -1) {
        return {
          isValid: false,
          error: 'Joker is not allowed in this game',
        }
      }
    } else {
      if (
        this.config.numFlexCardPerGroup <
        StandardCardHelper.getCountFromDeck(cards, StandardCardName.JOKER)
      ) {
        return {
          isValid: false,
          error: `only ${this.config.numFlexCardPerGroup} jokers are allowed in 1 SEQUENCE`,
        }
      }
    }

    if (!this.config.isWildAllowed) {
      if (wildCardName !== undefined) {
        return {
          isValid: false,
          error: 'WildCard is not allowed in this game',
        }
      }
    }

    const tempCards = [...cards]
    let flexCardsAllowed = this.config.numFlexCardPerGroup
    let sequenceNumber
    let suite
    let isInSequence = true
    let isAllCardCheck = false

    let index = 0
    let errorMessage = null
    while (isInSequence && !isAllCardCheck) {
      if (sequenceNumber === undefined || suite === undefined) {
        if (tempCards[index].number === -1) {
          if (flexCardsAllowed > 0) {
            index++
            flexCardsAllowed--
          } else {
            isInSequence = false
            errorMessage = 'can not use more flex cards'
            break
          }
          continue
        } else if (tempCards[index].name === wildCardName) {
          if (flexCardsAllowed > 0) {
            index++
            flexCardsAllowed--
          } else {
            sequenceNumber = tempCards[index].number
            suite = tempCards[index].suite
            index++
          }
          continue
        } else {
          sequenceNumber = tempCards[index].number
          suite = tempCards[index].suite
        }
      } else {
        if (tempCards[index].number === sequenceNumber + 1 && tempCards[index].suite === suite) {
          sequenceNumber = tempCards[index].number
        } else if (tempCards[index].number === -1) {
          if (flexCardsAllowed <= 0) {
            isInSequence = false
            errorMessage = 'can not use more flex cards'
            break
          } else {
            sequenceNumber++
            flexCardsAllowed--
          }
        } else if (tempCards[index].name === wildCardName) {
          if (flexCardsAllowed <= 0) {
            isInSequence = false
            errorMessage = 'can not use more flex cards'
            break
          } else {
            sequenceNumber++
            flexCardsAllowed--
          }
        } else {
          isInSequence = false
        }
      }
      if (tempCards.length - 1 <= index) {
        isAllCardCheck = true
      }
      index++
    }

    const flexCardsUsed = this.config.numFlexCardPerGroup - flexCardsAllowed

    if (cards.length === 3 && flexCardsUsed >= 2) {
      return {
        isValid: false,
        error: 'You need at least 2 normal cards for SEQUENCE',
      }
    }

    if (isInSequence) {
      return {
        isValid: true,
        numOfFlexCardUsed: flexCardsUsed,
        points: 0,
      }
    } else {
      return {
        isValid: false,
        numOfFlexCardUsed: flexCardsUsed,
        error: errorMessage ?? 'Not a valid SEQUENCE',
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
        error: 'At least 3 cards needed to make a set',
      }
    }
    if (cards.length > 4) {
      return {
        isValid: false,
        error: 'Maximum of 4 cards are allowed in 1 set',
      }
    }

    if (!this.config.isJokerAllowed) {
      if (StandardCardHelper.isInDeck(cards, StandardCardName.JOKER) !== -1) {
        return {
          isValid: false,
          error: 'Joker is not allowed in this game',
        }
      }
    }

    if (!this.config.isWildAllowed) {
      if (wildCardName !== undefined) {
        return {
          isValid: false,
          error: 'WildCard is not allowed in this game',
        }
      }
    }

    if (StandardCardHelper.getCountFromDeck(cards, StandardCardName.JOKER) > 1) {
      return {
        isValid: false,
        error: 'Only 1 JOKER is allowed for SET',
      }
    }

    if (StandardCardHelper.hasSameNumber(cards) && !StandardCardHelper.hasPairSuite(cards)) {
      return {
        isValid: true,
        numOfFlexCardUsed: 0,
        points: 0,
      }
    }
    const tempCards = [...cards]
    let jokerIndex = StandardCardHelper.isInDeck(tempCards, StandardCardName.JOKER)
    if (jokerIndex > -1) {
      tempCards.splice(jokerIndex, 1)
      if (
        StandardCardHelper.hasSameNumber(tempCards) &&
        !StandardCardHelper.hasPairSuite(tempCards)
      ) {
        return {
          isValid: true,
          numOfFlexCardUsed: 0,
          points: 0,
        }
      }
    } else {
      if (wildCardName !== undefined) {
        jokerIndex = StandardCardHelper.isInDeck(tempCards, wildCardName)
        if (jokerIndex > -1) {
          tempCards.splice(jokerIndex, 1)
          if (
            StandardCardHelper.hasSameNumber(tempCards) &&
            !StandardCardHelper.hasPairSuite(tempCards)
          ) {
            return {
              isValid: true,
              numOfFlexCardUsed: 1,
              points: 0,
            }
          }
        }
      }
    }
    return {
      isValid: false,
      error: 'Not a VALID set',
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
        error: 'At least 3 cards needed to make a PURE SEQUENCE',
      }
    }
    if (StandardCardHelper.isInDeck(cards, StandardCardName.JOKER) !== -1) {
      return {
        isValid: false,
        error: 'Joker is not allowed for PURE SEQUENCE',
      }
    }
    if (!StandardCardHelper.hasSameSuite(cards)) {
      return {
        isValid: false,
        error: 'PURE SEQUENCE needs to have same suites',
      }
    }
    const tempCards = [...cards]
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
        numOfFlexCardUsed: 0,
        points: 0,
      }
    } else {
      return {
        isValid: false,
        error: 'Not a valid PURE SEQUENCE',
      }
    }
  }
}
