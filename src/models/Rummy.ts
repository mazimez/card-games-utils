import { StandardCardName, StandardCardSuite } from '../constants/StandardDeckEnum'
import { StandardCardHelper } from '../helpers/StandardCardHelper'
import { type Meld } from '../interfaces/Meld'
import { type StandardCard } from '../interfaces/StandardCard'

/**
 * Class to handle operations of Rummy game
 * @class
 */
export class Rummy {
  /**
   * @method
   * @static
   * convert given array cards and groups into Meld interface
   *
   * @param {StandardCard[]} cards - array of cards
   * @param {number[][]} groups - mutlidimenal array of numbers that make different groups in meld
   * @returns {Meld} - returns the generated meld
   */
  static makeMeld(cards: StandardCard[], groups?: number[][]): Meld {
    const meld: Meld = {
      cards,
      groups: groups ?? [],
    }
    return meld
  }

  /**
   * @method
   * @static
   * get the groups of card from the given Meld
   *
   * @param {Meld} meld - the meld who's groups should be returned
   */
  static getCardGroup(meld: Meld): StandardCard[][] {
    const cardGroups: StandardCard[][] = new Array(meld.groups.length).fill(null).map(() => [])
    meld.groups.forEach((group, index) => {
      group.forEach((cardIndex) => {
        cardGroups[index].push(meld.cards[cardIndex])
      })
    })
    return cardGroups
  }

  /**
   * @method
   * @static
   * sort the cards in meld and divide card into 4 groups with game suites
   *
   * @param {Meld} meld - the meld who's groups should be returned
   */
  static sortMeld(meld: Meld): Meld {
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
   * decides if the given meld is ready to be declared
   *
   * @param {Meld} meld - the meld who is about to be declared
   * @param {keyof typeof StandardCardName} [wildCardName] - optional wild card.
   */
  static isReadyToDeclare(
    meld: Meld,
    wildCardName?: keyof typeof StandardCardName | undefined
  ): boolean {
    const groups = this.getCardGroup(meld)

    if (groups.length !== 3) {
      return false
    }
    let hasSet = false
    let hasSequence = false
    let hasPureSequence = false

    groups.forEach((cards) => {
      if (!hasSet && this.isInSet(cards, wildCardName)) {
        hasSet = true
      }
      if (!hasPureSequence && this.isInPureSequence(cards)) {
        hasPureSequence = true
      }
      if (!hasSequence && this.isInSequence(cards, wildCardName)) {
        hasSequence = true
      }
    })

    if (hasSet && hasSequence && hasPureSequence) {
      return true
    }
    return false
  }

  /**
   * @method
   * @static
   * decides if the given array of cards are in sequence or not
   *
   * @param {StandardCard[]} cards - array of cards that needs be checked
   * @param {keyof typeof StandardCardName} [wildCardName] - optional wild card.
   * @returns {boolean} - returns a boolean that given cards are in sequence or not
   */
  static isInSequence(
    cards: StandardCard[],
    wildCardName?: keyof typeof StandardCardName | undefined
  ): boolean {
    if (cards.length < 3) {
      return false
    }
    const tempCards = [...cards]
    let isJokerUsed = false
    let isWildCardUsed = false
    let sequenceNumber
    let isInSequence = true
    let isAllCardCheck = false

    let index = 0
    while (isInSequence && !isAllCardCheck) {
      if (sequenceNumber === undefined) {
        if (tempCards[index].number === -1 && !isJokerUsed) {
          isJokerUsed = true
          index++
          continue
        } else if (tempCards[index].name === wildCardName && !isWildCardUsed) {
          isWildCardUsed = true
          index++
          continue
        } else {
          sequenceNumber = tempCards[index].number
        }
      } else {
        if (tempCards[index].number === sequenceNumber + 1) {
          sequenceNumber = tempCards[index].number
        } else if (tempCards[index].number === -1 && !isJokerUsed) {
          sequenceNumber++
          isJokerUsed = true
        } else if (tempCards[index].name === wildCardName && !isWildCardUsed) {
          sequenceNumber++
          isWildCardUsed = true
        } else {
          isInSequence = false
        }
      }
      if (tempCards.length - 1 === index) {
        isAllCardCheck = true
      }
      index++
    }

    if (cards.length === 3 && isWildCardUsed && isJokerUsed) {
      return false
    }
    return isInSequence
  }

  /**
   * @method
   * @static
   * decides if the given array of cards are in sets or not
   *
   * @param {StandardCard[]} cards - array of cards that needs be checked
   * @param {keyof typeof StandardCardName} [wildCardName] - optional wild card.
   * @returns {boolean} - returns a boolean that given cards are in sets or not
   */
  static isInSet(
    cards: StandardCard[],
    wildCardName?: keyof typeof StandardCardName | undefined
  ): boolean {
    if (cards.length < 3) {
      return false
    }
    if (StandardCardHelper.hasSameNumber(cards) && !StandardCardHelper.hasPairSuite(cards)) {
      return true
    }
    const tempCards = [...cards]
    let jokerIndex = StandardCardHelper.isInDeck(tempCards, StandardCardName.JOKER)
    if (jokerIndex > -1) {
      tempCards.splice(jokerIndex, 1)
      if (
        StandardCardHelper.hasSameNumber(tempCards) &&
        !StandardCardHelper.hasPairSuite(tempCards)
      ) {
        return true
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
            return true
          }
        }
      }
    }
    return false
  }

  /**
   * @method
   * @static
   * decides if the given array of cards are in pure sequence or not
   *
   * @param {StandardCard[]} cards - array of cards that needs be checked
   * @returns {boolean} - returns a boolean that given cards are in pure sequence or not
   */
  static isInPureSequence(cards: StandardCard[]): boolean {
    if (cards.length < 3) {
      return false
    }
    if (!StandardCardHelper.hasSameSuite(cards)) {
      return false
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
    return isInSequence
  }
}
