import React from 'react';
import { getRandomNumber } from '../utils/randomNumberHelper';
import { Button, Grid, withStyles, Theme, WithStyles, Chip, Tooltip } from '@material-ui/core';
import { PublishResultModal } from './modal/PublishResultModal';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { ShowPublishResultModal } from '../store/local/modal/publish-result/actions';
import { AppState } from '../store';
import { TronLinkInfoModal } from './modal/TronLinkInfoModal';
import { showTronLinkInfoModal } from '../store/local/modal/tronlink-info/actions';
import { TronWebInit } from './TronWebInit';
import { GuessCorrectAnswer, GuessIncorrectAnswer } from '../store/local/game';
import { PlayerRankingsModal } from './modal/PlayerRankingsModal';
import { ShowPlayerRankingsModal } from '../store/local/modal/player-rankings';

interface StateProps {
    isTronLinkInstalled: boolean;
    isTronLinkLoggedIn: boolean;
    wins: number;
    losses: number;
    publishedWins: number;
    publishedLosses: number;
}

interface StateDispatchProps {
    openPublishResultModal(isTronLinkInstalled: boolean, isTronLinkLoggedIn: boolean): void;
    guessCorrectAnswer(): void;
    guessIncorrectAnswer(): void;
    openPlayerRankingsModal(isTronLinkInstalled: boolean, isTronLinkLoggedIn: boolean): void;
}

interface OwnProps {   
}

interface GameProps extends StateProps, StateDispatchProps, OwnProps, WithStyles<typeof styles> {
}

interface OwnStates {
    generatedNumber: number;
    isGuessCorrect: boolean;
}

export class _Game extends React.PureComponent<GameProps, OwnStates> {
    constructor(props: GameProps) {
        super(props);

        this.state = {
            generatedNumber: 0,
            isGuessCorrect: false
        };
    }

    isGuessCorrect = (number: number, isGuessBigNumber: boolean): boolean => {
        if (isGuessBigNumber) {
            return number >= 4;
        }

        return number <= 3;
    };

    onGuess = (isGuessBigNumber: boolean) => {
        const { guessCorrectAnswer, guessIncorrectAnswer } = this.props;

        const newNumber = getRandomNumber(1, 6);
        const isGuessCorrect = this.isGuessCorrect(newNumber, isGuessBigNumber);

        this.setState((state) => ({ 
            generatedNumber: newNumber,
            isGuessCorrect: isGuessCorrect,
        }));

        if (isGuessCorrect) {
            guessCorrectAnswer();
        } else {
            guessIncorrectAnswer();
        }
    };

    render() {
        const { classes, isTronLinkInstalled, isTronLinkLoggedIn, openPublishResultModal, wins, losses, publishedWins, publishedLosses, openPlayerRankingsModal } = this.props;
        const { generatedNumber, isGuessCorrect } = this.state;

        const totalWins = wins + publishedWins;
        const totalLosses = losses + publishedLosses;

        const playAgainButtonClicked = () => {
            this.setState((state) => ({ generatedNumber: 0}));
        };

        return (
            <div>
                <h1>Take a guess</h1>

                { generatedNumber == 0 && 
                    <div>
                        <div style={{ marginBottom:20 }}>Roll a dice and the number will fall between ...</div>
                        <Grid container justify="center" spacing={16}>
                            <Grid item>
                                <Button variant="contained" color="primary" size="large" onClick={() => this.onGuess(false)}>1 - 3</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" size="large" onClick={() => this.onGuess(true)}>4 - 6</Button>
                            </Grid>
                            {/* 
                                Using an arrow function in render creates a new function each time the component renders, which may have performance implications (see below).
                                https://reactjs.org/docs/faq-functions.html
                            */}
                        </Grid>
                    </div>
                }

                { generatedNumber > 0 && 
                    <div>
                        <div>It was {generatedNumber}.</div>
                        <div style={{ marginBottom:20 }}>{ isGuessCorrect ? "Good guess." : "Your guess was incorrect." }</div>
                        <Grid container justify="center" spacing={16}>
                            <Grid item>
                                <Button variant="contained" color="primary" size="large" onClick={playAgainButtonClicked}>Play again</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" size="large" onClick={() => openPlayerRankingsModal(isTronLinkInstalled, isTronLinkLoggedIn)}>Player Rankings</Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={16}>
                            <Grid item>
                                <Tooltip title="Publish to TRON Shasta Testnet" disableFocusListener disableTouchListener placement="right">
                                    <Button variant="contained" color="secondary" size="large" onClick={() => openPublishResultModal(isTronLinkInstalled, isTronLinkLoggedIn)}>Publish results</Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </div>
                }

                { (totalWins > 0 || totalLosses > 0) &&
                    <Chip label={`Win-Loss Record: ${totalWins}-${totalLosses}`} className={classes.record} />
                }

                <TronWebInit />
                <PlayerRankingsModal />
                <PublishResultModal wins={wins} losses={losses} publishedWins={publishedWins} publishedLosses={publishedLosses} />
                <TronLinkInfoModal />
            </div>
        );
    }
};

const styles = (theme: Theme) => ({
    record: {
        marginTop: 50,
        padding: 10
    },
    wins: {
        color: 'white',
        padding: `0 ${theme.spacing.unit * 2}px`,
    }
});

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => ({
    isTronLinkInstalled: state.local.tronWeb.installed,
    isTronLinkLoggedIn: state.local.tronWeb.loggedIn,
    wins: state.local.game.wins,
    losses: state.local.game.losses,
    publishedWins: state.local.game.publishedWins,
    publishedLosses: state.local.game.publishedLosses
});

const mapDispatchToProps: MapDispatchToPropsFunction<StateDispatchProps, OwnProps> = (
    dispatch: Dispatch
  ) => ({
    openPublishResultModal(isTronLinkInstalled: boolean, isTronLinkLoggedIn: boolean) {
        if (isTronLinkInstalled && isTronLinkLoggedIn) {
            dispatch(ShowPublishResultModal());
        } else {
            dispatch(showTronLinkInfoModal());
        }
    },
    guessCorrectAnswer() {
        dispatch(GuessCorrectAnswer());
    },
    guessIncorrectAnswer() {
        dispatch(GuessIncorrectAnswer());
    },
    openPlayerRankingsModal(isTronLinkInstalled: boolean, isTronLinkLoggedIn: boolean) {
        if (isTronLinkInstalled && isTronLinkLoggedIn) {
            dispatch(ShowPlayerRankingsModal());
        } else {
            dispatch(showTronLinkInfoModal());
        }
    }
  });

export const Game = connect<StateProps, StateDispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(_Game));
