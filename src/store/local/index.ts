import { Reducer, combineReducers } from 'redux';
import { ModalState } from './modal';
import { publishResultModalReducer } from './modal/publish-result/reducer';
import { IntroState, introReducer } from './intro';
import { tronLinkInfoModalReducer } from './modal/tronlink-info/reducer';
import { TronWebState, tronWebStateReducer } from './tronweb-state';
import { GameState, gameReducer } from './game';
import { PlayerRankingsModalReducer } from './modal/player-rankings';

export type LocalState = {
    intro: IntroState;
    game: GameState;
    tronWeb: TronWebState;
    modals: ModalState;
  };

export const LocalReducer: Reducer<LocalState> = combineReducers<LocalState>({
    intro: introReducer,
    game: gameReducer,
    tronWeb: tronWebStateReducer,
    modals: combineReducers<ModalState>({
        publishResult: publishResultModalReducer,
        tronLinkInfo: tronLinkInfoModalReducer,
        playerRankings: PlayerRankingsModalReducer
    })
});