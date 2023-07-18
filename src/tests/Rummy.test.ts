import { StandardCardName } from '../constants/StandardDeckEnum'
import { StandardCardHelper } from '../helpers/StandardCardHelper'
import { Rummy } from '../models/Rummy'
describe('test the Rummy model and all methods in it', () => {
  it('test makeMeld() method', () => {
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 9, 3, 2))
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
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 9, 3, 2))
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
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 9, 3, 2))
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

  // it('test isReadyToDeclare() method', () => {
  //   const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 9, 3, 2))
  //   // without any joker or wildcard
  //   let meld = rummyGame.makeMeld(
  //     [
  //       // SET
  //       StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
  //       // SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_SIX),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
  //       // PURE SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
  //     ],
  //     [
  //       [0, 1, 2],
  //       [3, 4, 5],
  //       [6, 7, 8],
  //     ]
  //   )
  //   expect(rummyGame.isReadyToDeclare(meld)).toEqual(true)
  //   // with 1 joker
  //   meld = rummyGame.makeMeld(
  //     [
  //       // SET
  //       StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
  //       // SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_SIX),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
  //       // PURE SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
  //     ],
  //     [
  //       [0, 1, 2],
  //       [3, 4, 5],
  //       [6, 7, 8],
  //     ]
  //   )
  //   expect(rummyGame.isReadyToDeclare(meld)).toEqual(true)
  //   // with 2 joker
  //   meld = rummyGame.makeMeld(
  //     [
  //       // SET
  //       StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
  //       // SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
  //       // PURE SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
  //     ],
  //     [
  //       [0, 1, 2],
  //       [3, 4, 5],
  //       [6, 7, 8],
  //     ]
  //   )
  //   expect(rummyGame.isReadyToDeclare(meld)).toEqual(true)
  //   // with 1 wildcard
  //   meld = rummyGame.makeMeld(
  //     [
  //       // SET
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
  //       // SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_SIX),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
  //       // PURE SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
  //     ],
  //     [
  //       [0, 1, 2],
  //       [3, 4, 5],
  //       [6, 7, 8],
  //     ]
  //   )
  //   expect(rummyGame.isReadyToDeclare(meld, StandardCardName.DIAMONDS_TEN)).toEqual(true)
  //   // with 2 wildcard
  //   meld = rummyGame.makeMeld(
  //     [
  //       // SET
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
  //       // SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
  //       // PURE SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
  //     ],
  //     [
  //       [0, 1, 2],
  //       [3, 4, 5],
  //       [6, 7, 8],
  //     ]
  //   )
  //   expect(rummyGame.isReadyToDeclare(meld, StandardCardName.DIAMONDS_TEN)).toEqual(true)
  //   // with 1 wildcard and 1 joker
  //   meld = rummyGame.makeMeld(
  //     [
  //       // SET
  //       StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
  //       // SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
  //       StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_SEVEN),
  //       // PURE SEQUENCE
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
  //       StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
  //     ],
  //     [
  //       [0, 1, 2],
  //       [3, 4, 5],
  //       [6, 7, 8],
  //     ]
  //   )
  //   expect(rummyGame.isReadyToDeclare(meld, StandardCardName.DIAMONDS_TEN)).toEqual(true)
  // })

  it('test isInSequence() method', () => {
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 13, 3, 2))
    // NOTE::without any flex cards, a sequence is pure sequence(so we only check with flex cards
    // --------------------------------------------------------------------------------------------------------------------------
    // with 1 joker
    let correctSequence = [
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
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 13, 3, 2))
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
    expect(rummyGame.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN).isValid).toBe(false)

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
    expect(rummyGame.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN).isValid).toBe(false)

    // with 1 wildcard and 1 joker
    incorrectSet = [
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TEN),
      StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
      StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    ]
    expect(rummyGame.isInSet(incorrectSet, StandardCardName.DIAMONDS_TEN).isValid).toBe(false)
  })

  it('test isInPureSequence() method', () => {
    const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 13, 3, 2))
    // without any joker or wildcard
    const correctPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
    ]
    expect(rummyGame.isInPureSequence(correctPureSequence).isValid).toBe(true)
    let incorrectPureSequence = [
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
      StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_TWO),
      StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_THREE),
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
