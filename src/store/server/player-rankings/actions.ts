import { createAction } from 'redux-actions';
import { UpdatePlayerRankingsPayload } from './model';

export const PLAYER_RANKINGS_UPDATE = '/server/player-rankings/update';
export const UpdatePlayerRankings = createAction<UpdatePlayerRankingsPayload>(PLAYER_RANKINGS_UPDATE);
