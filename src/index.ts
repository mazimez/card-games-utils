import { StandardDeck } from './data/StandardDeck'
import { type StandardCard } from './interfaces/StandardCard'
import { type Hand } from './interfaces/Hand'
import { CardDeck } from './models/CardDeck'
import { TeenPatti } from './models/TeenPatti'
import { Rummy } from './models/Rummy'

export { TeenPatti, CardDeck, StandardDeck, type StandardCard, type Hand }

const cards = CardDeck.distributeCards(
  CardDeck.shuffleCards(StandardDeck.getStandardDeck(true)),
  3,
  13,
  true
)[0][0]
const meld = Rummy.makeMeld(
  [
    cards[0],
    cards[1],
    cards[2],
    cards[3],
    cards[4],
    cards[5],
    cards[6],
    cards[7],
    cards[8],
    cards[9],
    cards[10],
    cards[11],
    cards[12],
  ],
  [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]
)
console.log(Rummy.getCardGroup(Rummy.sortMeld(meld)))
