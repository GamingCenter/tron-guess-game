import { PublishResultModalState } from "./publish-result";
import { TronLinkInfoModalState } from "./tronlink-info";
import { PlayerRankingsModalState } from "./player-rankings";

export type ModalState = {
    publishResult: PublishResultModalState,
    tronLinkInfo: TronLinkInfoModalState;
    playerRankings: PlayerRankingsModalState
};