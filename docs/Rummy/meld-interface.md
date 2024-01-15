# Meld Interface

The `Meld` represents a meld in Teen Patti, which is a combination of standard playing cards. It is defined in the [Meld](src/interfaces/Meld.ts) interface.

A `Meld` object has the following properties:

- `cards`: An array of [StandardCard](src/interfaces/StandardCard.ts) objects that make up the Meld.
- `groups`: A Multidimensional array dividing the cards array into different groups by it's indexes. this different group of indexes is used to make different set(like Sequence, pure Sequence).

The `Meld` is used to represent the real-world meld of cards in the Rummy game. It allows you to store and manipulate the cards within a meld, you can change the position of card just by changing it from group array and also transfer it into different group and you can also add/remove card from the `cards` array just like the real-word Rummy game.
