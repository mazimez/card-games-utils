# Hand Interface

The `Hand` represents a hand in Teen Patti, which is a combination of three standard playing cards. It is defined in the [Hand](src/interfaces/Hand.ts) interface.

A `Hand` object has the following properties:

- `cards`: An array of three [StandardCard](src/interfaces/StandardCard.ts) objects that make up the hand.
- `hand`: A string indicating the type of hand, such as `TRAIL`, `PURE_SEQUENCE`, and so on. This property represents the classification of the hand according to the rules of Teen Patti.

The `Hand` is used to represent the real-world hand of cards in the Teen Patti game. It allows you to store and manipulate the cards within a hand, as well as determine the type of hand it represents based on the rules of the game.
