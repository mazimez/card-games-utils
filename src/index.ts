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
  type StandardCard,
  type Hand,
  type Meld,
  type Rummy,
}

const cardNames = [
  StandardCardName.CLUBS_TEN,
  StandardCardName.DIAMONDS_TEN,
  StandardCardName.JOKER,
  StandardCardName.DIAMONDS_ACE,
  StandardCardName.HEARTS_TWO,
  StandardCardName.SPADES_THREE,
  StandardCardName.CLUBS_ACE,
  StandardCardName.CLUBS_TWO,
  StandardCardName.CLUBS_THREE,
]

Rummy.makeMeld([])
const cards: StandardCard[] = []
cardNames.forEach((cardName) => {
  cards.push({
    name: cardName,
    color: StandardDeck.getColor(cardName),
    rank: StandardDeck.getRank(cardName),
    number: StandardDeck.getNumber(cardName),
    suite: StandardDeck.getSuite(cardName),
  })
})
// console.log(Rummy.isInSet(cards, StandardCardName.HEARTS_TEN))
// console.log(Rummy.isInSequence(cards, StandardCardName.HEARTS_TEN))
// console.log(Rummy.isInPureSequence(cards))

// const cards = CardDeck.distributeCards(
//   CardDeck.shuffleCards(StandardDeck.getStandardDeck(true)),
//   3,
//   13,
//   true
// )[0][0]
// const meld = Rummy.makeMeld(
//   [cards[0], cards[1], cards[2], cards[3], cards[4], cards[5], cards[6], cards[7], cards[8]],
//   [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//   ]
// )
// console.log(Rummy.isReadyToDeclare(meld))
