import { createAction } from 'redux-actions';

export const GAME_GUESS_CORRECT_ANSWER = '/local/game/guess-correct-answer';
export const GuessCorrectAnswer = createAction(GAME_GUESS_CORRECT_ANSWER);

export const GAME_GUESS_INCORRECT_ANSWER = '/local/game/guess-incorrect-answer';
export const GuessIncorrectAnswer = createAction(GAME_GUESS_INCORRECT_ANSWER);