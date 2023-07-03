import {
  StandardCardColor,
  StandardCardName,
  StandardCardRank,
  StandardCardSuite,
} from '../constants/StandardDeckEnum'
import { StandardCardHelper } from '../helpers/StandardCardHelper'

describe('test the StandardCardHelper helper and all methods in it', () => {
  it('test makeStandardCard() method', () => {
    const card = StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE)
    expect(card.color).toEqual(StandardCardColor.BLACK)
    expect(card.name).toEqual(StandardCardName.CLUBS_ACE)
    expect(card.number).toEqual(1)
    expect(card.rank).toEqual(StandardCardRank.ACE)
    expect(card.suite).toEqual(StandardCardSuite.CLUBS)
  })

  it('test sortCards() method', () => {
    const cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_NINE),
    ]
    const sortedCards = StandardCardHelper.sortCards(cards)

    expect(cards).toEqual([
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_NINE),
    ])
    expect(sortedCards).toEqual([
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_NINE),
    ])
  })

  it('test hasSameSuite() method', () => {
    let cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_NINE),
    ]
    expect(StandardCardHelper.hasSameSuite(cards)).toBe(true)
    cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_NINE),
    ]
    expect(StandardCardHelper.hasSameSuite(cards)).toBe(false)
  })

  it('test hasPairSuite() method', () => {
    let cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_NINE),
    ]
    expect(StandardCardHelper.hasPairSuite(cards)).toBe(true)
    cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_NINE),
    ]
    expect(StandardCardHelper.hasPairSuite(cards)).toBe(true)
    cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(StandardCardHelper.hasPairSuite(cards)).toBe(false)
  })

  it('test hasSameNumber() method', () => {
    let cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_EIGHT),
    ]
    expect(StandardCardHelper.hasSameNumber(cards)).toBe(true)
    cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_EIGHT),
    ]
    expect(StandardCardHelper.hasSameNumber(cards)).toBe(false)
  })

  it('test hasPairNumber() method', () => {
    let cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_EIGHT),
    ]
    expect(StandardCardHelper.hasPairNumber(cards)).toBe(true)
    cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_EIGHT),
    ]
    expect(StandardCardHelper.hasPairNumber(cards)).toBe(true)
    cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FOUR),
    ]
    expect(StandardCardHelper.hasPairNumber(cards)).toBe(false)
  })

  it('test isInDeck() method', () => {
    const cards = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_EIGHT),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_EIGHT),
    ]
    expect(StandardCardHelper.isInDeck(cards, StandardCardName.CLUBS_EIGHT)).toBe(0)
    expect(StandardCardHelper.isInDeck(cards, StandardCardName.DIAMONDS_ACE)).toBe(-1)
  })
})
