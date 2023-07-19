import { StandardDeck } from './data/StandardDeck'
import { type StandardCard } from './interfaces/StandardCard'
import { type Hand } from './interfaces/Hand'
import { CardDeck } from './models/CardDeck'
import { TeenPatti } from './models/TeenPatti'
import { Rummy } from './models/Rummy'
import { StandardCardName } from './constants/StandardDeckEnum'
import { StandardCardHelper } from './helpers/StandardCardHelper'
import { type Meld } from './interfaces/Meld'

export {
  TeenPatti,
  CardDeck,
  StandardDeck,
  StandardCardHelper,
  StandardCardName,
  Rummy,
  type StandardCard,
  type Hand,
  type Meld,
}

const allRuleRummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 9))
const meld = allRuleRummyGame.makeMeld(
  [
    // SET
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.DIAMONDS_ACE),
    StandardCardHelper.makeStandardCard(StandardCardName.HEARTS_ACE),
    // SEQUENCE
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_FIVE),
    StandardCardHelper.makeStandardCard(StandardCardName.JOKER),
    StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_SEVEN),
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
console.log(allRuleRummyGame.isReadyToDeclare(meld).isValid)
// console.log(
//   allRuleRummyGame.isInPureSequence([
//     StandardCardHelper.makeStandardCard(StandardCardName.SPADES_FIVE),
//     StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SIX),
//     StandardCardHelper.makeStandardCard(StandardCardName.SPADES_SEVEN),
//   ]).isValid
// )
