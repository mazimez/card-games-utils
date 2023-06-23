import { StandardCardName } from '../constants/StandardDeckEnum'
import { StandardDeck } from '../data/StandardDeck'

test('check getStandardDeck() method', () => {
  const cardsWithoutJoker = StandardDeck.getStandardDeck()
  expect(Array.isArray(cardsWithoutJoker)).toBe(true)
  expect(cardsWithoutJoker.length).toBe(52)
  expect(cardsWithoutJoker.every((card) => card.name !== StandardCardName.JOKER)).toBe(true)

  const cardsWithJoker = StandardDeck.getStandardDeck(true)
  expect(Array.isArray(cardsWithJoker)).toBe(true)
  expect(cardsWithJoker.length).toBe(53)
  expect(cardsWithJoker.some((card) => card.name === StandardCardName.JOKER)).toBe(true)
})
