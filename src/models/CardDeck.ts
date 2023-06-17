/**
 * Class to perform normal operations on any kind of Deck of cards
 * @class
 */
export class CardDeck {
  /**
   * @method
   * @static
   *
   * shuffle the array of items(cards)
   *
   * @template T - generic type of item(card) in the array.
   * @param {T[]} cards - The array of items(cards) to be shuffled.
   * @returns {T[]} - A new array with the items(cards) shuffled randomly.
   */
  static shuffleCards<T>(cards: T[]): T[] {
    cards.sort(() => 0.5 - Math.random())
    return cards
  }

  /**
   * @method
   * @static
   * Distributes specified number of cards per player to given number of players.
   *
   * @template T - generic type of item(card) in the array.
   * @param {T[]} cards - the array of items(cards) to be distributed.
   * @param {number} numberOfPlayers - the number of players to distribute cards to.
   * @param {number} cardPerPlayer - the number of cards to be distributed per player.
   * @param {boolean} shouldDealAround - optional boolean flag, if true, distributes one card per player on each iteration. else distributes all needed cards to player at once and going to another player
   * @returns {T[][]} - returns 2-dimensional array of cards distributed to each player.
   * @throws {Error} - if there are not enough cards to distribute among players.
   */
  static distributeCards<T>(
    cards: T[],
    numberOfPlayers: number,
    cardPerPlayer: number,
    shouldDealAround = true
  ): [T[][], T[]] {
    if (cards.length < numberOfPlayers * cardPerPlayer) {
      throw new Error('Not enoughs card to distribute')
    }
    const distributedCardsArr: T[][] = new Array(numberOfPlayers).fill(null).map(() => [])

    if (shouldDealAround) {
      for (let i = 0; i < cardPerPlayer; i++) {
        for (let j = 0; j < numberOfPlayers; j++) {
          distributedCardsArr[j].push(cards.pop() as T)
        }
      }
    } else {
      for (let i = 0; i < numberOfPlayers; i++) {
        for (let j = 0; j < cardPerPlayer; j++) {
          distributedCardsArr[i].push(cards.pop() as T)
        }
      }
    }
    return [distributedCardsArr, cards]
  }
}
