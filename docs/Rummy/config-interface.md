# RummyConfig Interface

The `RummyConfig` is used to define the rules for the rummy game, it is defined in the [RummyConfig](src/interfaces/RummyConfig.ts) interface.

A `RummyConfig` object has the following properties:

- `isSetRequired`: A Boolean indicating that is `set` group of cards is required for any meld to be able to declare
- `isSequenceRequired`: A Boolean indicating that is `sequence` group of cards is required for any meld to be able to declare
- `isPureSequenceRequired`: A Boolean indicating that is `pure-sequence` group of cards is required for any meld to be able to declare
- `isJokerAllowed`: A Boolean indicating that is JOKER type of card is allowed in game or not.
- `isWildAllowed`: A Boolean indicating that is WILD-CARD is allowed in game or not.
- `numCardsPerMeld`: the number of cards allowed in 1 meld
