import { TeenPattiHand } from '../constants/TeenPattiEnum'
import { type StandardCard } from '../interfaces/StandardCard'
import { type Hand } from '../interfaces/Hand'
import { StandardCardHelper } from '../helpers/StandardCardHelper'

/**
 * Class to handle operations of TeenPatti game
 * @class
 */
export class TeenPatti {
  /**
   * @method
   * @static
   * Calculates the Teen Patti hand based on an array of three cards.
   *
   * @param {[StandardCard, StandardCard, StandardCard]} cards - The array of three cards to be used for the hand calculation.
   * @returns {keyof typeof TeenPattiHand} - The type of Teen Patti hand that is formed by the given cards.
   */
  static calculateHand(
    cards: [StandardCard, StandardCard, StandardCard]
  ): keyof typeof TeenPattiHand {
    const sortedCards: StandardCard[] = StandardCardHelper.sortCards(cards)
    // check for trail condition
    if (
      sortedCards[0].number === sortedCards[1].number &&
      sortedCards[1].number === sortedCards[2].number
    ) {
      return TeenPattiHand.TRAIL
    }

    // check for pure sequence
    if (
      // they need to be from same suite
      sortedCards[0].suite === sortedCards[1].suite &&
      sortedCards[0].suite === sortedCards[2].suite
    ) {
      // checking for normal sequence
      if (
        sortedCards[0].number + 1 === sortedCards[1].number &&
        sortedCards[1].number + 1 === sortedCards[2].number
      ) {
        return TeenPattiHand.PURE_SEQUENCE
      } else {
        if (
          // 1 exception check for Q,K,A
          sortedCards[0].number === 12 &&
          sortedCards[1].number === 13 &&
          sortedCards[2].number === 14
        ) {
          return TeenPattiHand.PURE_SEQUENCE
        }
      }
    }

    // checking for normal sequence
    if (
      sortedCards[0].number + 1 === sortedCards[1].number &&
      sortedCards[1].number + 1 === sortedCards[2].number
    ) {
      return TeenPattiHand.SEQUENCE
    } else {
      if (
        // 1 exception check for Q,K,A
        sortedCards[0].number === 12 &&
        sortedCards[1].number === 13 &&
        sortedCards[2].number === 14
      ) {
        return TeenPattiHand.SEQUENCE
      }
    }

    // checking for color
    if (
      sortedCards[0].suite === sortedCards[1].suite &&
      sortedCards[0].suite === sortedCards[2].suite
    ) {
      return TeenPattiHand.COLOR
    }

    // checking for pair
    if (
      sortedCards[0].number === sortedCards[1].number ||
      sortedCards[1].number === sortedCards[2].number
    ) {
      return TeenPattiHand.PAIR
    }

    // finally, if not any other hand found, returning High
    return TeenPattiHand.HIGH
  }

  /**
   * @method
   * @static
   * convert the given array of 3 cards into Hand interface
   *
   * @param {[StandardCard,StandardCard,StandardCard]} cards - the array of cards to be sorted
   * @returns {Hand} - the sorted array of cards
   */
  static makeHand(cards: [StandardCard, StandardCard, StandardCard]): Hand {
    const hand: Hand = {
      cards,
      hand: this.calculateHand(cards),
    }
    return hand
  }

  /**
   * @method
   * @static
   * Calculates the winner(s) from the array of hands given based on Teen Patti rules
   * winner could be multiple if players have identical cards with different suites
   *
   * @param {Hand[]} hands - The array of hands to be used for winner calculation.
   * @returns {number[]} - array of indexes of the winner(s) in the array given
   */
  static calculateWinners(hands: Hand[]): number[] {
    if (hands.length < 2) {
      throw new Error('need at least 2 hand to compare')
    }

    let highestHand: Hand | undefined
    const handsPriority: Array<keyof typeof TeenPattiHand> = [
      TeenPattiHand.HIGH,
      TeenPattiHand.PAIR,
      TeenPattiHand.COLOR,
      TeenPattiHand.SEQUENCE,
      TeenPattiHand.PURE_SEQUENCE,
      TeenPattiHand.TRAIL,
    ]

    hands.forEach((hand) => {
      if (highestHand == null) {
        highestHand = hand
      }
      if (handsPriority.indexOf(hand.hand) >= handsPriority.indexOf(highestHand.hand)) {
        highestHand = hand
      }
    })

    const handsToCompare: Hand[] = hands.filter(function (hand) {
      if (hand.hand === highestHand?.hand) {
        return true
      }
      return false
    })

    if (handsToCompare.length === 1) {
      return [hands.indexOf(handsToCompare[0])]
    }

    let winnerHands: Hand[] = []

    let tempWinnerHand: Hand = handsToCompare[0]

    handsToCompare.forEach((hand) => {
      if (tempWinnerHand === null) {
        tempWinnerHand = hand
      } else if (tempWinnerHand !== hand) {
        try {
          if (this.isRankHigher(hand, tempWinnerHand)) {
            winnerHands = []
            tempWinnerHand = hand
          }
        } catch (error) {
          winnerHands.push(tempWinnerHand)
          tempWinnerHand = hand
        }
      }
    })

    if (tempWinnerHand != null) {
      winnerHands.push(tempWinnerHand)
    }

    const winnerIndexes: number[] = []
    winnerHands.forEach((hand) => {
      winnerIndexes.push(hands.indexOf(hand))
    })

    return winnerIndexes
  }

  /**
   * @method
   * @static
   *  decide if the rank of first given card is higher then second given card
   *  this method should only be used when you have cards with same TeenPattiHand and you want to know the higher ranking
   *
   * @param {Hand} hand - the Hand that needs to be compared
   * @param {Hand} handToCompare - the Hand to compare with
   * @returns {boolean} - boolean showing is the card higher or not
   * @throws {Error} - when the comparison results in a tie
   */
  static isRankHigher(hand: Hand, handToCompare: Hand): boolean {
    // first checking if any card in each hand has the ace in it, if yes then changing it's number from 1 to 14(since ace should be the highest while comparing)
    let cards: StandardCard[] = hand.cards.filter((card) => {
      if (card.number === 1) {
        card.number = 14
        return card
      } else {
        return card
      }
    })

    let cardsToCompare: StandardCard[] = handToCompare.cards.filter((card) => {
      if (card.number === 1) {
        card.number = 14
        return card
      } else {
        return card
      }
    })

    // sorting cards is ascending order, so lowest card will be first
    cards = StandardCardHelper.sortCards(cards)
    cardsToCompare = StandardCardHelper.sortCards(cardsToCompare)

    // after sorting, we start comparing each card(from highest to lowest) to see who has the highest card
    if (cards[2].number > cardsToCompare[2].number) {
      return true
    } else if (cardsToCompare[2].number > cards[2].number) {
      return false
    }
    if (cards[1].number > cardsToCompare[1].number) {
      return true
    } else if (cardsToCompare[1].number > cards[1].number) {
      return false
    }
    if (cards[0].number > cardsToCompare[0].number) {
      return true
    } else if (cardsToCompare[0].number > cards[0].number) {
      return false
    }

    // if cards are identical in numbers, then it will be considered TIE and throw an error
    throw new Error('Tie occurred in the comparison of the two hands')
  }
}
