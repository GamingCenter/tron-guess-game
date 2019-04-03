import { Reducer } from "redux";
import { PlayerRankingState, UpdatePlayerRankingsPayload } from "./model";
import { PLAYER_RANKINGS_UPDATE } from "./actions";

const initialState: PlayerRankingState = {
    players: []
}
  
export const PlayerRankingStateReducer: Reducer<PlayerRankingState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case PLAYER_RANKINGS_UPDATE:
            const payload = (action.payload as UpdatePlayerRankingsPayload);

            return {
                ...state,
                players: payload.players
            };

        default:
            return state;
    }
};
