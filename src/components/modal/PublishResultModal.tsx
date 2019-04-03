import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions, CircularProgress, Theme, withStyles, createStyles, WithStyles } from '@material-ui/core';
import { Utils } from '../../utils';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { AppState } from '../../store';
import Typography from '@material-ui/core/Typography';
import { Dispatch } from 'redux';
import { HidePublishResultModal, PublishResultRequest, PublishResultSuccess } from '../../store/local/modal/publish-result';

interface StateProps {
    isModalOpen: boolean;
    isLoading: boolean;
    name: string;
    country: string;
}

interface StateDispatchProps {
    closeModal(): void;
    publishResultRequest(): void;
    publishResultSuccess(): void;
}

interface OwnProps {
    wins: number;
    losses: number;
    publishedWins: number;
    publishedLosses: number;
}

interface PublishResultModalProps extends OwnProps, StateProps, StateDispatchProps, WithStyles<typeof styles> {
}

interface OwnStates {
    name: string;
    country: string;
}

class _PublishResultModal extends React.PureComponent<PublishResultModalProps, OwnStates> {
    constructor(props: PublishResultModalProps) {
        super(props);

        this.state = {
            name: "",
            country: ""
        };
    }

    publishButtonClicked = async () => {
        const { wins, losses, publishResultRequest, publishResultSuccess } = this.props;
        const { name, country } = this.state;

        try {
            publishResultRequest();

            await (Utils.contract as any).pulishResult(name, country, wins, losses).send({
                shouldPollResponse: true,
                callValue: 0
            });

            console.log('Published result to TRON blockchain successfuly.');
        }
        catch (e) {
            console.log('Error publishing to TRON blockchain.', e);
        }

        publishResultSuccess();
    };

    onNameChange = (evt: any) => {
        this.setState({
            name: evt.target.value
        });
    }
    
    onCountryChange = (evt: any) => {
        this.setState({
            country: evt.target.value
        });
    }

    render() {
        const { isModalOpen, classes, wins, losses, publishedWins, publishedLosses, closeModal, isLoading } = this.props;
        const { name, country } = this.state;
        const totalWins = wins + publishedWins;
        const totalLosses = losses + publishedLosses;
        
        return (
            <div>
                <Dialog open={isModalOpen} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Publish Result</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                        Content
                        </DialogContentText> */}
                        <TextField autoFocus label="Nickname" type="TextField" fullWidth defaultValue={name} onChange={this.onNameChange} />
                        <TextField label="Country" type="TextField" fullWidth defaultValue ={country} onChange={this.onCountryChange} />
                        <Typography variant="h2" className={classes.result}>{totalWins} : {totalLosses}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.publishButtonClicked} disabled={isLoading}>Publish</Button>
                        { isLoading && <CircularProgress size={24} /> }
                        <Button color="secondary" onClick={closeModal} disabled={isLoading}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    
    componentDidUpdate(prevProps: PublishResultModalProps, prevState: OwnStates) {
        if (this.props.name !== prevProps.name || this.props.country !== prevProps.country) {
          this.setState({
            name: this.props.name,
            country: this.props.country
          });
        }
    }
}

const styles = (theme: Theme) => createStyles({
    wrapper: {
      margin: theme.spacing.unit,
      position: 'relative',
    },
    result: {
        marginTop: 20,
        textAlign: 'center'
    }
  });

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => ({
    isModalOpen: state.local.modals.publishResult.isOpen,
    isLoading: state.local.modals.publishResult.isLoading,
    name: state.local.modals.publishResult.name,
    country: state.local.modals.publishResult.country
});

const mapDispatchToProps: MapDispatchToPropsFunction<StateDispatchProps, OwnProps> = (
    dispatch: Dispatch,
  ) => ({
    closeModal() {
        dispatch(HidePublishResultModal());
    },
    publishResultRequest() {
        dispatch(PublishResultRequest());
    },
    publishResultSuccess() {
        dispatch(PublishResultSuccess());
    }
  });

export const PublishResultModal = connect<StateProps, StateDispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(_PublishResultModal));
