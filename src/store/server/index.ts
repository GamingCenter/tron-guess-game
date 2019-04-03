import { Reducer, combineReducers } from 'redux';
import { PlayerRankingState } from './player-rankings';
import { PlayerRankingStateReducer } from './player-rankings/reducer';

export type ServerState = {
    playerRankings: PlayerRankingState
};

export const ServerReducer: Reducer<ServerState> = combineReducers<ServerState>({
    playerRankings: PlayerRankingStateReducer
});