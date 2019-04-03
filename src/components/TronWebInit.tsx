import React from 'react';
import TronWeb from 'tronweb';
import { Utils } from '../utils';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { AppState } from '../store';
import { Dispatch } from 'redux';
import { UpdateTronWebState } from '../store/local/tronweb-state';
import { UpdatePublishResultPlayer } from '../store/local/modal/publish-result';
import { Player, UpdatePlayerRankings } from '../store/server/player-rankings';

interface StateProps {}

interface StateDispatchProps {
    updateTronWebState(installed: boolean, loggedIn: boolean): void;
    updatePlayer(name: string, country: string): void;
    updatePlayerRankings(players: Player[]): void;
}

interface OwnProps {}

interface TronWebInitProps extends StateProps, StateDispatchProps, OwnProps {
}

interface OwnStates {
}

class _TronWebInit extends React.PureComponent<TronWebInitProps, OwnStates> {
    constructor(props: TronWebInitProps) {
        super(props);
    }

    render() {
        return (<></>);
    }

    async componentDidMount() {
        const { updateTronWebState } = this.props;

        const tronWebState = {
            installed: false,
            loggedIn: false
        };

        await new Promise(resolve => {
            const tronWeb = (window as any).tronWeb;
            tronWebState.installed = !!tronWeb;
            tronWebState.loggedIn = tronWeb && tronWeb.ready;

            if (tronWebState.installed) {
                return resolve();
            }

            let tries = 0;

            const timer = setInterval(() => {
                if(tries >= 10) {
                    const TRONGRID_API = 'https://api.trongrid.io';

                    (window as any).tronWeb = new TronWeb(
                        TRONGRID_API,
                        TRONGRID_API,
                        TRONGRID_API
                    );

                    clearInterval(timer);
                    return resolve();
                }

                const tronWeb = (window as any).tronWeb;
                tronWebState.installed = !!tronWeb;
                tronWebState.loggedIn = tronWeb && tronWeb.ready;

                if (!tronWebState.installed)
                    return tries++;

                resolve();
            }, 100);
        });

        if(!tronWebState.loggedIn) {
            // Need an address for smart contract reads, if a user isn't logged in. It should be your wallet address.
            //
            // Set default address (foundation address) used for contract calls
            // Directly overwrites the address object as TronLink disabled the
            // function call
            const myWalletAddress = 'TJdqJzdBRamTTGjVXhBDRGwDpXXSfPZAAb';
            (window as any).tronWeb.defaultAddress = {
                hex: (window as any).tronWeb.address.toHex(myWalletAddress),
                base58: myWalletAddress
            };

            (window as any).tronWeb.on('addressChanged', () => {
                if (tronWebState.loggedIn)
                    return;

                updateTronWebState(true, true);
            });
        }
        
        await Utils.setTronWeb((window as any).tronWeb);

        updateTronWebState(tronWebState.installed, tronWebState.loggedIn);

        await this.fetchData();
    }

    getWinningPercentage = (wins: number, losses: number): number => {
        if (wins === 0 && losses === 0) {
            return 0;
        }

        return Math.round(wins / (wins + losses) * 100);
    };

    async fetchData() {
        const { updatePlayerRankings, updatePlayer } = this.props;

        const playerCount = (await (Utils.contract as any).playerCount().call()).toNumber();
        let players: Player[] = [];
        for (var i=1; i<=playerCount; i++) {
            const player = await (Utils.contract as any).playersById(i).call();
            const wins = player.wins.toNumber();
            const losses = player.losses.toNumber();
            const winningPercentage = this.getWinningPercentage(wins, losses);

            players.push({
                id: player.id.toNumber(),
                name: player.name,
                country: player.country,
                wins: wins,
                losses: losses,
                winningPercentage: winningPercentage
            });
        }
        console.log('Fetched player rankings from blockchain. Total players: ' + playerCount);
        if (players.length > 0) {
            players = players.sort((a, b) => b.wins - a.wins);
            updatePlayerRankings(players);
        }

        const currentPlayer = await (Utils.contract as any).getPlayer().call();
        console.log('Fetched current player details from blockchain.');
        const name = currentPlayer[0];
        const country = currentPlayer[1];

        if (name && name !== '' || country && country !== '') {
            updatePlayer(name, country);
        }
    }
}

const mapDispatchToProps: MapDispatchToPropsFunction<StateDispatchProps, OwnProps> = (
    dispatch: Dispatch,
) => ({
    updateTronWebState(installed: boolean, loggedIn: boolean) {
        const payload = { installed, loggedIn };
        dispatch(UpdateTronWebState(payload));
    },
    updatePlayer(name: string, country: string) {
        const payload = { name, country };
        dispatch(UpdatePublishResultPlayer(payload));
    },
    updatePlayerRankings(players: Player[]) {
        const payload = { players };
        dispatch(UpdatePlayerRankings(payload));
    }
});

export const TronWebInit = connect<StateProps, StateDispatchProps, OwnProps, AppState>(
    null,
    mapDispatchToProps
)(_TronWebInit);