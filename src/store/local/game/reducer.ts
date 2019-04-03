import { Reducer} from "redux";
import { GameState } from ".";
import { GAME_GUESS_CORRECT_ANSWER, GAME_GUESS_INCORRECT_ANSWER } from "./actions";
import { PUBLISH_RESULT_MODAL_PUBLISH_SUCCESS } from "../modal/publish-result";

const initialState: GameState = {
    wins: 0,
    losses: 0,
    publishedWins: 0,
    publishedLosses: 0
}
  
export const gameReducer: Reducer<GameState> = (
    state = initialState as any,
    action,
) => {
    switch (action.type) {
        case GAME_GUESS_CORRECT_ANSWER:
            return {
                ...state,
                wins: state.wins + 1
            };

        case GAME_GUESS_INCORRECT_ANSWER:
            return {
                ...state,
                losses: state.losses + 1
            };

        case PUBLISH_RESULT_MODAL_PUBLISH_SUCCESS:
            return {
                ...state,
                wins: 0,
                losses: 0,
                publishedWins: (state.wins + state.publishedWins),
                publishedLosses: (state.losses + state.publishedLosses)
            };

        default:
            return state;
    }
};
