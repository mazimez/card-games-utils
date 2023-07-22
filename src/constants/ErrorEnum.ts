/**
 * different error messages for whole package
 * @enum {string}
 */
export enum ErrorEnum {
  JOKER_NOT_ALLOWED = 'Joker is not allowed in this game',
  WILD_NOT_ALLOWED = 'Wild card is not allowed in this game',
  SET_REQUIRED = 'SET is required to declare',
  SEQUENCE_REQUIRED = 'SEQUENCE is required to declare',
  PURE_SEQUENCE_REQUIRED = 'PURE SEQUENCE is required to declare',
  AT_LEAST_ONE_RULE_IS_REQUIRED = 'At least one of the three variables must be true: isSetRequired, isSequenceRequired, or isPureSequenceRequired.',
  AT_LEAST_THREE_CARDS_NEEDED_FOR_SEQUENCE = 'At least 3 cards needed to make a SEQUENCE',
  AT_LEAST_TWO_NORMAL_CARDS_NEEDED_FOR_SEQUENCE = 'You need at least 2 normal cards for SEQUENCE',
  NOT_VALID_SEQUENCE = 'Not a valid SEQUENCE',
  AT_LEAST_THREE_CARDS_NEEDED_FOR_SET = 'At least 3 cards needed to make a set',
  MAX_FOUR_CARDS_ALLOWED_FOR_SET = 'Maximum of 4 cards are allowed in 1 set',
  NOT_VALID_SET = 'Not a VALID set',
  AT_LEAST_THREE_CARDS_NEEDED_FOR_PURE_SEQUENCE = 'At least 3 cards needed to make a PURE SEQUENCE',
  JOKER_NOT_ALLOWED_IN_PURE_SEQUENCE = 'Joker is not allowed for PURE SEQUENCE',
  SAME_SUITE_NEEDED_FOR_PURE_SEQUENCE = 'PURE SEQUENCE needs to have same suites',
  NOT_VALID_PURE_SEQUENCE = 'Not a valid PURE SEQUENCE',
  INVALID_DATA = 'Invalid data',
  AT_LEAST_ONE_NORMAL_CARD_NEEDED_FOR_SET = 'You need at least 1 normal card for SET',
}
