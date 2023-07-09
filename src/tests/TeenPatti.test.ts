import { StandardCardName } from '../constants/StandardDeckEnum'
import { TeenPattiHand } from '../constants/TeenPattiEnum'
import { StandardCardHelper } from '../helpers/StandardCardHelper'
import { TeenPatti } from '../models/TeenPatti'

describe('test the TeenPatti model and all methods in it', () => {
  it('test calculateHand() method', () => {
    let hand = TeenPatti.calculateHand([
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ])
    expect(hand).toBe(TeenPattiHand.TRAIL)
    hand = TeenPatti.calculateHand([
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ])
    expect(hand).toBe(TeenPattiHand.PURE_SEQUENCE)
    hand = TeenPatti.calculateHand([
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
    ])
    expect(hand).toBe(TeenPattiHand.SEQUENCE)
    hand = TeenPatti.calculateHand([
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FOUR),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
    ])
    expect(hand).toBe(TeenPattiHand.COLOR)
    hand = TeenPatti.calculateHand([
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
    ])
    expect(hand).toBe(TeenPattiHand.PAIR)
    hand = TeenPatti.calculateHand([
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FOUR),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_EIGHT),
    ])
    expect(hand).toBe(TeenPattiHand.HIGH)
  })
  it('test makeHand() method', () => {
    const hand = TeenPatti.makeHand([
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ])
    expect(Array.isArray(hand.cards)).toBe(true)
    expect(hand.cards.length).toBe(3)
    expect(hand.hand).toBe(TeenPattiHand.TRAIL)
  })
  it('test calculateWinners() method', () => {
    // TRAIL-PURE_SEQUENCE => TRAIL
    let winnerArr = TeenPatti.calculateWinners([
      TeenPatti.makeHand([
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
      ]),
      TeenPatti.makeHand([
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
      ]),
    ])
    expect(Array.isArray(winnerArr)).toBe(true)
    expect(winnerArr.length).toBe(1)
    expect(winnerArr[0]).toBe(0)
    // PURE_SEQUENCE-SEQUENCE => PURE_SEQUENCE
    winnerArr = TeenPatti.calculateWinners([
      TeenPatti.makeHand([
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
      ]),
      TeenPatti.makeHand([
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
      ]),
    ])
    expect(Array.isArray(winnerArr)).toBe(true)
    expect(winnerArr.length).toBe(1)
    expect(winnerArr[0]).toBe(0)
  })
  it('test isRankHigher() method', () => {})
})
