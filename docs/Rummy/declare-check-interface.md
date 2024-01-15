# RummyDeclareCheck Interface

The `RummyDeclareCheck` is used to decide weather player's cards are valid and ready to declare or not. it is defined in the [RummyDeclareCheck](src/interfaces/RummyDeclareCheck.ts) interface.

this interface is returned by most of the methods in `Rummy` module.

A `RummyDeclareCheck` object has the following properties:

- `isValid`: A Boolean indicating that is the player's cards valid or not.
- `points`: number of points the player's cards are holding.
- `error`: the string indicating the problem that makes the cards inValid.
