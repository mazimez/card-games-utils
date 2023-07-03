import { StandardCardName } from '../constants/StandardDeckEnum'
import { StandardDeck } from '../data/StandardDeck'
import { type StandardCard } from '../interfaces/StandardCard'
import { CardDeck } from '../models/CardDeck'

describe('test the CardDeck model and all methods in it', () => {
  it('test shuffleCards() method', () => {
    const cards: StandardCard[] = []

    const sampleCardNames = [
      StandardCardName.CLUBS_ACE,
      StandardCardName.CLUBS_TWO,
      StandardCardName.CLUBS_THREE,
      StandardCardName.CLUBS_FOUR,
      StandardCardName.CLUBS_FIVE,
      StandardCardName.CLUBS_SIX,
    ]
    sampleCardNames.forEach((cardName) => {
      cards.push({
        name: cardName,
        color: StandardDeck.getColor(cardName),
        rank: StandardDeck.getRank(cardName),
        number: StandardDeck.getNumber(cardName),
        suite: StandardDeck.getSuite(cardName),
      })
    })

    const shuffledCards = CardDeck.shuffleCards(cards)
    expect(Array.isArray(shuffledCards)).toBe(true)
    expect(shuffledCards.length).toBe(sampleCardNames.length)
    expect(cards).not.toMatchObject(shuffledCards)
  })

  it('test distributeCards() method', () => {
    const sampleCardNames = [
      StandardCardName.CLUBS_ACE,
      StandardCardName.CLUBS_TWO,
      StandardCardName.CLUBS_THREE,
      StandardCardName.CLUBS_FOUR,
      StandardCardName.CLUBS_FIVE,
      StandardCardName.CLUBS_SIX,
      StandardCardName.CLUBS_SEVEN,
      StandardCardName.CLUBS_EIGHT,
      StandardCardName.CLUBS_NINE,
      StandardCardName.CLUBS_TEN,
    ]

    const totalCardCount = 10
    const playerCount = 2
    const cardPerPlayer = 3

    const distributedCards = CardDeck.distributeCards(
      sampleCardNames,
      playerCount,
      cardPerPlayer,
      true
    )
    expect(Array.isArray(distributedCards)).toBe(true)
    expect(distributedCards.length).toBe(2)

    expect(Array.isArray(distributedCards[0])).toBe(true)
    expect(distributedCards[0].length).toBe(playerCount)
    expect(distributedCards[0].every((cardGroup) => cardGroup.length === cardPerPlayer)).toBe(true)

    expect(Array.isArray(distributedCards[1])).toBe(true)
    expect(distributedCards[1].length).toBe(totalCardCount - playerCount * cardPerPlayer)
  })
})
