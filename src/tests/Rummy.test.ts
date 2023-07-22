import { ErrorEnum } from '../constants/ErrorEnum'
import { StandardCardName } from '../constants/StandardDeckEnum'
import { StandardCardHelper } from '../helpers/StandardCardHelper'
import { Rummy } from '../models/Rummy'
describe('test the Rummy model and all methods in it', () => {
  it('test makeMeld() method', () => {
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 9))
    const meld = rummyGame.makeMeld(
      [
        // SET
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
        // SEQUENCE
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_SIX),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
        // PURE SEQUENCE
        StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
        StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
        StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
      ],
      [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ]
    )
    expect(Array.isArray(meld.cards)).toBe(true)
    expect(meld.cards.length).toBe(9)
    expect(Array.isArray(meld.groups)).toBe(true)
    expect(meld.groups.length).toBe(3)
    expect(meld.groups.every((group) => group.length === 3)).toBe(true)
  })

  it('test getCardGroup() method', () => {
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 9))
    const meld = rummyGame.makeMeld(
      [
        // SET
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
        // SEQUENCE
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_SIX),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
        // PURE SEQUENCE
        StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
        StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
        StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
      ],
      [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ]
    )

    const cardGroup = rummyGame.getCardGroup(meld)
    expect(Array.isArray(cardGroup)).toBe(true)
    expect(cardGroup.length).toBe(3)
    expect(cardGroup.every((group) => group.length === 3)).toBe(true)
  })

  it('test sortMeld() method', () => {
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 9))
    const cardGroup = [
      // SET
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
      // SEQUENCE
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_SIX),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
      // PURE SEQUENCE
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
      StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
    ]

    let meld = rummyGame.makeMeld(cardGroup, [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ])

    meld = rummyGame.sortMeld(meld)
    expect(meld.groups).toEqual([[0, 3], [1, 4], [2, 5], [6, 7, 8], []])
  })

  it('test calculatePoints() method', () => {
    let points = Rummy.calculatePoints([
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ])
    expect(points).toEqual(3)

    points = Rummy.calculatePoints(
      [
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
      ],
      StandardCardName.DIAMONDS_ACE
    )
    expect(points).toEqual(2)

    points = Rummy.calculatePoints(
      [
        StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
      ],
      StandardCardName.DIAMONDS_ACE
    )
    expect(points).toEqual(1)

    points = Rummy.calculatePoints(
      [
        StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_JACK),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_KING),
      ],
      StandardCardName.DIAMONDS_ACE
    )
    expect(points).toEqual(20)
  })

  it('test isReadyToDeclare() method', () => {
    const onlySetRummyGame = new Rummy(Rummy.makeRummyConfig(true, false, false, true, true, 9))
    const onlySequenceRummyGame = new Rummy(
      Rummy.makeRummyConfig(false, true, false, true, true, 9)
    )
    const onlyPureSequenceRummyGame = new Rummy(
      Rummy.makeRummyConfig(false, false, true, true, true, 9)
    )
    const allRuleRummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 9))
    const noJokerRummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, false, true, 9))
    const noWildRummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, false, 9))

    // without any joker or wildcard
    const meld = noWildRummyGame.makeMeld(
      [
        // SET
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
        // SEQUENCE
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
        StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_SEVEN),
        // PURE SEQUENCE / SEQUENCE
        StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
        StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
        StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
      ],
      [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ]
    )

    // CORRECT ONES
    expect(onlySetRummyGame.isReadyToDeclare(meld, StandardCardName.CLUBS_FIVE).isValid).toEqual(
      true
    )
    expect(onlySetRummyGame.isReadyToDeclare(meld, StandardCardName.CLUBS_FIVE).points).toEqual(25)
    expect(
      onlySequenceRummyGame.isReadyToDeclare(meld, StandardCardName.CLUBS_FIVE).isValid
    ).toEqual(true)
    expect(
      onlySequenceRummyGame.isReadyToDeclare(meld, StandardCardName.CLUBS_FIVE).points
    ).toEqual(3)
    expect(
      onlyPureSequenceRummyGame.isReadyToDeclare(meld, StandardCardName.CLUBS_FIVE).isValid
    ).toEqual(true)
    expect(
      onlyPureSequenceRummyGame.isReadyToDeclare(meld, StandardCardName.CLUBS_FIVE).points
    ).toEqual(10)

    // INCORRECT ONES
    expect(noWildRummyGame.isReadyToDeclare(meld, StandardCardName.CLUBS_FIVE).isValid).toEqual(
      false
    )
    expect(noWildRummyGame.isReadyToDeclare(meld, StandardCardName.CLUBS_FIVE).error).toEqual(
      ErrorEnum.WILD_NOT_ALLOWED
    )
    expect(noJokerRummyGame.isReadyToDeclare(meld).isValid).toEqual(false)
    expect(noJokerRummyGame.isReadyToDeclare(meld).error).toEqual(ErrorEnum.JOKER_NOT_ALLOWED)
    expect(allRuleRummyGame.isReadyToDeclare(meld).isValid).toEqual(true)
    expect(allRuleRummyGame.isReadyToDeclare(meld).points).toEqual(0)
  })

  it('test isInSequence() method', () => {
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 13))
    // NOTE::without any flex cards, a sequence is pure sequence(so we focus more on deck with flex cards)
    // with the exception of Q,K,A - without proper order
    let correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_QUEEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
    ]
    expect(rummyGame.isInSequence(correctSequence).isValid).toBe(true)
    // --------------------------------------------------------------------------------------------------------------------------
    // with 1 joker
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
    ]
    expect(rummyGame.isInSequence(correctSequence).isValid).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_QUEEN),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
    ]
    expect(rummyGame.isInSequence(correctSequence).isValid).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
    ]
    expect(rummyGame.isInSequence(correctSequence).isValid).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ]
    expect(rummyGame.isInSequence(correctSequence).isValid).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_THREE),
    ]
    expect(rummyGame.isInSequence(correctSequence).isValid).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_THREE),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
    ]
    expect(rummyGame.isInSequence(correctSequence).isValid).toBe(true)
    let incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
    ]
    expect(rummyGame.isInSequence(incorrectSequence).isValid).toBe(false)
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
    ]
    expect(rummyGame.isInSequence(incorrectSequence).isValid).toBe(false)
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
    ]
    expect(rummyGame.isInSequence(incorrectSequence).isValid).toBe(false)
    // --------------------------------------------------------------------------------------------------------------------------
    // with 2 joker
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
    ]
    expect(rummyGame.isInSequence(incorrectSequence).isValid).toBe(false)

    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    ]
    expect(rummyGame.isInSequence(correctSequence).isValid).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
    ]
    expect(rummyGame.isInSequence(correctSequence).isValid).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_QUEEN),
    ]
    expect(rummyGame.isInSequence(correctSequence).isValid).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_QUEEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    ]
    expect(rummyGame.isInSequence(correctSequence).isValid).toBe(true)
    // --------------------------------------------------------------------------------------------------------------------------
    // with 1 wildcard
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ]
    expect(rummyGame.isInSequence(correctSequence, StandardCardName.DIAMONDS_TEN).isValid).toBe(
      true
    )
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
    ]
    expect(rummyGame.isInSequence(correctSequence, StandardCardName.DIAMONDS_TEN).isValid).toBe(
      true
    )
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_QUEEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
    ]
    expect(rummyGame.isInSequence(correctSequence, StandardCardName.DIAMONDS_TEN).isValid).toBe(
      true
    )
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    ]
    expect(rummyGame.isInSequence(correctSequence, StandardCardName.DIAMONDS_TEN).isValid).toBe(
      true
    )
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
    ]
    expect(rummyGame.isInSequence(correctSequence, StandardCardName.DIAMONDS_TEN).isValid).toBe(
      true
    )
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
    ]
    expect(rummyGame.isInSequence(incorrectSequence, StandardCardName.DIAMONDS_TEN).isValid).toBe(
      false
    )
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
    ]
    expect(rummyGame.isInSequence(incorrectSequence, StandardCardName.DIAMONDS_TEN).isValid).toBe(
      false
    )
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
    ]
    expect(rummyGame.isInSequence(incorrectSequence, StandardCardName.DIAMONDS_TEN).isValid).toBe(
      false
    )
    // --------------------------------------------------------------------------------------------------------------------------
    // with 2 wildcard
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
    ]
    expect(rummyGame.isInSequence(incorrectSequence, StandardCardName.DIAMONDS_TEN).isValid).toBe(
      false
    )
    // --------------------------------------------------------------------------------------------------------------------------
    // with 1 wildcard and 1 joker
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
    ]
    expect(rummyGame.isInSequence(incorrectSequence, StandardCardName.DIAMONDS_TEN).isValid).toBe(
      false
    )
  })
  it('test isInSet() method', () => {
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 13))
    // without any joker or wildcard
    let correctSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(rummyGame.isInSet(correctSet).isValid).toBe(true)
    let incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(rummyGame.isInSet(incorrectSet).isValid).toBe(false)

    // with 1 joker
    correctSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(rummyGame.isInSet(correctSet).isValid).toBe(true)
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
    ]
    expect(rummyGame.isInSet(incorrectSet).isValid).toBe(false)

    // with 2 joker
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(rummyGame.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN).isValid).toBe(true)

    // with 1 wildcard
    correctSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(rummyGame.isInSet(correctSet, StandardCardName.DIAMONDS_TEN).isValid).toBe(true)
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
    ]
    expect(rummyGame.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN).isValid).toBe(false)

    // with 2 wildcard
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(rummyGame.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN).isValid).toBe(true)

    // with 1 wildcard and 1 joker
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(rummyGame.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN).isValid).toBe(true)

    // with 3 jokers
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
    ]
    expect(rummyGame.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN).isValid).toBe(false)
    expect(rummyGame.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN).error).toBe(
      ErrorEnum.AT_LEAST_ONE_NORMAL_CARD_NEEDED_FOR_SET
    )
  })

  it('test isInPureSequence() method', () => {
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 13))
    // without any joker or wildcard
    let correctPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FOUR),
    ]
    expect(rummyGame.isInPureSequence(correctPureSequence).isValid).toBe(true)
    // without proper order
    correctPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ]
    // with the exception of Q,K,A
    correctPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_QUEEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    ]
    expect(rummyGame.isInPureSequence(correctPureSequence).isValid).toBe(true)
    // with the exception of Q,K,A - without proper order
    correctPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_QUEEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
    ]
    expect(rummyGame.isInPureSequence(correctPureSequence).isValid).toBe(true)
    // with the exception of K,A,2
    correctPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    ]
    expect(rummyGame.isInPureSequence(correctPureSequence).isValid).toBe(true)
    // with the exception of K,A,2- without proper order
    correctPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    ]
    expect(rummyGame.isInPureSequence(correctPureSequence).isValid).toBe(true)
    // Valid pure sequence with face cards in different order
    correctPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_QUEEN),
    ]
    expect(rummyGame.isInPureSequence(correctPureSequence).isValid).toBe(true)

    // Valid pure sequence with four cards including face card
    correctPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_JACK),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_QUEEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    ]
    expect(rummyGame.isInPureSequence(correctPureSequence).isValid).toBe(true)

    // Valid pure sequence with face cards
    correctPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_QUEEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    ]
    expect(rummyGame.isInPureSequence(correctPureSequence).isValid).toBe(true)

    let incorrectPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ]
    expect(rummyGame.isInPureSequence(incorrectPureSequence).isValid).toBe(false)

    // Invalid pure sequence with only two cards
    incorrectPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
    ]
    expect(rummyGame.isInPureSequence(incorrectPureSequence).isValid).toBe(false)
    // Invalid pure sequence with repeated cards
    incorrectPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
    ]
    expect(rummyGame.isInPureSequence(incorrectPureSequence).isValid).toBe(false)

    // Invalid pure sequence with a gap between cards
    incorrectPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FOUR),
    ]
    expect(rummyGame.isInPureSequence(incorrectPureSequence).isValid).toBe(false)
    // Invalid pure sequence with duplicate face cards
    incorrectPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_JACK),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_QUEEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_JACK),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    ]
    expect(rummyGame.isInPureSequence(incorrectPureSequence).isValid).toBe(false)

    // with 1 joker
    incorrectPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ]
    expect(rummyGame.isInPureSequence(incorrectPureSequence).isValid).toBe(false)
    // with 2 joker
    incorrectPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ]
    expect(rummyGame.isInPureSequence(incorrectPureSequence).isValid).toBe(false)
  })
})
