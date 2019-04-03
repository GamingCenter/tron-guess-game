import { createAction } from 'redux-actions';

export const PLAYER_RANKINGS_MODAL_SHOW = '/local/modal/player-rankings/show';
export const ShowPlayerRankingsModal = createAction(PLAYER_RANKINGS_MODAL_SHOW);

export const PLAYER_RANKINGS_MODAL_HIDE = '/local/modal/player-rankings/hide';
export const HidePlayerRankingsModal = createAction(PLAYER_RANKINGS_MODAL_HIDE);
