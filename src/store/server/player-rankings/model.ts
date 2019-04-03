export type PlayerRankingState = {
    players: Player[];
};

export type Player = {
    id: number;
    name: string;
    country: string;
    wins: number;
    losses: number;
    winningPercentage: number;
};

export interface UpdatePlayerRankingsPayload {
    players: Player[];
}