import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, WithStyles, withStyles,
         Table, TableHead, TableRow, TableCell, TableBody, Theme } from '@material-ui/core';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { AppState } from '../../store';
import { Player } from '../../store/server/player-rankings';
import { Dispatch } from 'redux';
import { HidePlayerRankingsModal } from '../../store/local/modal/player-rankings';

interface OwnProps {}
interface OwnStates {}

interface StateProps {
    players: Player[];
    isOpen: boolean;
}

interface StateDispatchProps {
    closeModal(): void;
}

interface PlayerRankingsModalProps extends OwnProps, StateProps, StateDispatchProps, WithStyles<typeof styles> {
}

class _PlayerRankingsModal extends React.PureComponent<PlayerRankingsModalProps, OwnStates> {
    constructor(props: PlayerRankingsModalProps) {
        super(props);
    }

    render() {
        const { players, classes, isOpen, closeModal } = this.props;

        return (
            <div>
                <Dialog open={isOpen} aria-labelledby="form-dialog-title" maxWidth="md">
                    <DialogTitle id="form-dialog-title">Player Rankings</DialogTitle>
                    <DialogContent>
                        <div>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="dense">&nbsp;</TableCell>
                                        <TableCell padding="dense">Name</TableCell>
                                        <TableCell padding="dense" align="right">Country</TableCell>
                                        <TableCell padding="dense" align="right">Wins</TableCell>
                                        <TableCell padding="dense" align="right">Losses</TableCell>
                                        <TableCell padding="dense" align="right">Winning</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {players.map((p, index) => (
                                    <TableRow key={p.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{p.name}</TableCell>
                                        <TableCell align="right">{p.country}</TableCell>
                                        <TableCell align="right">{p.wins}</TableCell>
                                        <TableCell align="right">{p.losses}</TableCell>
                                        <TableCell align="right">{p.winningPercentage}%</TableCell>
                                    </TableRow>))}
                                </TableBody>
                            </Table>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={closeModal}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    // table: {
    //     minWidth: 500,
    // },
    // tableContainer: {
    //     width: '100%'
    // }
});

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => ({
    players: state.server.playerRankings.players,
    isOpen: state.local.modals.playerRankings.isOpen
});

const mapDispatchToProps: MapDispatchToPropsFunction<StateDispatchProps, OwnProps> = (
    dispatch: Dispatch,
  ) => ({
      closeModal() {
          dispatch(HidePlayerRankingsModal());
      }
  });

export const PlayerRankingsModal = connect<StateProps, StateDispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(_PlayerRankingsModal));