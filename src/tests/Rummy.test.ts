import { StandardCardName } from '../constants/StandardDeckEnum'
import { StandardCardHelper } from '../helpers/StandardCardHelper'
import { Rummy } from '../models/Rummy'
describe('test the Rummy model and all methods in it', () => {
  it('test makeMeld() method', () => {
    const meld = Rummy.makeMeld(
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
    const meld = Rummy.makeMeld(
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

    const cardGroup = Rummy.getCardGroup(meld)
    expect(Array.isArray(cardGroup)).toBe(true)
    expect(cardGroup.length).toBe(3)
    expect(cardGroup.every((group) => group.length === 3)).toBe(true)
  })
  it('test sortMeld() method', () => {
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

    let meld = Rummy.makeMeld(cardGroup, [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ])

    meld = Rummy.sortMeld(meld)
    expect(meld.groups).toEqual([[0, 3], [1, 4], [2, 5], [6, 7, 8], []])
  })
  it('test isReadyToDeclare() method', () => {
    // without any joker or wildcard
    let meld = Rummy.makeMeld(
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
    expect(Rummy.isReadyToDeclare(meld)).toEqual(true)
    // with 1 joker
    meld = Rummy.makeMeld(
      [
        // SET
        StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
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
    expect(Rummy.isReadyToDeclare(meld)).toEqual(true)
    // with 2 joker
    meld = Rummy.makeMeld(
      [
        // SET
        StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
        // SEQUENCE
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
        StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
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
    expect(Rummy.isReadyToDeclare(meld)).toEqual(true)
    // with 1 wildcard
    meld = Rummy.makeMeld(
      [
        // SET
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
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
    expect(Rummy.isReadyToDeclare(meld, StandardCardName.DIAMONDS_TEN)).toEqual(true)
    // with 2 wildcard
    meld = Rummy.makeMeld(
      [
        // SET
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
        // SEQUENCE
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
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
    expect(Rummy.isReadyToDeclare(meld, StandardCardName.DIAMONDS_TEN)).toEqual(true)
    // with 1 wildcard and 1 joker
    meld = Rummy.makeMeld(
      [
        // SET
        StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
        StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
        // SEQUENCE
        StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
        StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
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
    expect(Rummy.isReadyToDeclare(meld, StandardCardName.DIAMONDS_TEN)).toEqual(true)
  })
  it('test isInSequence() method', () => {
    // without any joker or wildcard
    let correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
    ]
    expect(Rummy.isInSequence(correctSequence)).toBe(true)
    let incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SIX),
    ]
    expect(Rummy.isInSet(incorrectSequence)).toBe(false)
    // --------------------------------------------------------------------------------------------------------------------------
    // with 1 joker
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
    ]
    expect(Rummy.isInSequence(correctSequence)).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
    ]
    expect(Rummy.isInSequence(correctSequence)).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
    ]
    expect(Rummy.isInSequence(correctSequence)).toBe(true)
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
    ]
    expect(Rummy.isInSet(incorrectSequence)).toBe(false)
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
    ]
    expect(Rummy.isInSet(incorrectSequence)).toBe(false)
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
    ]
    expect(Rummy.isInSet(incorrectSequence)).toBe(false)
    // --------------------------------------------------------------------------------------------------------------------------
    // with 2 joker
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
    ]
    expect(Rummy.isInSequence(incorrectSequence)).toBe(false)
    // --------------------------------------------------------------------------------------------------------------------------
    // with 1 wildcard
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
    ]
    expect(Rummy.isInSequence(correctSequence, StandardCardName.DIAMONDS_TEN)).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_TWO),
    ]
    expect(Rummy.isInSequence(correctSequence, StandardCardName.DIAMONDS_TEN)).toBe(true)
    correctSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
    ]
    expect(Rummy.isInSequence(correctSequence, StandardCardName.DIAMONDS_TEN)).toBe(true)
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
    ]
    expect(Rummy.isInSet(incorrectSequence, StandardCardName.DIAMONDS_TEN)).toBe(false)
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
    ]
    expect(Rummy.isInSet(incorrectSequence, StandardCardName.DIAMONDS_TEN)).toBe(false)
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
    ]
    expect(Rummy.isInSet(incorrectSequence, StandardCardName.DIAMONDS_TEN)).toBe(false)
    // --------------------------------------------------------------------------------------------------------------------------
    // with 2 wildcard
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
    ]
    expect(Rummy.isInSequence(incorrectSequence, StandardCardName.DIAMONDS_TEN)).toBe(false)
    // --------------------------------------------------------------------------------------------------------------------------
    // with 1 wildcard and 1 joker
    incorrectSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_THREE),
    ]
    expect(Rummy.isInSequence(incorrectSequence, StandardCardName.DIAMONDS_TEN)).toBe(false)
  })
  it('test isInSet() method', () => {
    // without any joker or wildcard
    let correctSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(Rummy.isInSet(correctSet)).toBe(true)
    let incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(Rummy.isInSet(incorrectSet)).toBe(false)

    // with 1 joker
    correctSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(Rummy.isInSet(correctSet)).toBe(true)
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
    ]
    expect(Rummy.isInSet(incorrectSet)).toBe(false)

    // with 2 joker
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(Rummy.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN)).toBe(false)

    // with 1 wildcard
    correctSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(Rummy.isInSet(correctSet, StandardCardName.DIAMONDS_TEN)).toBe(true)
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_FIVE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
    ]
    expect(Rummy.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN)).toBe(false)

    // with 2 wildcard
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(Rummy.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN)).toBe(false)

    // with 1 wildcard and 1 joker
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(Rummy.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN)).toBe(false)
  })
  it('test isInPureSequence() method', () => {
    // without any joker or wildcard
    const correctPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ]
    expect(Rummy.isInPureSequence(correctPureSequence)).toBe(true)
    let incorrectPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ]
    expect(Rummy.isInPureSequence(incorrectPureSequence)).toBe(false)
    // with 1 joker
    incorrectPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ]
    expect(Rummy.isInPureSequence(incorrectPureSequence)).toBe(false)
    // with 2 joker
    incorrectPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ]
    expect(Rummy.isInPureSequence(incorrectPureSequence)).toBe(false)
  })
})
