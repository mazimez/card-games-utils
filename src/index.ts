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

// const rummyGame = new Rummy(Rummy.makeRummyConfig(true, true, true, true, true, 13))
// const correctPureSequence = [
//   StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_KING),
//   StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_ACE),
//   StandardCardHelper.makeStandardCard(StandardCardName.CLUBS_TWO),
// ]
// console.log(rummyGame.isInPureSequence(correctPureSequence).isValid)
