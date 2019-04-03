import { Reducer } from "redux";
import { PlayerRankingsModalState } from "./model";
import { PLAYER_RANKINGS_MODAL_SHOW, PLAYER_RANKINGS_MODAL_HIDE } from "./actions";

const InitialState: PlayerRankingsModalState = {
  isOpen: false
}

export const PlayerRankingsModalReducer: Reducer<PlayerRankingsModalState> = (
    state = InitialState as any,
    action,
  ) => {
    switch (action.type) {
      case PLAYER_RANKINGS_MODAL_SHOW:
        return {
          ...state,
          isOpen: true
        };

      case PLAYER_RANKINGS_MODAL_HIDE:
        return {
          ...state,
          isOpen: false
        };

      default:
        return state;
    }
  };